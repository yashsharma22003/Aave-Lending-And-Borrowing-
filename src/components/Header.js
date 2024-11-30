import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
const Header = () => {
    return (<div className=" border-b-2 border-gray-400 h-14 flex items-center ">
        <div className="text-4xl ml-4">
            <Link href={"./"}>Aave </Link>
        </div>
        <div className="flex justify-end ml-auto mr-5">
            <Link href={"./token"}>
                <button className="mx-3 rounded-lg p-2 shadow-md mt-1 transform hover:scale-105 transition duration-200 font-bold">Interest Token</button>
            </Link>

            <ConnectButton />
        </div>

    </div>)
}

export default Header;