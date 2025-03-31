const getPriceChart = async (id: string) => {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=90&interval=daily`
    );
    const data = await response.json();
    return data.prices.map((price: [number, number]) => {
      return {
        day: price[0],
        price: price[1],
      };
    });
  } catch (error) {
    console.log("Error fetching price chart: ", error);
    return [] as { day: number; price: number }[];
  }
};

export default getPriceChart;
