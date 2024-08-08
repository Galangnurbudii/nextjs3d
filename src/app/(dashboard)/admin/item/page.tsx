"use client";

import { useQuery } from "@tanstack/react-query";
import { Bed, PackagePlus, UserRoundCog } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { getAllItems } from "@/actions/admin/itemAction";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import Modal from "@/components/parts/Modal";
import { useState } from "react";
import EditItemModal from "@/components/parts/ItemModal";

const AdminItem = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const items = useQuery({
    queryKey: ["items"],
    queryFn: () => getAllItems(),
  });

  return (
    <>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <EditItemModal setIsEditOpen={setIsOpen} />
      </Modal>
      <div className="p-8 rounded-2xl bg-white border">
        <div className="flex justify-between">
          <div className="flex gap-3 text-xl font-semibold mb-5">
            <Bed />
            <h1 className="font-normal">{"Items Management"}</h1>
          </div>
          <Button
            variant={"outline"}
            className="flex gap-2 items-center"
            onClick={() => setIsOpen(true)}
          >
            <PackagePlus className="h-4 w-4" /> New Item
          </Button>
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
    </>
  );
};

export default AdminItem;
