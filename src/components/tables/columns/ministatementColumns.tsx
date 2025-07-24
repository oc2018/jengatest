import { formatCurrency, formatDateISO } from "@/lib/utils";
import type { ColumnDef } from "@tanstack/react-table";
import clsx from "clsx";

export const ministatementColumns: ColumnDef<StatementTransaction>[] = [
  {
    header: "ID",
    cell: ({ row }) => <div className="text-12-medium">{row.index + 1}</div>,
  },
  {
    header: "Date",
    accessorKey: "date",
    cell: ({ row }) => (
      <div className="text-12-medium">{formatDateISO(row.original.date)}</div>
    ),
  },
  {
    header: "description",
    accessorKey: "description",
    cell: ({ row }) => (
      <div className="text-12-medium">{row.original.description}</div>
    ),
  },
  {
    header: "Chq No",
    accessorKey: "chequeNo",
    cell: ({ row }) => (
      <div className="text-12-medium">
        {row.original.chequeNo ? row.original.chequeNo : "-"}
      </div>
    ),
  },
  {
    header: "amount",
    accessorKey: "amount",
    cell: ({ row }) => (
      <div
        className={clsx("text-12-medium text-right pr-3", {
          "text-red": row.original.type === "Debit",
          "text-green": row.original.type !== "Debit",
        })}
      >
        {formatCurrency(Number(row.original.amount), "narrowSymbol", "decimal")}
      </div>
    ),
  },
];
