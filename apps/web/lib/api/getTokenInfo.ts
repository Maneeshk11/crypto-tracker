import { ethers } from "ethers";
import { getEthProvider } from "../providers/ethProvider";

const erc20Abi = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function balanceOf(address) view returns (uint256)", // Optional, for balance
];

export const GetTokenInfo = async (
  tokenAddress: string,
  walletAddress: string
) => {
  const provider = await getEthProvider();
  const contract = new ethers.Contract(tokenAddress, erc20Abi, provider);

  if (
    !contract ||
    !contract.name ||
    !contract.symbol ||
    !contract.decimals ||
    !contract.balanceOf
  ) {
    throw new Error("Contract not found");
  }

  try {
    const [name, symbol, decimals, balance] = await Promise.all([
      contract.name(),
      contract.symbol(),
      contract.decimals(),
      contract.balanceOf(walletAddress),
    ]);

    return {
      name,
      symbol,
      decimals,
      formattedBalance: ethers.formatUnits(balance, decimals),
    };
  } catch (error) {
    console.error("Error fetching token info:", error);
    return null;
  }
};
