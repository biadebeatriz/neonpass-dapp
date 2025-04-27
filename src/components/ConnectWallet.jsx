import { ethers } from "ethers";

export async function connectWallet(setWallet) {
  if (!window.ethereum) {
    alert("Please install Metamask!");
    return;
  }

  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const address = await signer.getAddress();

    setWallet({ provider, signer, address });
  } catch (error) {
    console.error("Failed to connect wallet:", error);
    alert("Failed to connect wallet.");
  }
}
