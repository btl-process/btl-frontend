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
  },
  {
    id: "4",
    involved: "Jane Doe",
    date: new Date("2025-04-15"),
    amount: 2500,
    status: "on-time",
    createdAt: new Date("2023-09-07"),
    updatedAt: new Date("2023-09-08"),
  },
  {
    id: "5",
    involved: "Bob Smith",
    date: new Date("2025-04-25"),
    amount: 3000,
    status: "expire",
    createdAt: new Date("2023-09-09"),
    updatedAt: new Date("2023-09-10"),
  },
  {
    id: "6",
    involved: "Charlie Brown",
    date: new Date("2025-04-30"),
    amount: 1200,
    status: "overdue",
    createdAt: new Date("2023-09-11"),
    updatedAt: new Date("2023-09-12"),
  },
  {
    id: "7",
    involved: "David Wilson",
    date: new Date("2025-05-01"),
    amount: 1800,
    status: "on-time",
    createdAt: new Date("2023-09-13"),
    updatedAt: new Date("2023-09-14"),
  },
  {
    id: "8",
    involved: "Eve Davis",
    date: new Date("2025-05-05"),
    amount: 2200,
    status: "expire",
    createdAt: new Date("2023-09-15"),
    updatedAt: new Date("2023-09-16"),
  },
  {
    id: "9",
    involved: "Frank Miller",
    date: new Date("2025-05-10"),
    amount: 1600,
    status: "overdue",
    createdAt: new Date("2023-09-17"),
    updatedAt: new Date("2023-09-18"),
  },
  {
    id: "10",
    involved: "Grace Lee",
    date: new Date("2025-05-15"),
    amount: 2800,
    status: "on-time",
    createdAt: new Date("2023-09-19"),
    updatedAt: new Date("2023-09-20"),
  },
  {
    id: "11",
    involved: "Henry Taylor",
    date: new Date("2025-05-20"),
    amount: 3500,
    status: "expire",
    createdAt: new Date("2023-09-21"),
    updatedAt: new Date("2023-09-22"),
  },
  {
    id: "12",
    involved: "Ivy Anderson",
    date: new Date("2025-05-25"),
    amount: 4000,
    status: "overdue",
    createdAt: new Date("2023-09-23"),
    updatedAt: new Date("2023-09-24"),
  },
];

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
