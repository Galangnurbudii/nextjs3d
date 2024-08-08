import { Item } from "@/app/(dashboard)/admin/item/columns";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editItem } from "@/actions/admin/itemAction";
import { toast } from "sonner";
import { Dispatch, SetStateAction } from "react";

const EditItemModal = ({
  item,
  setIsEditOpen,
}: {
  item: Item;
  setIsEditOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const queryClient = useQueryClient();

  const form = useForm<Item>({
    defaultValues: {
      name: item.name,
      code: item.code,
      description: item.description,
      price: item.price,
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

  return (
    <DialogContent className="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle>Edit Item</DialogTitle>
        <DialogDescription>
          Make changes to this item and click save when you're done
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await editItemMutation.mutateAsync(form.getValues());
          }}
        >
          <div className="space-y-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }: { field: any }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Item name ..." disabled {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
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
            <FormField
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
            <FormField
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
          </div>
          <Button className="mt-6 float-right" type="submit">
            Save changes
          </Button>
        </form>
      </Form>
    </DialogContent>
  );
};

export default EditItemModal;
