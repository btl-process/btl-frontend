"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { useIsMobile } from "@/hooks/use-mobile"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

export const description = "An interactive area chart"

const chartData = [
  // April 2024
  { date: "2024-04-01", resolved: 12, pending: 5, overdue: 2 },  // Monday - high volume
  { date: "2024-04-02", resolved: 14, pending: 4, overdue: 1 },
  { date: "2024-04-03", resolved: 11, pending: 6, overdue: 3 },
  { date: "2024-04-04", resolved: 13, pending: 3, overdue: 1 },
  { date: "2024-04-05", resolved: 9, pending: 2, overdue: 0 },   // Friday - winding down
  { date: "2024-04-06", resolved: 3, pending: 4, overdue: 1 },   // Weekend - lower volume
  { date: "2024-04-07", resolved: 2, pending: 5, overdue: 2 },   // Weekend
  { date: "2024-04-08", resolved: 15, pending: 7, overdue: 3 },  // Monday - backlog from weekend
  { date: "2024-04-09", resolved: 11, pending: 5, overdue: 2 },
  { date: "2024-04-10", resolved: 10, pending: 6, overdue: 3 },
  { date: "2024-04-11", resolved: 13, pending: 4, overdue: 1 },
  { date: "2024-04-12", resolved: 8, pending: 3, overdue: 1 },
  { date: "2024-04-13", resolved: 2, pending: 4, overdue: 2 },
  { date: "2024-04-14", resolved: 1, pending: 5, overdue: 3 },
  { date: "2024-04-15", resolved: 17, pending: 8, overdue: 4 },  // Major incident day
  { date: "2024-04-16", resolved: 13, pending: 6, overdue: 2 },
  { date: "2024-04-17", resolved: 12, pending: 4, overdue: 1 },
  { date: "2024-04-18", resolved: 14, pending: 5, overdue: 2 },
  { date: "2024-04-19", resolved: 10, pending: 3, overdue: 0 },
  { date: "2024-04-20", resolved: 4, pending: 4, overdue: 1 },
  { date: "2024-04-21", resolved: 2, pending: 5, overdue: 2 },
  { date: "2024-04-22", resolved: 13, pending: 7, overdue: 3 },
  { date: "2024-04-23", resolved: 12, pending: 5, overdue: 2 },
  { date: "2024-04-24", resolved: 11, pending: 4, overdue: 1 },
  { date: "2024-04-25", resolved: 9, pending: 6, overdue: 2 },   // Team training day - fewer resolved
  { date: "2024-04-26", resolved: 10, pending: 4, overdue: 1 },
  { date: "2024-04-27", resolved: 3, pending: 5, overdue: 2 },
  { date: "2024-04-28", resolved: 2, pending: 6, overdue: 3 },
  { date: "2024-04-29", resolved: 14, pending: 7, overdue: 2 },
  { date: "2024-04-30", resolved: 12, pending: 5, overdue: 1 },
  
  // May 2024
  { date: "2024-05-01", resolved: 8, pending: 3, overdue: 0 },   // May Day - reduced staffing
  { date: "2024-05-02", resolved: 13, pending: 6, overdue: 2 },
  { date: "2024-05-03", resolved: 11, pending: 4, overdue: 1 },
  { date: "2024-05-04", resolved: 3, pending: 5, overdue: 2 },
  { date: "2024-05-05", resolved: 2, pending: 6, overdue: 3 },
  { date: "2024-05-06", resolved: 15, pending: 8, overdue: 4 },
  { date: "2024-05-07", resolved: 14, pending: 5, overdue: 2 },
  { date: "2024-05-08", resolved: 12, pending: 6, overdue: 3 },
  { date: "2024-05-09", resolved: 13, pending: 4, overdue: 1 },
  { date: "2024-05-10", resolved: 9, pending: 3, overdue: 1 },
  { date: "2024-05-11", resolved: 2, pending: 5, overdue: 2 },
  { date: "2024-05-12", resolved: 1, pending: 6, overdue: 3 },
  { date: "2024-05-13", resolved: 16, pending: 9, overdue: 5 },  // System outage - spike in tickets
  { date: "2024-05-14", resolved: 19, pending: 10, overdue: 6 }, // Continuing resolution of outage issues
  { date: "2024-05-15", resolved: 14, pending: 7, overdue: 3 },
  { date: "2024-05-16", resolved: 12, pending: 5, overdue: 2 },
  { date: "2024-05-17", resolved: 10, pending: 4, overdue: 1 },
  { date: "2024-05-18", resolved: 3, pending: 5, overdue: 2 },
  { date: "2024-05-19", resolved: 2, pending: 6, overdue: 2 },
  { date: "2024-05-20", resolved: 13, pending: 7, overdue: 3 },
  { date: "2024-05-21", resolved: 12, pending: 5, overdue: 2 },
  { date: "2024-05-22", resolved: 11, pending: 4, overdue: 1 },
  { date: "2024-05-23", resolved: 10, pending: 3, overdue: 0 },
  { date: "2024-05-24", resolved: 7, pending: 4, overdue: 1 },   // Friday before long weekend
  { date: "2024-05-25", resolved: 1, pending: 5, overdue: 2 },
  { date: "2024-05-26", resolved: 1, pending: 6, overdue: 3 },
  { date: "2024-05-27", resolved: 2, pending: 8, overdue: 4 },   // Memorial Day (US) - skeleton staff
  { date: "2024-05-28", resolved: 16, pending: 9, overdue: 5 },  // Back from holiday - catching up
  { date: "2024-05-29", resolved: 12, pending: 6, overdue: 3 },
  { date: "2024-05-30", resolved: 11, pending: 5, overdue: 2 },
  { date: "2024-05-31", resolved: 9, pending: 4, overdue: 1 },
  
  // June 2024
  { date: "2024-06-01", resolved: 3, pending: 5, overdue: 2 },
  { date: "2024-06-02", resolved: 2, pending: 6, overdue: 3 },
  { date: "2024-06-03", resolved: 14, pending: 8, overdue: 4 },
  { date: "2024-06-04", resolved: 13, pending: 6, overdue: 2 },
  { date: "2024-06-05", resolved: 12, pending: 5, overdue: 2 },
  { date: "2024-06-06", resolved: 11, pending: 4, overdue: 1 },
  { date: "2024-06-07", resolved: 8, pending: 3, overdue: 1 },
  { date: "2024-06-08", resolved: 2, pending: 4, overdue: 2 },
  { date: "2024-06-09", resolved: 1, pending: 5, overdue: 3 },
  { date: "2024-06-10", resolved: 15, pending: 7, overdue: 3 },
  { date: "2024-06-11", resolved: 13, pending: 6, overdue: 2 },
  { date: "2024-06-12", resolved: 10, pending: 7, overdue: 4 },  // New release - some issues
  { date: "2024-06-13", resolved: 12, pending: 6, overdue: 3 },
  { date: "2024-06-14", resolved: 9, pending: 4, overdue: 1 },
  { date: "2024-06-15", resolved: 3, pending: 5, overdue: 2 },
  { date: "2024-06-16", resolved: 2, pending: 6, overdue: 3 },
  { date: "2024-06-17", resolved: 7, pending: 9, overdue: 5 },   // Team offsite - reduced capacity
  { date: "2024-06-18", resolved: 8, pending: 10, overdue: 6 },  // Still at offsite
  { date: "2024-06-19", resolved: 12, pending: 8, overdue: 4 },
  { date: "2024-06-20", resolved: 11, pending: 6, overdue: 2 },
  { date: "2024-06-21", resolved: 9, pending: 5, overdue: 1 },
  { date: "2024-06-22", resolved: 2, pending: 6, overdue: 2 },
  { date: "2024-06-23", resolved: 1, pending: 7, overdue: 3 },
  { date: "2024-06-24", resolved: 13, pending: 8, overdue: 4 },
  { date: "2024-06-25", resolved: 12, pending: 6, overdue: 2 },
  { date: "2024-06-26", resolved: 11, pending: 5, overdue: 1 },
  { date: "2024-06-27", resolved: 10, pending: 4, overdue: 1 },
  { date: "2024-06-28", resolved: 8, pending: 3, overdue: 0 },   // End of quarter - clearing backlog
  { date: "2024-06-29", resolved: 3, pending: 4, overdue: 1 },
  { date: "2024-06-30", resolved: 1, pending: 5, overdue: 2 },
]

const chartConfig = {
  visitors: {
    label: "Casos",
  },
  resolved: {
    label: "Resueltos",
    color: "var(--primary)",
  },
  pending: {
    label: "Pendientes",
    color: "var(--primary)",
  },
  overdue: {
    label: "Vencidos",
    color: "var(--primary)",
  },
} satisfies ChartConfig

export function ChartAreaInteractive() {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("90d")

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d")
    }
  }, [isMobile])

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-06-30")
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Casos totales</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Casos totales en los ultimos 3 meses
          </span>
          <span className="@[540px]/card:hidden">Ultimos 3 meses</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">Ultimos 3 meses</ToggleGroupItem>
            <ToggleGroupItem value="30d">Ultimos 30 dias</ToggleGroupItem>
            <ToggleGroupItem value="7d">Ultimos 7 dias</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={1.0}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              defaultIndex={isMobile ? -1 : 10}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="resolved"
              type="natural"
              fill="#AA8E73"
              stroke="var(--color-mobile)"
              stackId="a"
            />
            <Area
              dataKey="pending"
              type="natural"
              fill="#6F5E52"
              stroke="var(--color-desktop)"
              stackId="a"
            />
            <Area
              dataKey="overdue"
              type="natural"
              fill="#182A76"
              stroke="var(--color-desktop)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
