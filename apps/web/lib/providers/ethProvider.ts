import { ethers } from "ethers";

export const getEthProvider = async () => {
  if (!window.ethereum) {
    throw new Error("Ethereum provider not found");
  }
  await window.ethereum.request({ method: "eth_accounts" });

  return new ethers.BrowserProvider(window.ethereum);
};

// const optProvider = {
//   provider: new ethers.JsonRpcProvider(""),
//   signer: provider.getSigner(),
// };

// const arbitrumProvider = {
//   provider: new ethers.JsonRpcProvider(),
//   signer: provider.getSigner(),
// };

// const sepoliaProvider = {
//   provider: new ethers.JsonRpcProvider("https://rpc.sepolia.org"),
//   signer: provider.getSigner(),
// };
