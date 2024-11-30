import { poolContract } from "./contract";
import { parseUnits, ethers } from "ethers";

const withdrawFunds = async(market, amount) => {
    try {
        const toWeiBigNum = BigInt(parseUnits(amount, 18));
        const contractInstance = await poolContract();
        const tx = contractInstance.withdrawSupply(ethers.encodeBytes32String(market), toWeiBigNum)
    }
    catch(error) {
        console.log("Error in transaction ", error);
    }

}

export default withdrawFunds;