import { convertDate } from "@/utils/convertDate";
import { ColumnDef } from "@tanstack/react-table";
import { LuKeyRound } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa";

export type User = {
  name: string;
  email: string;
  role: string;
  createdTime: string;
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role: string = row.getValue("role");

      if (role === "admin") {
        return (
          <div>
            <div className="bg-blue-100 text-center text-xs text-blue-900 rounded-full font-semibold  px-8 py-1 w-fit tracking-wide flex gap-2 items-center">
              <LuKeyRound />
              {"Admin"}
            </div>
          </div>
        );
      }
      return (
        <div>
          <div className="bg-green-100 text-center text-xs text-green-900 rounded-full font-semibold px-8 py-1 w-fit tracking-wide flex gap-2 items-center">
            <FaRegUser />
            {"User"}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "createdTime",
    header: "Created at",
    cell: ({ row }) => {
      const date: string = row.getValue("createdTime");
      const formattedDate = convertDate(date);
      return formattedDate;
    },
  },
];
