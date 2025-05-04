"use client";

import { Column, ColumnDef } from "@tanstack/react-table";
import { Case } from "@/types/cases.type";
import { cn } from "@/lib/utils";
import { IconEdit, IconSend, IconTrash, IconArrowsUpDown, IconArrowUp, IconArrowDown } from "@tabler/icons-react";

const SortableHeader = ({ column, title, className }: { column: Column<Case, unknown>; title: string; className?: string }) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {title}
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="text-gray-500 hover:text-gray-700"
      >
        {column.getIsSorted() === "asc" ? (
          <IconArrowUp size={16} />
        ) : column.getIsSorted() === "desc" ? (
          <IconArrowDown size={16} />
        ) : (
          <IconArrowsUpDown size={16} />
        )}
      </button>
    </div>
  );
}

export const columns: ColumnDef<Case>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <SortableHeader column={column} title="# Caso" className="text-center" />
    ),
  },
  {
    accessorKey: "involved",
    header: ({ column }) => (
      <SortableHeader column={column} title="Involucrado" className="text-left" />
    ),
    cell: ({ row }) => {
      const involved = row.getValue("involved") as string;
      return <span className="font-semibold">{involved}</span>;
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <SortableHeader column={column} title="Fecha de notificación" className="text-center" />
    ),
    cell: ({ row }) => {
      const date = row.getValue("date") as Date;
      const formattedDate = new Intl.DateTimeFormat("es-ES", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(date);
      const daySinceReport = Math.floor(
        (new Date().getTime() - new Date(date).getTime()) / (1000 * 3600 * 24)
      );

      return (
        <div className="flex flex-col gap-1">
          <span>{formattedDate}</span>
          <span className="text-xs text-gray-500">
            {
              daySinceReport === 0
                ? "Hoy"
                : daySinceReport === 1
                ? "Ayer"
                : `Hace ${daySinceReport} días`
            }
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <SortableHeader column={column} title="Cuantía(s)" className="text-center" />
    ),
    cell: ({ row }) => {
      const amount = row.getValue("amount") as number;
      const formattedAmount = new Intl.NumberFormat("es-ES", {
        style: "currency",
        currency: "COP",
      }).format(amount);

      return <span>$ {formattedAmount}</span>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <SortableHeader column={column} title="Estado" className="text-center" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <span
          className={cn(
            "px-2 py-1 rounded-full text-xs font-medium",
            status === "on-time"
              ? "bg-green-100 text-green-800 hover:bg-green-200 transition-all"
              : status === "expire"
              ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 transition-all"
              : status === "overdue"
              ? "bg-red-100 text-red-800 hover:bg-red-200 transition-all"
              : ""
          )}
        >
          {status === "on-time"
            ? "A tiempo"
            : status === "expire"
            ? "Proximo a vencer"
            : status === "overdue"
            ? "Vencido"
            : ""}
        </span>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const isOverdue = status === "overdue";

      return (
        <div className="flex items-center gap-2">
          {isOverdue && (
            <button className="relative group text-yellow-500 hover:text-yellow-700 hover:cursor-pointer">
              <IconSend />
              <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2">
                Notificar
              </span>
            </button>
          )}
          <button className="relative group text-blue-500 hover:text-blue-700 hover:cursor-pointer">
            <IconEdit />
            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2">
              Editar
            </span>
          </button>
          <button className="relative group text-red-500 hover:text-red-700 hover:cursor-pointer">    
            <IconTrash />
            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2">
              Eliminar
            </span>
          </button>
        </div>
      );
    },
  },
];
