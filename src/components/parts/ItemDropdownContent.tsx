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
import EditItemModal from "./EditItemModal";

const ItemDropdownContent = ({ item }: { item: Item }) => {
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);

  return (
    <>
      <Modal isOpen={isEditOpen} setIsOpen={setIsEditOpen}>
        <EditItemModal item={item} setIsEditOpen={setIsEditOpen} />
      </Modal>
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
