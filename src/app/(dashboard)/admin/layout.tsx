"use client";

import { Separator } from "@/components/ui/separator";
import clsx from "clsx";
import { Bed, Settings, UserRoundCog } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();

  return (
    <div className="flex p-10 gap-8">
      <div className="w-[300px] space-y-6 bg-white p-6 rounded-xl h-fit">
        <h1 className="tracking-wider text-gray-400 flex gap-3 items-center justify-center">
          <Settings />
          Admin Menu
        </h1>
        <Separator />
        <div className="space-y-4">
          <Link href={"/admin/user"}>
            <div
              className={clsx(
                "flex items-center gap-4 p-4 hover:bg-neutral-100 rounded-xl cursor-pointer mb-2 font-semibold  text-neutral-400",
                {
                  "bg-neutral-100 text-neutral-700": pathname === "/admin/user",
                }
              )}
            >
              <UserRoundCog />
              <h1>Users</h1>
            </div>
          </Link>
          <Link href={"/admin/item"}>
            <div
              className={clsx(
                "flex items-center gap-4 p-4 hover:bg-neutral-100 rounded-xl cursor-pointer font-semibold text-neutral-400",
                {
                  "bg-neutral-100 text-neutral-700": pathname === "/admin/item",
                }
              )}
            >
              <Bed />
              <h1>Items</h1>
            </div>
          </Link>
        </div>
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default AdminLayout;
