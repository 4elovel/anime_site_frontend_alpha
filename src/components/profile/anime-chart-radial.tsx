"use client";

import { TrendingUp } from "lucide-react";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

export const description = "A radial chart with text";

const chartData = [{ animeCount: 220, fill: "#399A54" }];

const chartConfig = {} satisfies ChartConfig;

export function AnimeChartRadial() {
  const innerRadius = 53;
  const outerRadius = 63;

  return (
    <Card className="flex flex-col bg-transparent border-0 gap-1 px-0!">
      {/* <CardHeader className="items-center pb-0">
        <CardTitle>Radial Chart - Text</CardTitle>
      </CardHeader> */}
      <CardContent className="flex-1 pb-0 mb-0 p-0! px-0!">
        <ChartContainer
          config={chartConfig}
          className="m-0! aspect-square h-[120px] b-0! px-0!"
        >
          <RadialBarChart
            data={chartData}
            startAngle={100}
            endAngle={-230}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            className="p-0!"
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="transparent"
              className="fill-transparent b-0! p-0!"
              polarRadius={[57, 48]}
            />
            <RadialBar dataKey="animeCount" background cornerRadius={10} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-white text-xl font-bold text-white! "
                        >
                          {chartData[0].animeCount.toLocaleString()}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm mt-0 m-0 p-0">
        <h1 className="text-[#918C8C] text-lg font-[500]">Завершено</h1>
      </CardFooter>
    </Card>
  );
}
