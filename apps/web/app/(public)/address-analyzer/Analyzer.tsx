"use client";

import { useState } from "react";
import AddressSearch from "./AddressSearch";
import { SearchStatus } from "@/types/enums";
import { ChartArea, Copy, Loader2 } from "lucide-react";
import Overview from "./Overview";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs";
import Transactions from "./Transactions";
import Assets from "./Assets";

const Analyzer = () => {
  const onSearch = (address: string) => {
    setSearchStatus(SearchStatus.LOADING);
    setText(address);
    setTimeout(() => {
      setSearchStatus(SearchStatus.SUCCESS);
    }, 1000);
  };

  const [text, setText] = useState<string>("");
  const [searchStatus, setSearchStatus] = useState<SearchStatus>(
    SearchStatus.IDLE
  );
  const [tab, setTab] = useState<string>("transactions");

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto w-full px-4 pt-8">
      <div className="flex flex-col gap-4">
        <span className="text-2xl font-medium flex items-center gap-2">
          <ChartArea className="" /> Address Analyzer
        </span>
        <p className="text-gray-600">
          Enter an Ethereum address to analyze its transactions, assets, and
          more.
        </p>
      </div>

      <AddressSearch onSearch={onSearch} searchStatus={searchStatus} />

      {searchStatus === SearchStatus.LOADING && (
        <div className="flex items-center justify-center py-12">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="text-gray-600">Analyzing address...</p>
          </div>
        </div>
      )}

      {searchStatus === SearchStatus.SUCCESS && (
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <span className=" font-medium text-gray-900 text-lg">Address</span>
            <div className="flex gap-3 items-center p-4 bg-gray-50 rounded-lg border border-gray-200">
              <span className="text-base text-gray-900 font-mono">{text}</span>
              <Copy
                onClick={() => {
                  navigator.clipboard.writeText(text);
                }}
                className="size-5 cursor-pointer text-gray-500 hover:text-gray-700 transition-colors"
              />
            </div>
          </div>

          <Overview address={text} />

          <div className="flex flex-col gap-6">
            <Tabs defaultValue={tab} onValueChange={setTab} className="w-full">
              <TabsList className="w-full bg-gray-50 p-1.5 rounded-xl border border-gray-200">
                <TabsTrigger
                  value="transactions"
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg px-6 py-3 text-sm font-medium"
                >
                  Transactions
                </TabsTrigger>
                <TabsTrigger
                  value="internal-transactions"
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg px-6 py-3 text-sm font-medium"
                >
                  Internal Transactions
                </TabsTrigger>
                <TabsTrigger
                  value="token-transfers"
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg px-6 py-3 text-sm font-medium"
                >
                  Token Transfers
                </TabsTrigger>
                <TabsTrigger
                  value="assets"
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg px-6 py-3 text-sm font-medium"
                >
                  Assets
                </TabsTrigger>
                <TabsTrigger
                  value="nfts"
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg px-6 py-3 text-sm font-medium"
                >
                  Analytics
                </TabsTrigger>
              </TabsList>

              <TabsContent value="transactions" className="mt-6">
                <Transactions address={text} type="transactions" />
              </TabsContent>
              <TabsContent value="internal-transactions" className="mt-6">
                <Transactions address={text} type="internal-transactions" />
              </TabsContent>
              <TabsContent value="assets" className="mt-6">
                <Assets address={text} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      )}
    </div>
  );
};

export default Analyzer;
