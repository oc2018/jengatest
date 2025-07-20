import Action from "@/components/Action";
import DeleteButton from "@/components/DeleteButton";
import { formatCurrency, formatDateISO } from "@/lib/utils";
import type { CellContext, ColumnDef } from "@tanstack/react-table";

export const expensesColumns: ColumnDef<Expense>[] = [
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
    header: "Petty cash No",
    accessorKey: "pettyCashNo",
    cell: ({ row }) => (
      <div className="text-14-medium text-center">
        {row.original.pettyCashNo}
      </div>
    ),
  },

  {
    header: "Amount",
    accessorKey: "amount",
    cell: ({ row }) => (
      <div className="text-14-medium text-right pr-3">
        {formatCurrency(row.original.amount, "narrowSymbol", "decimal")}
      </div>
    ),
  },
  {
    header: "Description",
    accessorKey: "description",
    cell: ({ row }) => (
      <div className="text-14-medium">{row.original.description}</div>
    ),
  },
  {
    header: "Property",
    accessorKey: "propertyAddress",
    cell: ({ row }) => (
      <div className="text-14-medium">{row.original.propertyAddress}</div>
    ),
  },
  {
    header: "Actions",
    cell: ({ row }: CellContext<Expense, unknown>) => {
      const data = row.original;

      return (
        <div>
          <Action data={data} title="Expense" />
          <DeleteButton data={data} type="expense" />
        </div>
      );
    },
  },
];
