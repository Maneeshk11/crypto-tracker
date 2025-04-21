import { ethers } from "ethers";
import { getEthProvider } from "../providers/ethProvider";

const multicallAbi = [
  "function aggregate(tuple(address target, bytes callData)[] calls) payable returns (uint256 blockNumber, bytes[] returnData)",
];

const erc20Abi = [
  "function balanceOf(address) view returns (uint256)",
  "function decimals() view returns (uint8)",
];

const findTokens = async (walletAddress: string) => {
  const tokenAddressData = await fetch("https://uniswap.mycryptoapi.com/");
  const tokens = await tokenAddressData.json().then((data) => {
    return data.tokens;
  });

  const tokenAddress: string[] = tokens.map((token: any) => {
    return token.address as string;
  });

  const provider = await getEthProvider();

  const multicallContract = new ethers.Contract(
    "0xcA11bde05977b3631167028862bE2a173976CA11",
    multicallAbi,
    provider
  );

  const erc20Interface = new ethers.Interface(erc20Abi);

  const calls = tokenAddress.map((address) => {
    return {
      target: address,
      callData: erc20Interface.encodeFunctionData("balanceOf", [walletAddress]),
    };
  });

  if (!multicallContract.aggregate) {
    throw new Error("Multicall contract not found");
  }

  const res = await multicallContract.aggregate(calls);

  console.log("res: ", res);
};

export default findTokens;
