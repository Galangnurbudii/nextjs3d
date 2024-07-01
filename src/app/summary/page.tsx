import CartList from "@/components/parts/CartList";
import ImageResult from "@/components/parts/ImageResult";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Summary = () => {
  return (
    <div className="flex p-8">
      <div className="w-2/3 space-y-8 p-4">
        <h1 className="font-bold text-2xl">Ringkasan desain PAX anda</h1>
        <Tabs defaultValue="account" className="w-full">
          <TabsList>
            <TabsTrigger value="cart">Daftar Produk</TabsTrigger>
            <TabsTrigger value="resultImage">Gambar</TabsTrigger>
            <TabsTrigger value="partDetail">
              Gambaran Umum Perakitan
            </TabsTrigger>
          </TabsList>
          <TabsContent value="cart" className="pt-8">
            <CartList />
          </TabsContent>
          <TabsContent value="resultImage">
            <ImageResult />
          </TabsContent>
          <TabsContent value="partDetail">TBD</TabsContent>
        </Tabs>
      </div>
      <div className="w-1/3 p-4 space-y-8">
        <img
          className="w-full rounded-lg"
          src={"/images/wardrobe3.jpg"}
          alt="cart_item"
        />
        <div className="space-y-6">
          <div>
            <h1 className="font-bold text-xl">KOMPLEMENT</h1>
            <p className="font-normal">Lemari Pakaian, 225x33x212 cm</p>
            <p className="font-normal">Total Weight 229 kg</p>
          </div>
          <div className="font-semibold text-2xl flex justify-between">
            <h1>Total Price</h1>
            <h1>Rp. 18.000.000,00</h1>
          </div>
        </div>
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
