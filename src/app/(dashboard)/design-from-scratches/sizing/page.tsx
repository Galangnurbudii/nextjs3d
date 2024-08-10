"use client";

import { Input } from "@/components/ui/input";
import { TbArrowAutofitHeight, TbArrowAutofitWidth } from "react-icons/tb";
import { CgArrowsExpandLeft } from "react-icons/cg";
import { FaTimes } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import { SyntheticEvent } from "react";
import { Form } from "@/components/ui/form";
import { useRouter } from "next/navigation";

const RoomSizing = () => {
  const router = useRouter();
  const form = useForm<{
    length: number;
    width: number;
    height: number;
  }>({
    defaultValues: {
      length: 0,
      width: 0,
      height: 0,
    },
  });

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    const formData = form.getValues();
    router.push(
      `/design-from-scratches/menu?length=${formData.length}&width=${formData.width}&height=${formData.height}`
    );
  }

  return (
    <div className="text-center pb-10">
      <h1 className="text-3xl font-semibold mt-14 text-neutral-700">
        Size Preferences
      </h1>
      <h6 className="font-light text-sm text-gray-400 mt-2">
        Decide the size for your room
      </h6>
      <Form {...form}>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center items-center gap-10 text-neutral-500 pt-20 pb-10">
            <div className="bg-neutral-100 p-20 rounded-full relative space-y-4 w-64 h-64">
              <div className="flex flex-col items-center gap-1">
                <h1>Length</h1>
                <TbArrowAutofitWidth className="text-7xl" />
              </div>
              <Controller
                control={form.control}
                name="length"
                render={({ field }: { field: any }) => (
                  <Input
                    type="number"
                    className="w-64 absolute -left-1 text-center"
                    placeholder="Length (cm)"
                    required
                    {...field}
                  />
                )}
              />
            </div>
            <div>
              <FaTimes className="text-2xl" />
            </div>
            <div className="bg-neutral-100 p-20 rounded-full relative space-y-4 w-64 h-64">
              <div className="flex flex-col items-center gap-1">
                <h1>Width</h1>
                <CgArrowsExpandLeft className="text-7xl" />
              </div>
              <Controller
                control={form.control}
                name="width"
                render={({ field }: { field: any }) => (
                  <Input
                    type="number"
                    className="w-64 absolute -left-1 text-center"
                    placeholder="Width (cm)"
                    required
                    {...field}
                  />
                )}
              />
            </div>
            <div>
              <FaTimes className="text-2xl" />
            </div>
            <div className="bg-neutral-100 p-20 rounded-full relative space-y-4 w-64 h-64">
              <div className="flex flex-col items-center gap-1">
                <h1>Height</h1>
                <TbArrowAutofitHeight className="text-7xl" />
              </div>
              <Controller
                control={form.control}
                name="height"
                render={({ field }: { field: any }) => (
                  <Input
                    type="number"
                    className="w-64 absolute -left-1 text-center"
                    placeholder="Height (cm)"
                    required
                    {...field}
                  />
                )}
              />
            </div>
          </div>
          <div className="mt-4">
            <Button
              variant="default"
              className="w-80 bg-neutral-700"
              type="submit"
            >
              {"Start Designing ->"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default RoomSizing;
