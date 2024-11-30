
import { poolContract } from "./contract";
import { ethers } from "ethers";

export async function getSuppliedData(market) {
    const contractInstace = await poolContract();
    const suppliedAmount = await contractInstace.depositedAmount(ethers.encodeBytes32String(market));
    return (Number(suppliedAmount));
}

export async function getMarketAPY(market) {

    const contractInstance = await poolContract();
    const APY = await contractInstance.getInterest(ethers.encodeBytes32String(market));
    return (Number(APY));

}

export async function CollateraledAmount(market) { 

    const contractInstance = await poolContract();
    const Amount = await contractInstance.borrowedAmount(ethers.encodeBytes32String(market));
    const colAmount = Number(Amount) * 100 / 80
    console.log("col amount",colAmount);
    
    return (Number(colAmount));
}

export async function getBorrowed(market) {

    const contractInstance = await poolContract();
    const borrowedAmount =  await contractInstance.borrowedAmount(ethers.encodeBytes32String(market));
    return (Number(borrowedAmount));

}

export async function borrowingPower(market) {

    const contractInstance = await poolContract();
    const borrowingLimit = await contractInstance.borrowingLimit(ethers.encodeBytes32String(market));
    const borrowedAmount = await contractInstance.borrowedAmount(ethers.encodeBytes32String(market));
    const power = Number(borrowedAmount) * 100 / Number(borrowingLimit);
    return power;

} 

export async function borrow(market, amount) {

   
    try {
        const contractInstace = await poolContract();
        const tx = await contractInstace.poolBorrow(ethers.encodeBytes32String(market), BigInt(ethers.parseUnits(amount, 18)));
        await tx.wait();
        console.log(tx);
    } catch (error) {
        console.log(error);
    }

}
