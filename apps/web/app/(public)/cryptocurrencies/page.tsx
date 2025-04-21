"use client";

import getCryptocurrencies from "@/lib/api/getCryptoCurrencies";
import { CryptoCurrency } from "@/types/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table";
import { ReceiptCent, SearchIcon } from "lucide-react";
import { useEffect } from "react";
import Image from "next/image";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@workspace/ui/components/input";
import getCryptoBySearch from "@/lib/api/getCryptoBySearch";
import { Button } from "@workspace/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog";
import PriceChart from "@/components/PriceChart";
import { currencyNameFormatter } from "@/utils/components";

const currencyValueFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  compactDisplay: "short",
});

const CryptocurrenciesPage = () => {
  const [cryptocurrencies, setCryptocurrencies] = useState<CryptoCurrency[]>(
    [] as CryptoCurrency[]
  );

  const { data } = useQuery({
    queryKey: ["cryptocurrencies"],
    queryFn: () => getCryptocurrencies(),
  });

  useEffect(() => {
    setCryptocurrencies(data ?? []);
  }, [data]);

  return (
    <div className="flex flex-col gap-4">
      <span className="text-2xl font-medium flex items-center gap-2">
        <ReceiptCent className="" /> Cryptocurrencies
      </span>

      <div className="flex items-center gap-2 border border-border px-2 rounded-md bg-input">
        <SearchIcon className="w-4 h-4 text-white" />
        <Input
          type="text"
          placeholder="Search for a cryptocurrency"
          onChange={async (e) => {
            const timeoutId = setTimeout(async () => {
              const search = e.target.value;
              const data = await getCryptoBySearch(search);
              setCryptocurrencies(data ?? []);
            }, 1000);

            return () => clearTimeout(timeoutId);
          }}
          className="border-none text-white placeholder:text-white focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/4">Name</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">Market Cap</TableHead>
            <TableHead className="text-right">Volume 24h</TableHead>
            <TableHead className="text-right">Price Graph</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cryptocurrencies.length > 0 ? (
            cryptocurrencies.map((currency: CryptoCurrency) => (
              <TableRow key={currency.id}>
                <TableCell>
                  {currencyNameFormatter(
                    currency.name,
                    currency.symbol,
                    currency.image
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {currencyValueFormatter.format(currency.current_price)}
                </TableCell>
                <TableCell className="text-right">
                  {currencyValueFormatter.format(currency.market_cap ?? 0)}
                </TableCell>
                <TableCell className="text-right">
                  {currencyValueFormatter.format(currency.total_volume ?? 0)}
                </TableCell>
                <TableCell className="text-right">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="cursor-pointer">View</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px] max-h-[600px] z-50">
                      <DialogHeader>
                        <DialogTitle className="font-medium">
                          <span className="text-violet-500">
                            {currency.name}
                          </span>{" "}
                          Price chart
                        </DialogTitle>
                      </DialogHeader>
                      <div className="flex flex-col items-center justify-center gap-4">
                        <Image
                          src={currency.image}
                          alt={currency.name}
                          width={100}
                          height={100}
                        />
                        <PriceChart name={currency.name} id={currency.id} />
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                No data
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CryptocurrenciesPage;
