import { Token, Wallet } from "@/types/types";
import { createStore } from "zustand";

declare global {
  interface WindowEventMap {
    "eip6963:announceProvider": CustomEvent;
  }
}

declare global {
  interface Window {
    ethereum: any;
  }
}

let providers: EIP6963ProviderDetail[] = [];

export const store = {
  value: () => providers,
  subscribe: (callback: () => void) => {
    function onAnnouncement(event: EIP6963AnnounceProviderEvent) {
      if (providers.map((p) => p.info.uuid).includes(event.detail.info.uuid))
        return;
      providers = [...providers, event.detail];
      callback();
    }

    // Listen for eip6963:announceProvider and call onAnnouncement when the event is triggered.
    window.addEventListener("eip6963:announceProvider", onAnnouncement);

    // Dispatch the event, which triggers the event listener in the MetaMask wallet.
    window.dispatchEvent(new Event("eip6963:requestProvider"));

    // Return a function that removes the event listener.
    return () =>
      window.removeEventListener("eip6963:announceProvider", onAnnouncement);
  },
};

export type TrackerState = {
  wallets: Wallet[];
  tokens: Token[];
};

export type TrackerActions = {
  addWallet: (wallet: Wallet) => void;
  removeWallet: (wallet: string) => void;
  addToken: (token: Token) => void;
};

export type TrackerStore = TrackerState & TrackerActions;

export const defaultState: TrackerState = {
  wallets: [],
  tokens: [],
};

export const createTrackerStore = (
  initialState: TrackerState = defaultState
) => {
  return createStore<TrackerStore>()((set) => ({
    ...initialState,
    addWallet: (wallet: Wallet) =>
      set((state: any) => ({
        wallets: [...state.wallets, wallet],
      })),

    removeWallet: (wallet: string) =>
      set((state: any) => ({
        wallets: state.wallets.filter(
          (w: Wallet) => w.detail.info.name !== wallet
        ),
      })),

    addToken: (token: Token) =>
      set((state: any) => ({
        tokens: [...state.tokens, token],
      })),
  }));
};
