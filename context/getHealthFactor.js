import { poolContract } from "./contract"
import { ethers } from "ethers";

export const getHealthFactor = async(market, sender) => {
    try{
    if(typeof(market) && typeof(sender) !== 'undefined') {
    const contractInstance = await poolContract();
    const hf = await contractInstance.healthFactor(ethers.encodeBytes32String(market), sender)
    }
    }
    catch(error) {
        console.log(error);
    }
    
}