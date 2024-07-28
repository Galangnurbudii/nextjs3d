"use client";

import { getAllUsers } from "@/actions/admin/userAction";
import { useQuery } from "@tanstack/react-query";
import { UserRoundCog } from "lucide-react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Skeleton } from "@/components/ui/skeleton";

const UserAdmin = () => {
  const users = useQuery({
    queryKey: ["users"],
    queryFn: () => getAllUsers(),
  });

  return (
    <div className="p-8 rounded-2xl bg-white border">
      <div className="flex gap-3 text-xl font-semibold mb-5">
        <UserRoundCog />
        <h1>{"Users"}</h1>
      </div>
      <div>
        {users.isLoading ? (
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
          <DataTable columns={columns} data={users.data ? users.data : []} />
        )}
      </div>
    </div>
  );
};

export default UserAdmin;
