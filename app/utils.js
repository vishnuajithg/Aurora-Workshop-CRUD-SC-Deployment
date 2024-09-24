"use client";
import { ethers } from "ethers";
import { contractAddress, contractAbi } from "./contractRefs";

export let signer = null;
export let provider;

export async function connectWithMetamask() {
    console.log("calling connect with metamask");
    if (window.ethereum == null) {
        console.log("MetaMask not installed; using read-only defaults");
        provider = ethers.getDefaultProvider();
        console.log(provider);
    } else {
        provider = await new ethers.BrowserProvider(window.ethereum);
        console.log(provider);
        signer = await provider.getSigner();
        console.log(signer);
        return await provider.send("eth_requestAccounts", [0]);
    }
}
connectWithMetamask();

// Utility to create a new user
export async function createUser(name, favNum) {
    await connectWithMetamask();
    const contract = new ethers.Contract(contractAddress, contractAbi, signer);
    const tx = await  contract.createUser(name, favNum);
    console.log("user created transaction",tx);
    return tx;
}

// Utility to get a user's details
export async function getUser(userId) {
    await connectWithMetamask();
    const contract = new ethers.Contract(contractAddress, contractAbi, provider);
    const user = await  contract.getUser(userId);
    console.log("user details",user);
    return {
        id: user[0].toString(),
        name: user[1], 
        favNumber: user[2].toString()
    };
}

// Utility to delete a user
export async function deleteUser(userId) {
    await connectWithMetamask();
    const contract = new ethers.Contract(contractAddress, contractAbi, signer);
    const tx = await  contract.deleteUser(userId);
    console.log("delete user transaction",tx);
    return tx;
}

// Utility to update a user's name and favorite number
export async function updateUser(userId, name, favNum) {
    await connectWithMetamask();
    const contract = new ethers.Contract(contractAddress, contractAbi, signer);
    const tx = await  contract.updateUser((userId, name, favNum));
    await tx.wait();
    console.log("user update transaction",tx);
    return tx;
}



// Utility to get the total number of users
export async function getUserCount() {
    await connectWithMetamask();
    const contract = new ethers.Contract(contractAddress, contractAbi, provider);
    const userCount = await contract.getUsersCount();
    console.log("user count details", userCount);
    return userCount.toString(); 
}

