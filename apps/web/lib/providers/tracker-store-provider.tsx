"use client";

import { useStore } from "zustand";

import { type TrackerStore, createTrackerStore } from "@/hooks/store";
import { type ReactNode, createContext, useContext, useRef } from "react";

export type TrackerStoreApi = ReturnType<typeof createTrackerStore>;

export const TrackerStoreContext = createContext<TrackerStoreApi | undefined>(
  undefined
);

export interface TrackerStoreProviderProps {
  children: ReactNode;
}

export const TrackerStoreProvider = ({
  children,
}: TrackerStoreProviderProps) => {
  const storeRef = useRef<TrackerStoreApi | null>(null);
  if (storeRef.current === null) {
    storeRef.current = createTrackerStore();
  }

  return (
    <TrackerStoreContext.Provider value={storeRef.current}>
      {children}
    </TrackerStoreContext.Provider>
  );
};

export const useTrackerStore = <T,>(
  selector: (store: TrackerStore) => T
): T => {
  const trackerStoreContext = useContext(TrackerStoreContext);

  if (!trackerStoreContext) {
    throw new Error(`useTrackerStore must be used within TrackerStoreProvider`);
  }

  return useStore(trackerStoreContext, selector);
};
