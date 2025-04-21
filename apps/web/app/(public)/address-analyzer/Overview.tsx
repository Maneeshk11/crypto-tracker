"use client";

import { getOverview } from "@/lib/api/getQuery";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

const Overview = ({ address }: { address: string }) => {
  const { data, isPending } = useQuery({
    queryKey: ["overview", address],
    queryFn: () => getOverview(address),
  });

  return (
    <div className="flex flex-col gap-2">
      <span className="text-lg font-medium text-gray-900">Overview</span>

      {isPending ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </div>
      ) : (
        <div className="flex flex-col gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium text-gray-500">
              ETH Balance
            </span>
            <span className="text-xl font-mono text-gray-900">
              {data?.balance} ETH
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium text-gray-500">ETH Value</span>
            <span className="text-xl font-mono text-gray-900">
              ${(Number(data?.value) * Number(data?.balance))?.toFixed(2)}
            </span>
            <span className="text-sm text-gray-500">${data?.value}/ETH</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Overview;
