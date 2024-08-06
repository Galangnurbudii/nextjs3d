import { ColumnDef } from "@tanstack/react-table";

export type Item = {
  name: string;
  code: string;
  description: string;
  price: number;
};

export const columns: ColumnDef<Item>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "code",
    header: "Code",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
];
