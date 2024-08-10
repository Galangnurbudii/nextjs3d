"use client";

import { calculateCartItem } from "@/actions/admin/itemAction";
import CartList from "@/components/parts/CartList";
import ImageResult from "@/components/parts/ImageResult";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatPrice } from "@/utils/formatPrice";
import { useQuery } from "@tanstack/react-query";

const Summary = () => {
  const dummyState = [
    { itemName: "BAK 08x820", quantity: 223 },
    { itemName: "BAK1 1x02", quantity: 50 },
  ];

  const cartSummary = useQuery({
    queryKey: ["carts"],
    queryFn: () => calculateCartItem(dummyState),
  });

  const calculateTotalPrice = () => {
    let totalPrice = 0;

    cartSummary.data?.forEach((item) => {
      totalPrice += item.totalPrice;
    });

    return totalPrice;
  };

  return (
    <div className="flex p-8">
      <div className="w-2/3 space-y-8 p-4">
        <h1 className="font-bold text-2xl">Ringkasan desain PAX anda</h1>
        <Tabs defaultValue="cart" className="w-full">
          <TabsList>
            <TabsTrigger value="cart">Daftar Produk</TabsTrigger>
            <TabsTrigger value="resultImage">Gambar</TabsTrigger>
          </TabsList>
          <TabsContent value="cart" className="pt-8">
            {cartSummary.isLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-[100px] w-full rounded-xl" />
                <Skeleton className="h-[100px] w-full rounded-xl" />
                <Skeleton className="h-[100px] w-full rounded-xl" />
              </div>
            ) : (
              cartSummary.data && <CartList cartSummary={cartSummary.data} />
            )}
          </TabsContent>
          <TabsContent value="resultImage">
            <ImageResult />
          </TabsContent>
        </Tabs>
      </div>
      <div className="w-1/3 p-4 space-y-8">
        <img
          className="w-full rounded-lg"
          src={"/images/wardrobe3.jpg"}
          alt="cart_item"
        />
        {cartSummary.isLoading ? (
          <Skeleton className="h-[30px] w-full rounded-xl" />
        ) : (
          <div className="space-y-6">
            <div className="font-semibold text-2xl flex justify-between">
              <h1>Total Price</h1>
              <h1>{formatPrice(calculateTotalPrice())}</h1>
            </div>
          </div>
        )}
        <Button
          variant="default"
          className="bg-neutral-700 rounded-lg p-5 w-full"
        >
          {"Save as PDF"}
        </Button>
      </div>
    </div>
  );
};

export default Summary;
