import Dropdown from "@/components/parts/Dropdown";
import ItemDropdownContent from "@/components/parts/ItemDropdownContent";
import { formatPrice } from "@/utils/formatPrice";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

export type Item = {
  name: string;
  code: string;
  description: string;
  price: number;
  image: string;
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
    cell: ({ row }) => {
      const price: number = row.getValue("price");
      const formattedPrice = formatPrice(price);

      return formattedPrice;
    },
  },
  {
    id: "image",
    header: "Image",
    cell: ({ row }) => {
      const itemImage = row.original.image;

      return <Image src={itemImage} width={100} height={100} alt={"item"} />;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const data = row.original;

      return (
        <Dropdown>
          <ItemDropdownContent item={data} />
        </Dropdown>
      );
    },
  },
];
