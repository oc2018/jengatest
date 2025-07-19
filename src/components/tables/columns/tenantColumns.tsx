import Action from "@/components/Action";
import DeleteButton from "@/components/DeleteButton";
import type { ColumnDef } from "@tanstack/react-table";
import type { CellContext } from "@tanstack/react-table";

export const tenantColumns: ColumnDef<Tenant>[] = [
  {
    header: "ID",
    cell: ({ row }) => <div className="text-14-medium">{row.index + 1}</div>,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="text-14-medium">{row.original.name}</div>
    ),
  },
  {
    header: "ID Number",
    accessorKey: "idNumber",
    cell: ({ row }) => (
      <div className="text-14-medium">{row.original.idNumber}</div>
    ),
  },
  {
    accessorKey: "propertyAddress",
    header: "Property",
    cell: ({ row }) => (
      <div className="text-14-medium">{row.original.propertyAddress}</div>
    ),
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
    cell: ({ row }) => (
      <div className="text-14-medium">{row.original.phoneNumber}</div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <div className="text-14-medium">{row.original.email}</div>
    ),
  },
  {
    header: "Actions",
    cell: ({ row }: CellContext<Tenant, unknown>) => {
      const data = row.original;

      return (
        <div className="">
          <Action data={data} title="Tenant" />
          <DeleteButton data={data} />
        </div>
      );
    },
  },
];
