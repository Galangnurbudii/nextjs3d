"use client";

import Image from "next/image";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { useQuery } from "@tanstack/react-query";
import { calculateCartItem } from "@/actions/admin/itemAction";
import { formatPrice } from "@/utils/formatPrice";
import { Skeleton } from "../ui/skeleton";

const CartList = () => {
  const dummyState = [
    { itemName: "BAK 08x820", quantity: 223 },
    { itemName: "BAK1 1x02", quantity: 5 },
  ];

  const cartSummary = useQuery({
    queryKey: ["carts"],
    queryFn: () => calculateCartItem(dummyState),
  });

  return (
    <div className="space-y-6">
      {cartSummary.isLoading ? (
        <>
          <Skeleton className="h-[100px] w-full] rounded-xl" />
          <Skeleton className="h-[100px] w-full] rounded-xl" />
          <Skeleton className="h-[100px] w-full] rounded-xl" />
        </>
      ) : (
        cartSummary.data &&
        cartSummary.data.map((item, index) => {
          return (
            <div key={index}>
              <div className="flex gap-10 mb-4">
                <div className="w-1/12">
                  <Image
                    width={200}
                    height={200}
                    src={item.image}
                    alt="cart_item"
                  />
                </div>

                <div className="space-y-1 flex-grow">
                  <h1 className="font-bold flex items-center gap-2">
                    {item.name} <Badge variant="outline">{item.code}</Badge>
                  </h1>
                  <p className="font-light">{item.description}</p>
                  <h1 className="font-semibold">
                    {formatPrice(item.pricePerItem)}
                  </h1>
                </div>
                <div className="w-1/6">
                  <h1 className="font-semibold">{item.quantity}x</h1>
                </div>
                <div className="w-1/6">
                  <h1 className="font-semibold">
                    {formatPrice(item.totalPrice)}
                  </h1>
                </div>
              </div>
              <Separator />
            </div>
          );
        })
      )}
    </div>
  );
};

export default CartList;
