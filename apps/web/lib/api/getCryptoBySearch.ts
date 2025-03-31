import { CryptoCurrency } from "@/types/types";
import getCryptocurrencies from "./getCryptoCurrencies";

const getCryptoBySearch = async (search: string) => {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/search?query=${search}`
    );
    const data = await response.json();
    const coins = data.coins as CryptoCurrency[];
    const ids = coins.map((coin) => coin.id);

    const cryptocurrencies = await getCryptocurrencies(ids.join(","));

    return cryptocurrencies;
  } catch (error) {
    console.log("getCryptoBySearch error", error);
    return [] as CryptoCurrency[];
  }
};

export default getCryptoBySearch;
