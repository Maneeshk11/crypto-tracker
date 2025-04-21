import { formatUnits } from "ethers";
import { getEthProvider } from "../providers/ethProvider";

export const getOverview = async (address: string) => {
  const provider = await getEthProvider();

  const balanceHex = await provider.getBalance(address);
  const balance = formatUnits(balanceHex);

  const value = await fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
  );
  const valueData = await value.json();

  return {
    balance,
    value: valueData.ethereum.usd,
  };
};
