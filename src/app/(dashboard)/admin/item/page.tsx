"use client";

import { useQuery } from "@tanstack/react-query";
import { Bed, UserRoundCog } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { getAllItems } from "@/actions/admin/itemAction";
import { DataTable } from "./data-table";
import { columns } from "./columns";

const AdminItem = () => {
  const items = useQuery({
    queryKey: ["items"],
    queryFn: () => getAllItems(),
  });

  return (
    <div className="p-8 rounded-2xl bg-white border">
      <div className="flex gap-3 text-xl font-semibold mb-5">
        <Bed />
        <h1 className="font-normal">{"Items Management"}</h1>
      </div>
      <div>
        {items.isLoading ? (
          <div className="space-y-4">
            <div className="flex justify-between">
              <Skeleton className="h-10 w-[150px]" />
              <Skeleton className="h-10 w-[150px]" />
            </div>

            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        ) : (
          <DataTable columns={columns} data={items.data ? items.data : []} />
        )}
      </div>
    </div>
  );
};

export default AdminItem;
