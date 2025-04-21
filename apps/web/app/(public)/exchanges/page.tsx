"use client";

import getCryptoBySearch from "@/lib/api/getCryptoBySearch";
import { LayoutTemplate, SearchIcon } from "lucide-react";
import { useState } from "react";
import { Input } from "@workspace/ui/components/input";
import { Exchange } from "@/types/types";
import getExchanges from "@/lib/api/getExchanges";
import { useQuery } from "@tanstack/react-query";

const ExchangesPage = () => {
  const [exchanges, setExchanges] = useState<Exchange[]>([]);

  const { data } = useQuery({
    queryKey: ["exchanges"],
    queryFn: () => getExchanges(),
  });

  return (
    <div className="flex flex-col gap-4">
      <span className="text-2xl font-medium flex items-center gap-2">
        <LayoutTemplate className="" /> Exchanges
      </span>

      <div className="flex items-center gap-2 border border-border px-2 rounded-md bg-input">
        <SearchIcon className="w-4 h-4 text-white" />
        <Input
          type="text"
          placeholder="Search for an exchange"
          onChange={async (e) => {
            const timeoutId = setTimeout(async () => {
              const search = e.target.value;
              // const data = await getCryptoBySearch(search);
              // setExchanges(data ?? []);
            }, 1000);

            return () => clearTimeout(timeoutId);
          }}
          className="border-none text-white placeholder:text-white focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
        />
      </div>
    </div>
  );
};

export default ExchangesPage;
