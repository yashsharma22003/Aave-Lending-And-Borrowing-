"use client";

import { useEffect, useState } from "react";
import { getBalance } from "../../../context/InterestTokenContext";
import { useAccount } from "wagmi";
import Modal from "@/components/Modal";
import redeemToken from "../../../context/InterestTokenContext";


const Token = () => {

    const market = "Polygon"
    const { isConnected } = useAccount();
    const [add, setAdd] = useState("");
    const [balance, setBalance] = useState(0);
    const account = useAccount();
    const [fundInput, setFundInput] = useState(0);
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    function formatLargeNumber(number) {
        if (number >= 1e12) return (number / 1e12).toFixed(2) + " Trillions"; // Trillions
        if (number >= 1e9) return (number / 1e9).toFixed(2) + " Billions";   // Billions
        if (number >= 1e6) return (number / 1e6).toFixed(2) + " Millions";   // Millions
        if (number >= 1e3) return (number / 1e3).toFixed(2) + " Thousands";   // Thousands
        return number.toFixed(2); // Default format for smaller numbers
    }

    function handleRedeemToken() {

        redeemToken(market,fundInput);

    }

    useEffect(() => {
        async function retrieveBalance() {
            if (typeof account.address !== "undefined") {
                const bal = await getBalance(account.address);
        
                // Format the balance in a human-readable form
                const readableBalance = formatLargeNumber(Number(bal)); 
                setBalance(readableBalance);
        
                console.log("Fetched balance is:", readableBalance);
            }
        }

        retrieveBalance();
        console.log(isConnected);
    }, [isConnected]);

    console.log(add);

    return (
        <div className="h-screen">
           
        
            <img src="./ITok.webp" className="size-36 rounded-full m-auto mt-10"/>
            {isConnected ? (
                
                <div className="items-center flex ml-36 justify-between">
                            
                    <div className="w-1/3 shadow-2xl px-4 py-2">
                        <h1 className="my-2 font-bold">What is ITok?      </h1>
                        <h2 className="font-thin bg-gray-200 p-2">
                            ITok is a token representing the interest earned by liquidity providers in the lending pool.
                            It dynamically tracks and rewards contributions based on the pool's utilization and market
                            conditions.
                            <br />
                            As you supply funds to the pool, ITok accrues over time at rates influenced by the pool's
                            dynamic interest calculation, balancing liquidity and borrowing demand. This innovative
                            approach incentivizes participation while maintaining the sustainability of the lending
                            ecosystem.

                            <span className="font-mono bg-gray-50 m-2">(10 ITok = 1 ETH)</span>
                        </h2>
                    </div>

                    <div className="items-center flex m-40 flex-col shadow-2xl
                     p-16 space-y-10">
                        <h1 className="font-bold text-xl">
                            Balance - {balance}
                        </h1>
                        <button onClick={openModal} className="font-bold shadow-lg transform hover:scale-110 hover:shadow-lg transition duration-300 p-2 rounded">
                            Redeem
                        </button>

                    
                        <Modal isOpen={isModalOpen} onClose={closeModal}>
                            <h2>Redeem ITok</h2>
                            
                            <input value={fundInput} onChange={(e) => {
                            
                                setFundInput(e.target.value);
                            }} type="number" placeholder="Enter Supply Amount" className="p-4 m-6" />
                            <button onClick={handleRedeemToken} className="border-2 p-2 rounded-lg bg-black text-white hover:cursor-pointer">Redeem</button>
                        </Modal>


                    </div>
                </div>
            ) : (
                <h1>Please Reconnect The Wallet</h1>
            )}
        </div>
    );
};

export default Token;
