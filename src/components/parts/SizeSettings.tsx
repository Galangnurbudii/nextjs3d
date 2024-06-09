import React from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";

const SizeSettings = () => {
  const form = useForm();
  return (
    <div className="w-1/3 px-4">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Size Preferences</h1>
        <h6 className="font-light text-sm text-gray-400">
          Select your size preferences
        </h6>
      </div>
      <Form {...form}>
        <form className="space-y-8">
          <FormField
            control={form.control}
            name="door_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Door Type</FormLabel>
                <FormControl>
                  <Input placeholder="Door Type" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="width"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lebar</FormLabel>
                <FormControl>
                  <Slider defaultValue={[33]} max={100} step={1} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="depth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kedalaman (cm)</FormLabel>
                <FormControl>
                  <Input placeholder="Kedalaman (cm)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="height"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tinggi (cm)</FormLabel>
                <FormControl>
                  <Input placeholder="Ketinggian (cm)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" variant="default">
            {"Search Wardrobe Inspiration ->"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SizeSettings;
