const details = () => {
    return (
        <div className="h-screen flex justify-center items-center mx-40">
            <img src="./EtherLogo.png" className="size-40" alt="Ether Logo" />
            <div className="ml-28">
                <h1 className="font-bold text-4xl mb-6">Eth (Ether)</h1>
                <h2 className="w-4/5 bg-gray-200 p-2">
                    Ether (ETH) is the native cryptocurrency of the Ethereum blockchain, designed to power and incentivize the network&apos;s operations. It primarily functions as &quot;fuel&quot; for transactions and computational tasks on Ethereum, especially to pay for gas fees associated with executing smart contracts and decentralized applications (DApps).
                    <br />
                    <br />
                    Beyond powering Ethereum&apos;s ecosystem, Ether is widely used as a digital currency for peer-to-peer transactions, as a store of value, and as collateral in various decentralized finance (DeFi) applications. Users can earn Ether through staking, especially after Ethereum&apos;s transition to Proof of Stake (PoS) with Ethereum 2.0, which allows users to lock up ETH and help secure the network in exchange for rewards.
                </h2>
            </div>
        </div>
    );
};

export default details;
