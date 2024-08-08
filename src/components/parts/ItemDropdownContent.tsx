"use client";

import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Pencil, PencilRuler, Trash2 } from "lucide-react";
import { Item } from "@/app/(dashboard)/admin/item/columns";
import { useState } from "react";
import Modal from "./Modal";
import EditItemModal from "./ItemModal";
import ConfirmationAlert from "./ConfirmationAlert";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteItem } from "@/actions/admin/itemAction";
import { toast } from "sonner";

const ItemDropdownContent = ({ item }: { item: Item }) => {
  const queryClient = useQueryClient();
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);

  const deleteItemMutation = useMutation({
    mutationFn: deleteItem,
    onSuccess: (data) => {
      if (!data.error) {
        toast.success("Item has been deleted");
        setIsEditOpen(false);
        queryClient.invalidateQueries({ queryKey: ["items"] });
      } else {
        toast.error(data.error);
      }
    },
    onError: () => {
      toast.success("Internal server error");
    },
  });

  return (
    <>
      <Modal isOpen={isEditOpen} setIsOpen={setIsEditOpen}>
        <EditItemModal item={item} setIsEditOpen={setIsEditOpen} />
      </Modal>
      <ConfirmationAlert
        title={"Are you sure want to delete this item ?"}
        description={
          "This action cannot be undone and your items will be removed permanently"
        }
        action={async () =>
          await deleteItemMutation.mutateAsync({ name: item.name })
        }
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        type="destructive"
      />
      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <div
              className="gap-2 flex items-center"
              onClick={() => setIsEditOpen(true)}
            >
              <Pencil className="h-4 w-4" />
              Edit item
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-red-600">
            <div
              className="gap-2 flex items-center"
              onClick={() => setIsDeleteOpen(true)}
            >
              <Trash2 className="h-4 w-4" />
              Delete item
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </>
  );
};

export default ItemDropdownContent;
