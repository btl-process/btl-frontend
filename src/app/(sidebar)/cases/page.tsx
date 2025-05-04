import { Case } from "@/types/cases.type";
import { columns } from "./columns";
import { DataTable } from "./data-table";

const cases: Case[] = [
    {
        id: "1",
        involved: "John Doe",
        date: new Date("2025-04-20"),
        amount: 1000,
        status: "on-time",
        createdAt: new Date("2023-09-01"),
        updatedAt: new Date("2023-09-02"),
    },
    {
        id: "2",
        involved: "Alice Smith",
        date: new Date("2025-04-05"),
        amount: 2000,
        status: "expire",
        createdAt: new Date("2023-09-03"),
        updatedAt: new Date("2023-09-04"),
    },
    {
        id: "3",
        involved: "Birmeth Johnson",
        date: new Date("2025-04-10"),
        amount: 1500,
        status: "overdue",
        createdAt: new Date("2023-09-05"),
        updatedAt: new Date("2023-09-06"),
    }
]

export default function CasesPage() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4">
            <DataTable columns={columns} data={cases} />
        </div>
      </div>
    </div>
  );
}
