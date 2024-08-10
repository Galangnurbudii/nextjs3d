"use client";

import { Item } from "@/app/(dashboard)/admin/item/columns";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addItem, editItem } from "@/actions/admin/itemAction";
import { toast } from "sonner";
import { Dispatch, SetStateAction, SyntheticEvent } from "react";
import { convertBase64 } from "@/utils/convertBase64";

const EditItemModal = ({
  item,
  setIsEditOpen,
}: {
  item?: Item;
  setIsEditOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const queryClient = useQueryClient();

  const form = useForm<{
    name: string;
    code: string;
    description: string;
    price: number;
    image: File | string;
  }>({
    defaultValues: {
      name: item?.name,
      code: item?.code,
      description: item?.description,
      price: item?.price,
      image: "",
    },
  });

  const editItemMutation = useMutation({
    mutationFn: editItem,
    onSuccess: (data) => {
      if (!data.error) {
        toast.success("Item has been edited");
        setIsEditOpen(false);
        queryClient.invalidateQueries({ queryKey: ["items"] });
      } else {
        toast.error(data.error);
      }
    },
  });

  const addItemMutation = useMutation({
    mutationFn: addItem,
    onSuccess: (data) => {
      if (!data.error) {
        toast.success("Item has been added");
        setIsEditOpen(false);
        form.reset();
        queryClient.invalidateQueries({ queryKey: ["items"] });
      } else {
        toast.error(data.error);
      }
    },
  });

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    const formData = form.getValues();
    let submittedData =
      typeof formData.image !== "string"
        ? {
            name: formData.name,
            code: formData.code,
            description: formData.description,
            price: formData.price,
            image: await convertBase64(formData.image),
          }
        : {
            name: formData.name,
            code: formData.code,
            description: formData.description,
            price: formData.price,
          };

    if (item) {
      await editItemMutation.mutateAsync(submittedData);
    } else {
      await addItemMutation.mutateAsync(submittedData);
    }
  }

  return (
    <DialogContent className="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle>{item ? "Edit Item" : "Add New Item"}</DialogTitle>
        <DialogDescription>
          {item
            ? "Make changes to this item and click save when you're done"
            : "Fill the item information below and click save when you're done"}
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={handleSubmit}>
          <div className="space-y-3">
            <Controller
              control={form.control}
              name="name"
              render={({ field }: { field: any }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Item name ..."
                      disabled={item ? true : false}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Controller
              control={form.control}
              name="code"
              render={({ field }: { field: any }) => (
                <FormItem>
                  <FormLabel>Code</FormLabel>
                  <FormControl>
                    <Input required placeholder="Item code ..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Controller
              control={form.control}
              name="price"
              render={({ field }: { field: any }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      required
                      type="number"
                      placeholder="Item price"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Controller
              control={form.control}
              name="description"
              render={({ field }: { field: any }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      required
                      placeholder="Item description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Controller
              control={form.control}
              name="image"
              render={({ field: { value, onChange, ...field } }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input
                      onChange={(event) => {
                        if (event.target.files) {
                          onChange(event.target.files[0]);
                        }
                      }}
                      type="file"
                      accept=".png"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full mt-6" type="submit">
              Save changes
            </Button>
          </div>
        </form>
      </Form>
    </DialogContent>
  );
};

export default EditItemModal;
