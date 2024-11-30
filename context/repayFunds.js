import { poolContract } from "./contract"
import { ethers } from "ethers";

const repayFunds = async(market, amount) => {
    try {
        const contractInstance = await poolContract();
        const tx = await contractInstance.poolRepay(ethers.encodeBytes32String(market), {
            value:  BigInt(ethers.parseUnits(amount, 18))
        });
        await tx.wait();
    }
    catch(error) {
        console.log(error);
    }

}

export default repayFunds;