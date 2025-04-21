"use client";

import { useTrackerStore } from "@/lib/providers/tracker-store-provider";
import { useSyncProviders } from "@/hooks/useSyncProviders";
import { Token, Wallet } from "@/types/types";
import { formatAddress } from "@/utils/utils";
import { Button } from "@workspace/ui/components/button";
import Image from "next/image";
import { useEffect } from "react";
import { toast } from "sonner";
import { GetNativeEthBalance } from "@/lib/api/token-balances";
import { formatEther } from "ethers";
import findTokens from "@/lib/api/findTokens";

const walletsList = [
  {
    id: 1,
    name: "MetaMask",
    icon: "https://images.ctfassets.net/clixtyxoaeas/1ezuBGezqfIeifWdVtwU4c/d970d4cdf13b163efddddd5709164d2e/MetaMask-icon-Fox.svg",
  },
  {
    id: 2,
    name: "Coinbase Wallet",
    icon: "https://www.coinbase.com/assets/sw-cache/a_4fFhElUj.png",
  },
  // {
  //   id: 3,
  //   name: "Binance",
  //   icon: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Binance_Logo.svg",
  // },
];

const DiscoverWalletProviders = () => {
  const providers = useSyncProviders();

  const { wallets, addWallet, removeWallet, addToken } = useTrackerStore(
    (state: any) => state
  );

  const addNativeEth = async (
    provider: EIP6963ProviderDetail,
    walletAddress: string
  ) => {
    const balance = await GetNativeEthBalance(provider, walletAddress);
    const token = await fetch(
      `https://api.coingecko.com/api/v3/coins/ethereum`
    );
    const tokenData = await token.json();
    console.log(tokenData);
    addToken({
      name: tokenData.name,
      symbol: tokenData.symbol,
      image: tokenData.image.small,
      address: "",
      balance: balance,
      amount: formatEther(balance as any),
      total:
        Number(formatEther(balance as any)) *
        tokenData.market_data.current_price.usd,
      network: "ethereum",
      price: tokenData.market_data.current_price.usd,
    } as Token);
  };

  useEffect(() => {
    const providersWithInfo = providers.filter((p) =>
      walletsList.find((w) => w.name === p.info.name)
    );
    providersWithInfo.forEach(async (p) => {
      const accs: any = await p.provider.request({
        method: "eth_accounts",
      });
      if (accs.length > 0) {
        addWallet({
          detail: p,
          connected: true,
          accounts: accs as string[],
        } as Wallet);
        addNativeEth(p, accs[0]);
        findTokens(accs[0]);
      }
    });
  }, [providers]);

  const handleDisconnect = async (providerName: string) => {
    const provider = wallets.find(
      (p: Wallet) => p.detail.info.name === providerName
    );
    if (!provider) {
      toast.error(`${providerName} provider not found`);
      return;
    }
    try {
      await provider.detail.provider.request({
        method: "wallet_revokePermissions",
        params: [
          {
            eth_accounts: provider.accounts,
          },
        ],
      });
      removeWallet(providerName);
    } catch (error) {
      console.error(error);
      toast.error(`${providerName} provider not found`);
    }
  };

  const HandleConnect = async ({ providerName }: { providerName: string }) => {
    const providerWithInfo = providers.find(
      (p) => p.info.name === providerName
    );

    if (!providerWithInfo) {
      toast.error(`${providerName} provider not found`);
      console.log("providers: ", providers);
      return;
    }
    try {
      const accounts = await providerWithInfo.provider.request({
        method: "eth_requestAccounts",
      });
      addWallet({
        detail: providerWithInfo,
        connected: true,
        accounts: accounts as string[],
      } as Wallet);
      console.log(accounts);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-4">
        {walletsList.map((wallet, key) => (
          <div
            key={key}
            className="grid grid-cols-3 items-center gap-4 w-[600px]"
          >
            <div className="flex items-center gap-4">
              <Image
                src={wallet.icon}
                alt={wallet.name}
                width={20}
                height={20}
              />
              <span className="text-xl">{wallet.name}</span>
            </div>
            <Button
              variant={
                wallets.find((w: Wallet) => w.detail.info.name === wallet.name)
                  ? "destructive"
                  : "secondary"
              }
              className="cursor-pointer"
              onClick={() => {
                if (
                  wallets.find(
                    (w: Wallet) => w.detail.info.name === wallet.name
                  )
                ) {
                  handleDisconnect(wallet.name);
                } else {
                  HandleConnect({ providerName: wallet.name });
                }
              }}
            >
              {wallets.find((w: Wallet) => w.detail.info.name === wallet.name)
                ? "Disconnect"
                : "Connect"}
            </Button>
            {wallets.find(
              (w: Wallet) => w.detail.info.name === wallet.name
            ) && (
              <span className="text-sm">
                {formatAddress(
                  wallets.find(
                    (w: Wallet) => w.detail.info.name === wallet.name
                  ).accounts[0]
                )}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiscoverWalletProviders;
