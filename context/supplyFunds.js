import { poolContract } from "./contract";
import { ethers } from "ethers";
import { toast } from "react-toastify";

async function supplyFunds(amount, market) {
    try {
        const toWeiBigNum = BigInt(ethers.parseUnits(amount, 18));
        const contractInstance = await poolContract();
        const tx = await contractInstance.poolSupply(
            ethers.encodeBytes32String(market),
            { value: toWeiBigNum }
        );

        await tx.wait();
        toast.success("Funds successfully supplied!");
        console.log("Funds successfully supplied:", tx);
        return true;
    } catch (error) {
        console.error("Error in supplying funds:", error);
        const errorMessage = error.reason || error.message || "Transaction failed";
        toast.error(`Supply failed: ${errorMessage}`);
        return false;
    }
}

export default supplyFunds;
