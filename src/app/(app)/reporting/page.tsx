"use client";

import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import { FileIcon } from "@radix-ui/react-icons";

const monthlyTestVolume = [
  { month: "Jan", total: 1200 },
  { month: "Feb", total: 1500 },
  { month: "Mar", total: 1300 },
  { month: "Apr", total: 1800 },
  { month: "May", total: 2100 },
  { month: "Jun", total: 2400 },
];

const testsByDepartment = [
  { name: "Hematology", tests: 4000, fill: "var(--color-hematology)" },
  { name: "Chemistry", tests: 3000, fill: "var(--color-chemistry)" },
  { name: "Microbiology", tests: 2000, fill: "var(--color-microbiology)" },
  { name: "Immunology", tests: 2780, fill: "var(--color-immunology)" },
  { name: "Pathology", tests: 1890, fill: "var(--color-pathology)" },
];

const chartConfig = {
  total: {
    label: "Tests",
    color: "hsl(var(--chart-1))",
  },
  hematology: {
    label: "Hematology",
    color: "hsl(var(--chart-1))",
  },
  chemistry: {
    label: "Chemistry",
    color: "hsl(var(--chart-2))",
  },
  microbiology: {
    label: "Microbiology",
    color: "hsl(var(--chart-3))",
  },
  immunology: {
    label: "Immunology",
    color: "hsl(var(--chart-4))",
  },
  pathology: {
    label: "Pathology",
    color: "hsl(var(--chart-5))",
  },
};

export default function ReportingPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reporting</h1>
          <p className="text-muted-foreground">
            Analyze laboratory performance and trends.
          </p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button>
            <FileIcon className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Avg. Turnaround Time</CardTitle>
            <CardDescription>Average time from sample receipt to result validation.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">4.2 hours</p>
            <p className="text-xs text-muted-foreground">-5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Test Volume</CardTitle>
             <CardDescription>Total number of tests performed this month.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">9,452</p>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Critical Value Alerts</CardTitle>
            <CardDescription>Results requiring immediate clinical attention.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">18</p>
            <p className="text-xs text-muted-foreground">+3 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>QC Pass Rate</CardTitle>
            <CardDescription>Percentage of quality control checks passed.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">99.8%</p>
            <p className="text-xs text-muted-foreground">Consistent with last month</p>
          </CardContent>
        </Card>
      </div>
       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Test Volume Over Time</CardTitle>
            <CardDescription>Monthly trend of total tests performed.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <LineChart
                accessibilityLayer
                data={monthlyTestVolume}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.toLocaleString()}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" />}
                />
                <Line
                  dataKey="total"
                  type="natural"
                  stroke="var(--color-total)"
                  strokeWidth={2}
                  dot={{
                    fill: "var(--color-total)",
                  }}
                  activeDot={{
                    r: 6,
                  }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
         <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Tests by Department</CardTitle>
            <CardDescription>Distribution of tests across lab departments.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <BarChart
                accessibilityLayer
                data={testsByDepartment}
                layout="vertical"
                margin={{
                  left: 10,
                }}
              >
                <YAxis
                  dataKey="name"
                  type="category"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  className="capitalize"
                />
                <XAxis dataKey="tests" type="number" hide />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar dataKey="tests" layout="vertical" radius={5} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
