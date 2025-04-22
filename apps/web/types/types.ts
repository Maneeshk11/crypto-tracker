export type CryptoCurrency = {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  market_cap?: number;
  total_volume?: number;
  price_change_percentage_24h?: number;
  price_change_percentage_7d?: number;
};

export type Exchange = {
  id: string;
  name: string;
  image: string;
  no_markets?: number;
  volume_24h?: number;
  volume_7d?: number;
  change_percentage_24h?: number;
  year_established: string;
};

export type Wallet = {
  detail: EIP6963ProviderDetail;
  connected: boolean;
  accounts: string[];
};

export type Token = {
  name: string;
  amount?: string;
  total?: number;
  image?: string;
  symbol?: string;
  address: string;
  network?: string;
  balance: number;
  balance_usd?: number;
  balance_eth?: string;
  price?: number;
};

export type Asset = {
  name: string;
  symbol: string;
  address: string;
  network: string;
  balance: string;
  value?: string;
  logo?: string;
  price?: string;
  balance_eth?: string;
};

// export Token NativeETH = {

// }
