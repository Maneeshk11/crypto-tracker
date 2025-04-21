export const GetNativeEthBalance = async (
  provider: EIP6963ProviderDetail,
  walletAddress: string
) => {
  const balance = await provider.provider.request({
    method: "eth_getBalance",
    params: [walletAddress, "latest"],
  });
  return balance;
};
