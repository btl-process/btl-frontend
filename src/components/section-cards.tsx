import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function SectionCards() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-3">
      <Card className="@container/card">
        <CardHeader>
          <div className="flex justify-between">
            <CardDescription>Casos resueltos</CardDescription>
            <CardTitle className="text-3xl font-semibold tabular-nums @[250px]/card:text-5xl">
              15
            </CardTitle>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Tendencia de subia en un 10% <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Casos resueltos en el último mes
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <div className="flex justify-between">
            <CardDescription>Casos pendientes</CardDescription>
            <CardTitle className="text-3xl font-semibold tabular-nums @[250px]/card:text-5xl">
              6
            </CardTitle>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Tendencia de bajada en un 20%{" "}
            <IconTrendingDown className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Casos pendientes en el último mes
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <div className="flex justify-between">
            <CardDescription>Casos vencidos</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-5xl">
              2
            </CardTitle>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Tendencia de subida en un 100% <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Casos vencidos del ultimo mes</div>
        </CardFooter>
      </Card>
    </div>
  );
}
