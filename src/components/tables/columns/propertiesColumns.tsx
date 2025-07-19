import Action from "@/components/Action";
import DeleteButton from "@/components/DeleteButton";
import { formatCurrency } from "@/lib/utils";
import type { CellContext, ColumnDef } from "@tanstack/react-table";
import clsx from "clsx";

export const propertiesColumns: ColumnDef<Property>[] = [
  {
    header: "ID",
    cell: ({ row }) => <div className="text-14-medium">{row.index + 1}</div>,
  },
  {
    header: "House Number",
    accessorKey: "address",
    cell: ({ row }) => (
      <div className="text-14-medium">{row.original.address}</div>
    ),
  },
  {
    header: "Rent",
    accessorKey: "rent",
    cell: ({ row }) => (
      <div className="text-14-medium text-right pr-3">
        {formatCurrency(row.original.rent, "narrowSymbol", "decimal")}
      </div>
    ),
  },
  {
    header: "Deposit",
    accessorKey: "deposit",
    cell: ({ row }) => (
      <div className="text-14-medium text-right pr-3">
        {formatCurrency(row.original.deposit, "narrowSymbol", "decimal")}
      </div>
    ),
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <div
          className={clsx(
            {
              "text-green-600": status === "Available",
              "text-orange-400": status === "Occupied",
              "text-red-400": status === "Vacant",
            },
            "text-14-medium"
          )}
        >
          {row.original.status}
        </div>
      );
    },
  },
  {
    header: "Actions",
    cell: ({ row }: CellContext<Property, unknown>) => {
      const data = row.original;
      return (
        <div className="">
          <Action data={data} title="Property" />
          <DeleteButton data={data} />
        </div>
      );
    },
  },
];
