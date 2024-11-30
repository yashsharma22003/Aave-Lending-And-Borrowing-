'use client';
import { useAccount } from "wagmi";
import toast, { Toaster } from 'react-hot-toast';
import { useEffect, useState } from "react";
import { getMarket } from "../../../context/getMarket";
import { useMarketContext } from "./marketContext";
import { ethers } from "ethers";
import { getHealthFactor } from "../../../context/getHealthFactor";



const Market = () => {

    const { isConnected } = useAccount(); // Destructure isConnected for simplicity
    const [marketNumber, setMarketNumber] = useState(0);

    const {market, setMarket} = useMarketContext();
    const [healthFactor, setHealthFactor] = useState("");

    const account = useAccount();
    const walletAddress = account.address;

    let HF = "";

    // Effect to notify wallet connection status
    useEffect(() => {
        if (!isConnected) {
            toast.error('Connect the Wallet');
        } else {
            toast.success('Wallet connected');
        }

        async function healthFactor() {
           HF = await getHealthFactor(market, walletAddress);
        }

        healthFactor();
    }, [isConnected]);

    // Function to retrieve market data
    const retrieveMarket = async () => {
        try {
            const marketData = await getMarket(marketNumber); // Await the result
            if (marketData.message === "Internal JSON-RPC error." )
            {
                console.log("Market is not active");
                setMarket("Market Inactive");
                console.log(market)

            } else
            {
            console.log("Market is:",ethers.decodeBytes32String(marketData));
            setMarket(ethers.decodeBytes32String(marketData));
            }
        } catch (error) {
            console.error("Error fetching market:", error);
            console.log("Market is not active");
        }
    };

    // Function to handle navigation clicks
    const handleClick = (action) => {
        if (action === "left" && marketNumber > 0) {
            setMarketNumber((prev) => prev - 1); // Decrement marketNumber
        } else if (action === "right") {
            setMarketNumber((prev) => prev + 1); // Increment marketNumber
        }
    };

    // Retrieve market whenever marketNumber changes
    useEffect(() => {
        retrieveMarket();
    }, [marketNumber]);

    return (
        <div>
            
            <Toaster />
      <div className=" flex border-4 border-black h-40 items-start bg-gray-800 text-white flex-col justify-center">
        <h1 className="ml-6 mb-2 text-gray-300 font-light">Market :-</h1>
    <span className="ml-10 text-3xl font-bold ">{market}</span>
    <h3></h3>
      </div>
            {/* <button onClick={() => handleClick("left")}>Left</button> */}
      
            {/* <button onClick={() => handleClick("right")}>Right</button> */}
        </div>
    );
};

export default Market;
