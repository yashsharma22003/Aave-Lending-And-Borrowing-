// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./InterestToken.sol";

contract pool {

    address contractOwner;
    InterestToken public Token;

    // Custom errors
    error NotTheOwner();
    error PoolAlreadyExists();
    error PoolDoesNotExist();
    error PoolNotActive();
    error InsufficientFundsAvailable();
    error SendEnoughFunds();
    error BorrowingLimitReached();
    error WrongLiquiditySupplied();
    error NoFundsBorrowed();
    error InsufficientSupplyAvailableToWithdraw();
    error SupplyCurrentlyCollateralized();
    error RedeemValueOvershotBalance();
    error NotEnoughLiquidFundsAvailable();
    error InsufficientEtherInContract();
    error AmountOvershotDebt();


    modifier onlyOwner() {
        if (msg.sender != contractOwner) {
            revert NotTheOwner();
        }
        _;
    }

    bytes32[] public poolsCreated;

    event NewPoolCreated(address indexed owner, bytes32 marketName);
    event PoolSupplied(bytes32 indexed poolName, address indexed member, uint256 amount);
    event PoolBorrowed(bytes32 indexed market, address indexed borrower, uint256 amount);
    event InterestMinted(bytes32 indexed market, address indexed member, uint256 interestAmount);
    event FundsLiquidated(bytes32 indexed market, address indexed member, uint256 liquidationAmount);
    event DebtAdded(bytes32 indexed market, address indexed borrower, uint256 interestAdded, uint256 totalDebt);
    event SupplyWithdrawn(bytes32 indexed market, address indexed member, uint256 amount);
    event EtherRedeemed(address indexed user, uint256 amountRedeemed);
event PoolRepaymentMade(bytes32 indexed market, address indexed borrower, uint256 amount);

    struct PoolData {
        address owner;
        bytes32 market;
        uint256 borrowed;
        uint256 liquid;
        address[] members;
        mapping(address => uint256) depositedFunds;
        mapping(address => uint256) borrowedFunds;
        mapping(address => uint256) healthFactor;
        uint256 interest;
        bool isActive;
    }

    mapping(bytes32 => PoolData) public pools;

    constructor(address _interestToken) {
        contractOwner = msg.sender;
        Token = InterestToken(_interestToken);
    }

    function poolActivation(bytes32 _marketName) public onlyOwner {
        if (pools[_marketName].market != bytes32(0)) {
            revert PoolAlreadyExists();
        }
        pools[_marketName].owner = msg.sender;
        pools[_marketName].market = _marketName;
        pools[_marketName].isActive = true;
        pools[_marketName].liquid = 0;
        pools[_marketName].borrowed = 0;
        pools[_marketName].interest = 0;
        poolsCreated.push(_marketName);
        emit NewPoolCreated(msg.sender, _marketName);
    }

    function poolSupply(bytes32 _poolName) public payable {
        if (msg.value <= 0) {
            revert SendEnoughFunds();
        }
        if (pools[_poolName].market == bytes32(0)) {
            revert PoolDoesNotExist();
        }
        if (!pools[_poolName].isActive) {
            revert PoolNotActive();
        }
        if (pools[_poolName].depositedFunds[msg.sender] == 0) {
            pools[_poolName].members.push(msg.sender);
        }
        pools[_poolName].liquid += msg.value;
        pools[_poolName].depositedFunds[msg.sender] += msg.value;
        pools[_poolName].interest = updatedInterest(pools[_poolName].borrowed, pools[_poolName].liquid);
        emit PoolSupplied(_poolName, msg.sender, msg.value);
    }

    function poolBorrow(bytes32 _market, uint256 _amount) public {
        if ((_amount + pools[_market].borrowedFunds[msg.sender]) > (pools[_market].depositedFunds[msg.sender] * 80 / 100)) {
            revert BorrowingLimitReached();
        }
        if (!pools[_market].isActive) {
            revert PoolNotActive();
        }
        if (pools[_market].liquid <= _amount) {
            revert InsufficientFundsAvailable();
        }
        payable(msg.sender).transfer(_amount);
        pools[_market].borrowed += _amount;
        pools[_market].liquid -= _amount;
        pools[_market].borrowedFunds[msg.sender] += _amount;
        pools[_market].interest = updatedInterest(pools[_market].borrowed, pools[_market].liquid);
        emit PoolBorrowed(_market, msg.sender, _amount);
    }

   function poolRepay(bytes32 _market) public payable {
    PoolData storage poolInstance = pools[_market];

  
    if (!poolInstance.isActive) {
        revert PoolNotActive();
    }


    uint256 borrowerDebt = poolInstance.borrowedFunds[msg.sender];
    if (borrowerDebt == 0) {
        revert NoFundsBorrowed();
    }

    if (msg.value == 0 || msg.value > borrowerDebt) {
        revert AmountOvershotDebt();
    }

    poolInstance.borrowedFunds[msg.sender] -= msg.value;
    poolInstance.borrowed -= msg.value;
    poolInstance.liquid += msg.value;

    poolInstance.interest = updatedInterest(poolInstance.borrowed, poolInstance.liquid);


    emit PoolRepaymentMade(_market, msg.sender, msg.value);
}


    function updatedInterest(uint256 _borrowed, uint256 _liquid) internal pure returns (uint256) {
        if (_liquid == 0) {
            revert WrongLiquiditySupplied();
        }
        return (_borrowed * 1e18) / _liquid;
    }

    function borrowingLimit(bytes32 _market) public view returns (uint256) {
        return ((pools[_market].depositedFunds[msg.sender]) * 80 / 100);
    }

    function borrowedAmount(bytes32 _market) public view returns (uint256) {
        return (pools[_market].borrowedFunds[msg.sender]);
    }

    function depositedAmount(bytes32 _market) public view returns (uint256) {
        return (pools[_market].depositedFunds[msg.sender]);
    }

    function getInterest(bytes32 _market) public view returns (uint256) {
        return (pools[_market].interest);
    }

    function healthFactor(bytes32 _market, address borrower) public view returns (uint256) {
        uint256 collateral = pools[_market].depositedFunds[borrower];
        uint256 debt = pools[_market].borrowedFunds[borrower];
        if (debt == 0) {
            revert NoFundsBorrowed();
        }
        uint256 healthFactorValue = (collateral * 80 * 1e18 / 100) / debt;
        return healthFactorValue;
    }

    function mintInterestTokens(bytes32 _market) internal {
        if (!pools[_market].isActive) {
            revert PoolNotActive();
        }
        for (uint i = 0; i < pools[_market].members.length; i++) {
            address member = pools[_market].members[i];
            uint256 interestToMint = (pools[_market].interest * (pools[_market].depositedFunds[member] - pools[_market].borrowedFunds[member]) * 10) / (100 * 1e18);
            if (interestToMint > 0) {
                Token.mint(member, interestToMint);
                emit InterestMinted(_market, member, interestToMint);
            }
        }
    }

    function liquidate(bytes32 _market) internal {
        if (!pools[_market].isActive) {
            revert PoolNotActive();
        }
        for (uint i = 0; i < pools[_market].members.length; i++) {
            address member = pools[_market].members[i];
            uint256 healthFactorValue = healthFactor(_market, member);
            if (healthFactorValue < 1e18) {
                uint256 debt = pools[_market].borrowedFunds[member];
                uint256 collateral = pools[_market].depositedFunds[member];
                uint256 liquidationAmount = debt > collateral ? collateral : debt;
                pools[_market].borrowedFunds[member] -= liquidationAmount;
                pools[_market].depositedFunds[member] -= liquidationAmount;
                pools[_market].liquid += liquidationAmount;
                pools[_market].borrowed -= liquidationAmount;
                emit FundsLiquidated(_market, member, liquidationAmount);
            }
        }
    }

    function addDebt(bytes32 _market) internal {
        if (!pools[_market].isActive) {
            revert PoolNotActive();
        }
        for (uint256 i = 0; i < pools[_market].members.length; i++) {
            address borrower = pools[_market].members[i];
            uint256 currentDebt = pools[_market].borrowedFunds[borrower];
            if (currentDebt > 0) {
                uint256 interestToAdd = (currentDebt * pools[_market].interest) / (100 * 1e18);
                uint256 totalDebt = currentDebt + interestToAdd;
                pools[_market].borrowedFunds[borrower] = totalDebt;
                emit DebtAdded(_market, borrower, interestToAdd, totalDebt);
            }
        }
        uint256 totalBorrowed = 0;
        for (uint256 j = 0; j < pools[_market].members.length; j++) {
            totalBorrowed += pools[_market].borrowedFunds[pools[_market].members[j]];
        }
        pools[_market].borrowed = totalBorrowed;
    }

    function automationKeeper(bytes32 _market) public onlyOwner {
        addDebt(_market);
        liquidate(_market);
        mintInterestTokens(_market);
    }

    function withdrawSupply(bytes32 _market, uint256 _amount) public {
        PoolData storage poolInstance = pools[_market];
        if (!poolInstance.isActive) {
            revert PoolNotActive();
        }
        if (poolInstance.depositedFunds[msg.sender] < _amount) {
            revert InsufficientSupplyAvailableToWithdraw();
        }
        uint256 remainingCollateral = poolInstance.depositedFunds[msg.sender] - _amount;
        uint256 requiredCollateral = poolInstance.borrowedFunds[msg.sender] * 100 / 80;
        if (remainingCollateral < requiredCollateral) {
            revert SupplyCurrentlyCollateralized();
        }
        poolInstance.depositedFunds[msg.sender] -= _amount;
        poolInstance.liquid -= _amount;
        poolInstance.interest = updatedInterest(poolInstance.borrowed, poolInstance.liquid);
        payable(msg.sender).transfer(_amount);
        emit SupplyWithdrawn(_market, msg.sender, _amount);
    }

    function getMembers(bytes32 _market) public view returns (address[] memory) {
       return pools[_market].members;
    }

    function isMarketActive(bytes32 _market) internal view returns (bool)  {
        return (pools[_market].isActive);
    }

    function redeemEtherFromITOK(bytes32 _market, uint256 _amount) public {
        uint256 balance = Token.balanceOf(msg.sender);
        if (_amount > balance) {
            revert RedeemValueOvershotBalance();
        }
        if (_amount / 10 > pools[_market].liquid) {
            revert NotEnoughLiquidFundsAvailable();
        }
        Token.burn(msg.sender, _amount);
        uint256 etherToTransfer = _amount % 10 < 5 ? _amount : _amount + 1;
        if (address(this).balance < etherToTransfer) {
            revert InsufficientEtherInContract();
        }
        payable(msg.sender).transfer(etherToTransfer);
        emit EtherRedeemed(msg.sender, etherToTransfer);
    }
}