"use client"
import { poolContract } from "./contract"

export const getMarket = async(count) => {
    const contractInstance = await poolContract();
    let pool = await contractInstance.poolsCreated(count);
    return pool;

}