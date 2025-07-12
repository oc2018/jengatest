import Action from "@/components/Action";
import DeleteButton from "@/components/DeleteButton";
import type { CellContext, ColumnDef } from "@tanstack/react-table";

export const propertiesColumns: ColumnDef<Property>[] = [
  {
    header: "ID",
    cell: ({ row }) => <div className="text-14-medium">{row.index + 1}</div>,
  },
  {
    header: "Address",
    accessorKey: "address",
    cell: ({ row }) => (
      <div className="text-14-medium">{row.original.address}</div>
    ),
  },
  {
    header: "Rent",
    accessorKey: "rent",
    cell: ({ row }) => (
      <div className="text-14-medium">{row.original.rent}</div>
    ),
  },
  {
    header: "Deposit",
    accessorKey: "deposit",
    cell: ({ row }) => (
      <div className="text-14-medium">{row.original.deposit}</div>
    ),
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ row }) => (
      <div className="text-14-medium">{row.original.status}</div>
    ),
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
