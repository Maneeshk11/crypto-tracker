"use client";

import getTokenBalances from "@/lib/api/getTokenBalances";
import { currencyNameFormatter } from "@/utils/components";
import { formatAddress } from "@/utils/utils";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

interface props {
  address: string;
}

const Assets: FC<props> = ({ address }) => {
  const { data, isPending, isError } = useQuery({
    queryKey: ["assets", address],
    queryFn: () => getTokenBalances(address),
  });
  return (
    <div>
      {isPending ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
          <span className="text-gray-600">Loading assets...</span>
        </div>
      ) : isError ? (
        <div className="flex items-center justify-center py-8">
          <span className="text-gray-600">Error loading assets</span>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Token</TableHead>
              <TableHead>Contract</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">Value</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data?.map((token) => (
              <TableRow key={token.address} className="hover:bg-transparent">
                <TableCell>
                  {currencyNameFormatter(
                    token.name || "",
                    token.symbol || "",
                    token.logo || ""
                  )}
                </TableCell>
                <TableCell className="font-mono text-sm text-primary hover:underline">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          href={`https://etherscan.io/address/${token.address}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {formatAddress(token.address)}
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>
                        <span className="text-xs">{token.address}</span>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
                <TableCell className="text-right">{token.price}</TableCell>
                <TableCell className="text-right">{token.balance}</TableCell>
                <TableCell className="text-right">{token.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default Assets;
