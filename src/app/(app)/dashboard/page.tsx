
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BellIcon, PlusCircledIcon, VercelLogoIcon, CheckboxIcon, ArchiveIcon } from '@radix-ui/react-icons';
import { Bar, BarChart, CartesianGrid, Line, LineChart, Pie, PieChart, Sector, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import * as React from "react";


const testsByDepartment = [
  { name: "Chemistry", tests: 3, fill: "var(--color-chemistry)" },
  { name: "Hematology", tests: 2, fill: "var(--color-hematology)" },
  { name: "Microbiology", tests: 1, fill: "var(--color-microbiology)" },
];

const monthlyOrderVolume = [
  { month: "July", Chemistry: 2, Hematology: 1, Microbiology: 0 },
];


const chartConfig = {
  tests: {
    label: "Tests",
  },
  chemistry: {
    label: "Chemistry",
    color: "hsl(var(--chart-2))",
  },
  hematology: {
    label: "Hematology",
    color: "hsl(var(--chart-1))",
  },
  microbiology: {
    label: "Microbiology",
    color: "hsl(var(--chart-3))",
  },
};

export default function DashboardPage() {
  const [activeDepartment, setActiveDepartment] = React.useState(testsByDepartment[0].name);

  const activeIndex = React.useMemo(
    () => testsByDepartment.findIndex((item) => item.name === activeDepartment),
    [activeDepartment]
  );
  
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of laboratory activities and key metrics.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <BellIcon className="h-4 w-4" />
          </Button>
          <Button>
            <PlusCircledIcon className="mr-2 h-4 w-4" />
            Register Sample
          </Button>
          <Button variant="outline">
            <PlusCircledIcon className="mr-2 h-4 w-4" />
            Place Order
          </Button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Samples Received Today
            </CardTitle>
            <VercelLogoIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142</div>
            <p className="text-xs text-muted-foreground">
              +15% from yesterday
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Tests in Progress
            </CardTitle>
            <VercelLogoIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">
              Across all active samples
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Results Awaiting Validation
            </CardTitle>
            <CheckboxIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              Requires supervisor approval
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Instrument Status</CardTitle>
            <ArchiveIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3/3 Online</div>
             <p className="text-xs text-muted-foreground">
              All instruments are connected
            </p>
          </CardContent>
        </Card>
      </div>

       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Order Trends by Department</CardTitle>
            <CardDescription>Monthly trend of test orders by department.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <LineChart
                accessibilityLayer
                data={monthlyOrderVolume}
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
                 <ChartLegend content={<ChartLegendContent />} />
                <Line
                  dataKey="Hematology"
                  type="natural"
                  stroke="var(--color-hematology)"
                  strokeWidth={2}
                  dot={false}
                />
                 <Line
                  dataKey="Chemistry"
                  type="natural"
                  stroke="var(--color-chemistry)"
                  strokeWidth={2}
                  dot={false}
                />
                 <Line
                  dataKey="Microbiology"
                  type="natural"
                  stroke="var(--color-microbiology)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="col-span-3 flex flex-col">
          <CardHeader>
            <CardTitle>Available Tests by Department</CardTitle>
            <CardDescription>Distribution of tests offered across lab departments.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[250px]"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={testsByDepartment}
                  dataKey="tests"
                  nameKey="name"
                  innerRadius={60}
                  activeIndex={activeIndex}
                  activeShape={({ outerRadius = 0, ...props }) => (
                    <g>
                      <Sector {...props} outerRadius={outerRadius + 10} />
                      <Sector
                        {...props}
                        outerRadius={outerRadius}
                        innerRadius={outerRadius - 8}
                      />
                    </g>
                  )}
                   onMouseOver={(e) => {
                     setActiveDepartment(e.name);
                   }}
                />
                 <ChartLegend
                  content={<ChartLegendContent nameKey="name" />}
                  onMouseOver={(data) => {
                    if (data.value) {
                      setActiveDepartment(data.value);
                    }
                  }}
                 />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Alerts</CardTitle>
          <CardDescription>
            Important notifications and system alerts.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-destructive/10">
                <BellIcon className="h-4 w-4 text-destructive" />
              </div>
              <div>
                <p className="font-medium">Critical: Centrifuge #2 Offline</p>
                <p className="text-sm text-muted-foreground">
                  The instrument has lost connection. Please check the network and power.
                </p>
                 <p className="text-xs text-muted-foreground mt-1">2 minutes ago</p>
              </div>
            </div>
             <div className="flex items-start gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500/10">
                <BellIcon className="h-4 w-4 text-yellow-500" />
              </div>
              <div>
                <p className="font-medium">Warning: QC failure on Glucose test</p>
                <p className="text-sm text-muted-foreground">
                  Batch #QC-5821 failed quality control checks. Recalibration may be required.
                </p>
                 <p className="text-xs text-muted-foreground mt-1">1 hour ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
