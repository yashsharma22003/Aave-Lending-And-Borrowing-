import { tokenContract } from "./contract"
import { poolContract } from "./contract";
import { parseUnits } from "ethers";
import { ethers } from "ethers";
export const getBalance = async(address) => {
    console.log(address);
    const contractInstance = await tokenContract();
    const balance = await contractInstance.balanceOf(address);
    return balance;
}

async function redeemToken(market,amount) {
    const contractInstance = await poolContract();
    const tx = await contractInstance.redeemEtherFromITOK(ethers.encodeBytes32String(market), amount);

}

export default redeemToken;