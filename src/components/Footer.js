import Image from 'next/image';
import { CiInstagram } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";
import { CiFacebook } from "react-icons/ci";
import { CiYoutube } from "react-icons/ci";

const Footer = () => {
    return (
        <div className="flex border-black border-t-2 h-40 justify">
            <img src="./AaveLogo.png" alt="Descriptive alt text" width="150" height="10" sizes="" />
            <div className="flex w-1/2 my-auto">
                <h3 className="font-extralight text-xs bg-gray-100 p-2">
                    Aave.com provides information and resources about the fundamentals of the decentralised
                    non-custodial liquidity protocol called the Aave Protocol, comprised of open-source self-executing
                    smart contracts that are deployed on various permissionless public blockchains, such as Ethereum
                    (the &quot;Aave Protocol&quot; or the &quot;Protocol&quot;). Aave Labs does not control or operate
                    any version of the Aave Protocol on any blockchain network.
                </h3>
            </div>

            <div className="items-top justify-end flex ml-auto mt-4 mr-4 space-x-2">
                <CiFacebook size={"20"} />
                <CiInstagram size={"20"} />
                <CiYoutube size={"20"} />
                <FaXTwitter size={"19"} />
            </div>
        </div>
    );
};

export default Footer;
