"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@workspace/ui/components/table";
import { useTrackerStore } from "@/lib/providers/tracker-store-provider";
import { Token } from "@/types/types";
import Image from "next/image";

const currencyNameFormatter = (name: string, symbol: string, logo: string) => {
  return (
    <span className="flex items-center gap-4">
      <Image
        src={logo}
        alt={name}
        width={20}
        height={20}
        className="w-6 h-6 rounded-full"
      />
      <span className="text-sm font-medium">
        {name} {" . "}
        <span className="text-xs text-muted-foreground">{symbol}</span>
      </span>
    </span>
  );
};

const Tokens = () => {
  //     const {tokens,}
  //   const ethTokens: Token[] = useWalletStore((state: any) => state.ethTokens);
  //   const addEthToken = useWalletStore((state: any) => state.addEthToken);

  const { tokens } = useTrackerStore((state: any) => state);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Token</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tokens.map((token: Token, index: number) => (
          <TableRow key={index}>
            <TableCell>
              {currencyNameFormatter(
                token.name,
                token.symbol || "",
                token.image || ""
              )}
            </TableCell>
            <TableCell>{token.amount}</TableCell>
            <TableCell>{token.price || 0}</TableCell>
            <TableCell>{token.total}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Tokens;
