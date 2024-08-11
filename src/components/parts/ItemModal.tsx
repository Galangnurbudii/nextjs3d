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
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addItem, editItem } from "@/actions/admin/itemAction";
import { toast } from "sonner";
import { Dispatch, SetStateAction } from "react";
import { convertBase64 } from "@/utils/convertBase64";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const ItemFormSchema = z.object({
  name: z.string().min(1, "Item name is required"),
  code: z.string().min(1, "Item code is required"),
  description: z.string().min(1, "Item description is required"),
  price: z.number({ invalid_type_error: "Item price is required" }).min(0),
  image: z
    .instanceof(FileList)
    .optional()
    .refine((file) => {
      console.log(file);

      if (file && file?.length !== 0) file[0].type.startsWith("image/");
      return true;
    }, "Only images are allowed"),
});

type FormFields = z.infer<typeof ItemFormSchema>;

const ItemModal = ({
  item,
  setIsEditOpen,
}: {
  item?: Item;
  setIsEditOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const queryClient = useQueryClient();

  const form = useForm<FormFields>({
    defaultValues: {
      name: item?.name,
      code: item?.code,
      description: item?.description,
      price: item?.price,
    },
    resolver: zodResolver(ItemFormSchema),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const submittedData = {
        name: data.name,
        code: data.code,
        description: data.description,
        price: data.price,
        image:
          data.image && data.image.length !== 0
            ? await convertBase64(data.image[0])
            : undefined,
      };

      item
        ? await editItemMutation.mutateAsync(submittedData)
        : await addItemMutation.mutateAsync(submittedData);
    } catch (error: any) {
      console.log(error.message);

      toast.error("Internal server error");
    }
  };

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
        reset();
        queryClient.invalidateQueries({ queryKey: ["items"] });
      } else {
        toast.error(data.error);
      }
    },
  });

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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-3">
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Item name ..."
                  type="text"
                  disabled={item ? true : false}
                  {...register("name")}
                />
              </FormControl>
              {errors.name && (
                <div className="text-red-500 text-left text-xs">
                  {errors.name.message}
                </div>
              )}
            </FormItem>
            <FormItem>
              <FormLabel>Code</FormLabel>
              <FormControl>
                <Input
                  placeholder="Item code ..."
                  type="text"
                  {...register("code")}
                />
              </FormControl>
              {errors.code && (
                <div className="text-red-500 text-left text-xs">
                  {errors.code.message}
                </div>
              )}
            </FormItem>
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Item price"
                  {...register("price", { valueAsNumber: true })}
                />
              </FormControl>
              {errors.price && (
                <div className="text-red-500 text-left text-xs">
                  {errors.price.message}
                </div>
              )}
            </FormItem>
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Item description"
                  {...register("description")}
                />
              </FormControl>
              {errors.description && (
                <div className="text-red-500 text-left text-xs">
                  {errors.description.message}
                </div>
              )}
            </FormItem>
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input
                  // onChange={(event) => {
                  //   if (event.target.files) {
                  //     onChange(event.target.files[0]);
                  //   }
                  // }}
                  type="file"
                  {...register("image")}
                />
              </FormControl>
              {errors.image && (
                <div className="text-red-500 text-left text-xs">
                  {errors.image.message}
                </div>
              )}
            </FormItem>

            <Button className="w-full mt-6" type="submit">
              Save changes
            </Button>
          </div>
        </form>
      </Form>
    </DialogContent>
  );
};

export default ItemModal;
