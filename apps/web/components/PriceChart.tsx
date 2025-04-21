"use client";

import getPriceChart from "@/lib/api/getPricechart";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@workspace/ui/components/card";
import {
  ChartContainer,
  ChartConfig,
  ChartTooltip,
  ChartTooltipContent,
} from "@workspace/ui/components/chart";
import { useEffect, useState, useRef } from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

const chartConfig = {
  desktop: {
    label: "Price",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const PriceChart = ({ name, id }: { name: string; id: string }) => {
  const { data } = useQuery({
    queryKey: ["price-chart"],
    queryFn: () => getPriceChart(id),
  });

  // const ws = useRef<WebSocket | null>(null);
  // const [isConnected, setIsConnected] = useState(false);

  // useEffect(() => {
  //   if (!id) return;

  //   const websocket = new WebSocket("wss://data-stream.binance.vision:9443/ws");
  //   ws.current = websocket;

  //   websocket.onopen = () => {
  //     console.log("Connected to WebSocket");
  //     websocket.send(
  //       JSON.stringify({
  //         method: "SUBSCRIBE",
  //         params: ["btcusdt@ticker"],
  //         id: 1,
  //       })
  //     );
  //     setIsConnected(true);
  //   };

  //   websocket.onmessage = (event) => {
  //     const data = JSON.parse(event.data);
  //     console.log("Raw message:", data);
  //   };

  //   websocket.onerror = (error) => {
  //     console.error("WebSocket Error:", error);
  //     setIsConnected(false);
  //     ws.current = null;
  //   };

  //   websocket.onclose = () => {
  //     setIsConnected(false);
  //     ws.current = null;
  //     console.log("WebSocket Disconnected");
  //   };

  //   return () => {
  //     if (ws.current) {
  //       console.log("Closing WebSocket");
  //       if (ws.current.readyState === WebSocket.OPEN) {
  //         ws.current.send(
  //           JSON.stringify({
  //             method: "UNSUBSCRIBE",
  //             params: [`${id.toLowerCase()}@ticker`],
  //             id: 1,
  //           })
  //         );
  //       }
  //       ws.current.close();
  //       ws.current = null;
  //     }
  //   };
  // }, [id]);

  return (
    <Card className="w-full">
      <CardHeader>
        {/* <CardTitle className="text-lg font-medium">Price Chart</CardTitle> */}
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="price"
              type="natural"
              stroke="var(--primary)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Price Chart for <span className="text-violet-500">{name}</span> from
          the last 90 days
        </div>
      </CardFooter>
    </Card>
  );
};

export default PriceChart;
