import getTransactions from "@/lib/api/getTransactions";
import { formatAddress, formatTimestamp } from "@/utils/utils";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table";
import { BigNumber } from "alchemy-sdk";

import { Loader2, AlertCircle } from "lucide-react";
import { FC } from "react";

interface props {
  address: string;
  type: "transactions" | "internal-transactions";
}
const Transactions: FC<props> = ({ address, type }) => {
  const { data, isError, isPending } = useQuery({
    queryKey: ["transactions"],
    queryFn: () => getTransactions(address, type),
  });

  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Transaction Hash</TableHead>
            <TableHead className="w-[100px]">Method</TableHead>
            <TableHead className="w-[100px]">Block</TableHead>
            <TableHead className="w-[150px]">Age</TableHead>
            <TableHead className="w-[200px]">From</TableHead>
            <TableHead className="w-[200px]">To</TableHead>
            <TableHead className="w-[150px] text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isPending ? (
            <TableRow>
              <TableCell colSpan={7} className="h-32">
                <div className="flex flex-col items-center justify-center gap-2">
                  <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Loading transactions...
                  </p>
                </div>
              </TableCell>
            </TableRow>
          ) : !isPending && !isError && data ? (
            data?.transfers.map((transaction) => (
              <TableRow key={transaction.hash} className="hover:bg-transparent">
                <TableCell className="font-mono text-sm">
                  <a
                    href={`https://etherscan.io/tx/${transaction.hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {formatAddress(transaction.hash)}
                  </a>
                </TableCell>
                <TableCell>
                  <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                    {transaction.category}
                  </span>
                </TableCell>
                <TableCell className="font-mono text-sm">
                  {BigNumber.from(transaction.blockNum).toString()}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {formatTimestamp(transaction.metadata.blockTimestamp)}
                </TableCell>
                <TableCell className="font-mono text-sm">
                  <a
                    href={`https://etherscan.io/address/${transaction.from}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {formatAddress(transaction.from)}
                  </a>
                </TableCell>
                <TableCell className="font-mono text-sm">
                  {transaction.to ? (
                    <a
                      href={`https://etherscan.io/address/${transaction.to}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {formatAddress(transaction.to)}
                    </a>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </TableCell>
                <TableCell className="text-right font-mono text-sm">
                  {transaction.value} {transaction.asset}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="h-32">
                <div className="flex flex-col items-center justify-center gap-2">
                  <AlertCircle className="w-6 h-6 text-destructive" />
                  <p className="text-sm text-muted-foreground">
                    Failed to load transactions
                  </p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default Transactions;
