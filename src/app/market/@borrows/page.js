"use client"
import { getMarketAPY, getBorrowed, borrowingPower, borrow } from "../../../../context/retrieveUserInfo";
import { useEffect, useState } from "react";
import Modal from "@/components/Modal";
import unitConvert from "../../../../context/unitCovert"
import repayFunds from "../../../../context/repayFunds";
const Borrows = () => {

    const market = "Polygon";

    const [debt, setDebt] = useState(0);
    const [apy, setApy] = useState(0);
    const [power, setPower] = useState(0);
    const [fundInput, setFundInput] = useState(0);
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const [isModalOpenRepay, setModalOpenRepay] = useState(false);

    const openModalRepay = () => setModalOpenRepay(true);
    const closeModalRepay = () => setModalOpenRepay(false);

    useEffect(() => {
        async function fetchUserInfo() {

            let fetchedApy = (await getMarketAPY(market));
            let fetchedBorrowed = (await getBorrowed(market));

            setApy(unitConvert(fetchedApy));
            setDebt(unitConvert(fetchedBorrowed));
            setPower((await (borrowingPower(market))).toFixed(2));

        }

        fetchUserInfo();

        console.log("debt is", debt);

    }, [])

    async function handleBorrowContract() {

        await borrow(market, fundInput);

    }

    async function handleWithdrawFunds() {

        await repayFunds(market, fundInput);

    }

    return (<div className="border-4 p-2 border-gray-400 rounded-lg shadow-2xl">
        <h1 className="font-bold p-2">Your Borrows </h1>
        <div className="">

            <ul className=" flex space-x-10 bg-gray-200 px-2 border border-gray-400">
                <li>Balance- {debt}</li>
                <li>Borrowing Power Used - {power} %</li>


            </ul>
        </div>

        <div>
            <div className="pt-4">
                <h1 className="font-bold p-2">Assets Supplied By User </h1>
                <ul className="flex space-x-24 border-b-4 my-2 font-bold ">
                 
                        <li>Asset</li>
                        <li>Debt</li>
                        <li>APY</li>

                   

                </ul>

                <ul className="flex space-x-24 ml-2 ">

                    <li>ETH</li>
                    <li>{debt}</li>
                    <li>{apy}%</li>
                    <li>  <div className="flex space-x-4 px-2">
                        <button onClick={openModal} className="bg-black text-white rounded-lg p-1 px-2 cursor-pointer"> Borrow </button>
                        <Modal isOpen={isModalOpen} onClose={closeModal}>
                            <h2>Borrow ETH</h2>

                            <input value={fundInput} onChange={(e) => {

                                setFundInput(e.target.value);
                            }} type="number" placeholder="Enter Supply Amount" className="p-4 m-6" />
                            <button onClick={handleBorrowContract} className="border-2 p-2 rounded-lg bg-black text-white hover:cursor-pointer">Transact</button>
                        </Modal>

                        <button onClick={openModalRepay} className="border-2 border-gray-700 p-1 px-2"> Repay </button>

                        <Modal isOpen={isModalOpenRepay} onClose={closeModalRepay}>
                            <h2>Repay ETH</h2>
                            
                            <input value={fundInput} onChange={(e) => {
                            
                                setFundInput(e.target.value);
                            }} type="number" placeholder="Enter Supply Amount" className="p-4 m-6" />
                            <button onClick={handleWithdrawFunds} className="border-2 p-2 rounded-lg bg-black text-white hover:cursor-pointer">Repay</button>
                        </Modal>

                        
                    </div></li>

                </ul>


            </div>



        </div>


    </div>);

}

export default Borrows;