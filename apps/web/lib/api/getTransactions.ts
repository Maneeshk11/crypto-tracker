import { AssetTransfersCategory } from "alchemy-sdk";
import { getAlchemyProvider } from "../providers/alchemyProvider";

const getTransactions = async (
  address: string,
  type: "transactions" | "internal-transactions"
) => {
  try {
    const provider = await getAlchemyProvider();

    if (!provider) {
      throw new Error("Provider not found");
    }

    if (type === "transactions") {
      const transfers = await provider.core.getAssetTransfers({
        category: [AssetTransfersCategory.EXTERNAL],
        toAddress: address,
        withMetadata: true,
        fromBlock: "0x0",
        excludeZeroValue: true,
      });

      return transfers;
    }

    if (type === "internal-transactions") {
      const transfers = await provider.core.getAssetTransfers({
        category: [AssetTransfersCategory.INTERNAL],
        toAddress: address,
        withMetadata: true,
        fromBlock: "0x0",
        excludeZeroValue: true,
      });

      return transfers;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default getTransactions;
