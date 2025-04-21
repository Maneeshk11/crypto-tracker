"use client";

import * as React from "react";
import { SidebarProvider } from "@workspace/ui/components/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TrackerStoreProvider } from "@/lib/providers/tracker-store-provider";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider>
        <TrackerStoreProvider>{children}</TrackerStoreProvider>
      </SidebarProvider>
    </QueryClientProvider>
  );
}
