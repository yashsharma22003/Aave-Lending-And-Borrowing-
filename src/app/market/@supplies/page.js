"use client"
import { useEffect, useState } from "react";
import { getSuppliedData, getMarketAPY, CollateraledAmount } from "../../../../context/retrieveUserInfo";
import  supplyFunds  from "../../../../context/supplyFunds";
import Modal from "@/components/Modal";
import unitConvert from "../../../../context/unitCovert"
import withdrawFunds from "../../../../context/withdrawFunds"


const Supplies = () => {

    const market = "Polygon";

    const [balance, setBalance] = useState("-");
    const [apy, setApy] = useState("-");
    const [Collateral, setCollateral] = useState("-");
    const [fundInput, setFundInput] = useState(0);

    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const [isModalOpenWithdraw, setModalOpenWithdraw] = useState(false);

    const openModalWithdraw = () => setModalOpenWithdraw(true);
    const closeModalWithdraw = () => setModalOpenWithdraw(false);

    useEffect(() => {
        async function fetchUserInfo(market) {

            const retrieveAmount = unitConvert(await getSuppliedData(market)) 
            setBalance(retrieveAmount);

            const retrieveApy = unitConvert(await getMarketAPY(market));
            setApy(retrieveApy);

            const retrieveCollateral = unitConvert(await CollateraledAmount(market));
            setCollateral(retrieveCollateral);


        }

        fetchUserInfo(market);

    }, [])

    async function handleSupplyContract() {

        await supplyFunds(fundInput, market);

    }

    async function handleWithdrawFunds() {
        await withdrawFunds(market, fundInput);
    }



    return (<div className="border-4 p-2 border-gray-400 rounded-lg shadow-2xl">
      <h1 className="font-bold p-2">Your Supplies </h1> 
        <div>
     
            <ul className=" flex space-x-10 bg-gray-200 px-2 border border-gray-400">
                <li>Balance- {balance} ETH</li>
                <li>APY- {apy}%</li>
                <li>Collateral- {Collateral} ETH</li>

            </ul>
        </div>

        <div>
            <div className="pt-4">
            <h1 className="font-bold p-2">Assets Supplied By User </h1> 
                <ul className="flex space-x-16 border-b-4 my-2 font-bold">

                    <li>Asset</li>
                    <li>Balance</li>
                    <li>APY</li>
                    <li>Collateral</li>

                </ul>

                <ul className="flex space-x-16 ml-2 ">

                    <li>ETH</li>
                    <li><span> </span>{balance}</li>
                    <li>{apy}%</li>
                    <li>{Collateral}</li>
                    <li>  <div className="flex space-x-4 px-2">
                        <button onClick={openModal} className="bg-black text-white rounded-lg p-1 px-2 cursor-pointer"> Supply </button>

                        <Modal isOpen={isModalOpen} onClose={closeModal}>
                            <h2>Supply ETH</h2>
                            
                            <input value={fundInput} onChange={(e) => {
                            
                                setFundInput(e.target.value);
                            }} type="number" placeholder="Enter Supply Amount" className="p-4 m-6" />
                            <button onClick={handleSupplyContract} className="border-2 p-2 rounded-lg bg-black text-white hover:cursor-pointer">Transact</button>
                        </Modal>

                        <button onClick={openModalWithdraw} className="border-2 border-gray-700 p-1 px-2"> Withdraw </button>

                        <Modal isOpen={isModalOpenWithdraw} onClose={closeModalWithdraw}>
                            <h2>Withdraw ETH</h2>
                            
                            <input value={fundInput} onChange={(e) => {
                            
                                setFundInput(e.target.value);
                            }} type="number" placeholder="Enter Supply Amount" className="p-4 m-6" />
                            <button onClick={handleWithdrawFunds} className="border-2 p-2 rounded-lg bg-black text-white hover:cursor-pointer">Withdraw</button>
                        </Modal>

                    </div></li>

                </ul>


            </div>



        </div>


    </div>);

}

export default Supplies;