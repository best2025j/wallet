import React, { useState } from "react";
import { ethers } from "ethers";

const App = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [ethBalance, setEthBalance] = useState("");

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        // Request account access
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);

        // Create an instance of the provider
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const balance = await provider.getBalance(accounts[0]);
        setEthBalance(ethers.utils.formatEther(balance));
      } catch (error) {
        console.error("Error connecting wallet:", error);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Connect MetaMask Wallet</h1>
      <button
        onClick={connectWallet}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
      >
        Connect Wallet
      </button>

      {walletAddress && (
        <div className="mt-6 bg-white shadow-md rounded p-4">
          <p>
            <strong>Wallet Address:</strong> {walletAddress}
          </p>
          <p>
            <strong>ETH Balance:</strong> {ethBalance} ETH
          </p>
        </div>
      )}
    </div>
  );
};

export default App;
