import { CryptoCurrency } from "@/types/types";

const getCryptocurrencies = async (ids?: string) => {
  try {
    let response;
    if (ids && ids !== "") {
      response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_by_total_volume&per_page=100&page=1&sparkline=false&price_change_percentage=24h&locale=en&ids=${ids}`
      );
      const data = await response.json();
      return data as CryptoCurrency[];
    } else {
      response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_by_total_volume&per_page=100&page=1&sparkline=false&price_change_percentage=24h&locale=en`
      );
    }

    const data = await response.json();
    return data as CryptoCurrency[];
  } catch (error) {
    console.log("getCryptoCurrencies error", error);
    return [] as CryptoCurrency[];
  }
};

export default getCryptocurrencies;
