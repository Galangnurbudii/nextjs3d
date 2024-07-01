import Image from "next/image";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";

const dummyData = [
  {
    image: "/images/items/(Base) BAK 040X38X40.png",
    name: "KOMPLEMENT",
    id: "100.551.42",
    description: "Wardrobe frame, white, 75x68x87",
    pricePerItem: "2500000",
    quantity: 10,
    totalPrice: "17000000",
  },
  {
    image: "/images/items/(Base) BAK 040X38X104.png",
    name: "STURIDGE",
    id: "103.551.42",
    description: "Wardrobe frame, black, 75x68x87",
    pricePerItem: "1500000",
    quantity: 9,
    totalPrice: "1500000",
  },
  {
    image: "/images/items/(Base) BAK 090X38X40.png",
    name: "PAX",
    id: "101.551.42",
    description: "Wardrobe frame, white, 75x68x87",
    pricePerItem: "2500000",
    quantity: 10,
    totalPrice: "17000000",
  },
  {
    image: "/images/items/(Base) BBK 020X60X85.png",
    name: "ABCWARD",
    id: "100.552.42",
    description: "Kitchen frame, white, 75x68x87",
    pricePerItem: "2500000",
    quantity: 10,
    totalPrice: "17000000",
  },
];

const CartList = () => {
  return (
    <div className="space-y-6">
      {dummyData.map((item, index) => {
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
                  {item.name} <Badge variant="outline">{item.id}</Badge>
                </h1>
                <p className="font-light">{item.description}</p>
                <h1 className="font-semibold">Rp. {item.pricePerItem},00</h1>
              </div>
              <div className="w-1/6">
                <h1 className="font-semibold">{item.quantity}x</h1>
              </div>
              <div className="w-1/6">
                <h1 className="font-semibold">{item.totalPrice},00</h1>
              </div>
            </div>
            <Separator />
          </div>
        );
      })}
    </div>
  );
};

export default CartList;
