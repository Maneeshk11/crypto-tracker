import { Network } from "alchemy-sdk";
import { getAlchemyProvider } from "../providers/alchemyProvider";
import { Asset } from "@/types/types";
import { formatEther } from "ethers";

const getTokenBalances = async (address: string) => {
  try {
    const provider = await getAlchemyProvider();
    if (!provider) {
      throw new Error("Provider not found");
    }

    const tokens: Asset[] = [];

    // native eth
    const nativeEth = await provider.core.getBalance(address);

    const nativeEthToken: Asset = {
      address: "0x0000000000000000000000000000000000000000",
      balance: formatEther(Number(nativeEth)),
      name: "Ether",
      symbol: "ETH",
      logo: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
      network: Network.ETH_MAINNET,
      balance_eth: Number(formatEther(Number(nativeEth))).toPrecision(3),
    };

    // erc-20
    const resp = await provider.core.getTokensForOwner(address);

    const balances = resp.tokens.filter(
      (token) => token.balance !== "0" && token.balance !== "0.0"
    );

    tokens.push(
      ...balances.map((token) => ({
        address: token.contractAddress,
        balance: token.balance ?? "0",
        name: token.name ?? "",
        symbol: token.symbol ?? "",
        logo: token.logo ?? "",
        network: Network.ETH_MAINNET,
      }))
    );

    // native eth price
    const nativeEthPriceResponse = await provider.prices.getTokenPriceByAddress(
      [
        {
          network: Network.ETH_MAINNET,
          address: "0x0000000000000000000000000000000000000000",
        },
      ]
    );
    nativeEthToken.price = nativeEthPriceResponse.data[0]?.prices[0]?.value;
    nativeEthToken.value = (
      Number(nativeEthToken.balance) * Number(nativeEthToken.price)
    ).toFixed(2);

    const ethPrice = nativeEthPriceResponse.data[0]?.prices[0]?.value;

    // erc-20 prices

    const tokenPrices = await provider.prices.getTokenPriceByAddress(
      tokens.map((token) => ({
        network: Network.ETH_MAINNET,
        address: token.address,
      }))
    );

    for (const token of tokens) {
      token.price = Number(
        tokenPrices.data.find((t) => t.address === token.address)?.prices[0]
          ?.value
      ).toFixed(2);
      token.value = (Number(token.balance) * Number(token.price))
        .toFixed(2)
        .toString();
      token.balance_eth = (Number(token.value) / Number(ethPrice)).toPrecision(
        2
      );
    }

    tokens.unshift(nativeEthToken);
    return tokens;
  } catch (error) {
    console.error(error);
  }
};

export default getTokenBalances;
