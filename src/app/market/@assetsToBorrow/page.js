"use client"
import { getMarketAPY, getBorrowed, borrowingPower, borrow } from "../../../../context/retrieveUserInfo";
import { useEffect, useState } from "react";
import Modal from "@/components/Modal";
import unitConvert from "../../../../context/unitCovert"
import Link from "next/link";

const AssetsToborrow = () => {

    const market = "Polygon";

    const [debt, setDebt] = useState(0);
    const [apy, setApy] = useState(0);
    const [power, setPower] = useState(0);
    const [fundInput, setFundInput] = useState(0);
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

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

    return (<div className="border-4 p-2 border-gray-400 rounded-lg shadow-2xl">
        <h1 className="font-bold p-2">Assets To Borrow </h1>
        <div className="">


        </div>

        <div>
            <div className="pt-4">
                <h1 className="font-bold p-2">Tokens Supported </h1>
                <ul className="flex space-x-28 border-b-4 my-2 font-bold ">

                    <li>Asset</li>

                    <li>APY</li>



                </ul>

                <ul className="flex space-x-28 ml-2 ">

                    <li>ETH</li>

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
                        <Link href={"./details"}>
                            <button className="border-2 border-gray-700 p-1 px-2">Details</button>
                        </Link>

                    </div></li>

                </ul>


            </div>



        </div>


    </div>);

}

export default AssetsToborrow;