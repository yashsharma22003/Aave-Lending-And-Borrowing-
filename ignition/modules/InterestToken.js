const {buildModule} = require("@nomicfoundation/hardhat-ignition/modules"); 

module.exports = buildModule("InterestToken", (m) => {
    const token = m.contract("InterestToken");
    return {token};
});