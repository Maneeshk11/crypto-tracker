import { Exchange } from "@/types/types";

const getExchanges = async () => {
  try {
    const response = await fetch("https://api.coingecko.com/api/v3/exchanges");
    const data = await response.json();
    const exchanges = data as Exchange[];
    return exchanges;
  } catch (error) {
    console.log("getExchanges error: ", error);
    return [] as Exchange[];
  }
};

export default getExchanges;
