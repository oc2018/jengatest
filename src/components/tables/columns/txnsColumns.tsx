import { formatCurrency, formatDateISO } from "@/lib/utils";
import type { ColumnDef } from "@tanstack/react-table";

export const txnsColumns: ColumnDef<Txn>[] = [
  {
    header: "ID",
    cell: ({ row }) => <div className="text-14-medium">{row.index + 1}</div>,
  },
  {
    header: "Date",
    accessorKey: "createdAt",
    cell: ({ row }) => (
      <div className="text-14-medium">
        {formatDateISO(row.original.createdAt)}
      </div>
    ),
  },
  {
    header: "Transaction ID",
    accessorKey: "txnID",
    cell: ({ row }) => (
      <div className="text-14-medium text-center">{row.original.txnID}</div>
    ),
  },
  {
    header: "Account",
    accessorKey: "accountType",
    cell: ({ row }) => (
      <div className="text-14-medium">{row.original.accountType}</div>
    ),
  },
  {
    header: "House Number",
    accessorKey: "propertyAddress",
    cell: ({ row }) => (
      <div className="text-14-medium text-center">
        {row.original.propertyAddress}
      </div>
    ),
  },
  {
    header: "Amount",
    accessorKey: "amount",
    cell: ({ row }) => (
      <div className=" text-14-medium text-right pr-3">
        {formatCurrency(row.original.amount, "narrowSymbol", "decimal")}
      </div>
    ),
  },
  {
    header: "Paid By",
    accessorKey: "tenantName",
    cell: ({ row }) => (
      <div className="text-14-medium">{row.original.tenantName}</div>
    ),
  },
];
