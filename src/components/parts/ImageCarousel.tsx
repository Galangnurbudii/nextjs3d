import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

const ImageCarousel = () => {
  return (
    <div className="p-6">
      <Carousel>
        <CarouselContent>
          <CarouselItem className="pl-0 md:basis-1/2 sm:basis-auto">
            <div className="p-2">
              <img
                className="object-cover rounded-2xl"
                src="/images/wardrobe.jpg"
                alt="logo"
              />
            </div>
          </CarouselItem>
          <CarouselItem className="pl-0 md:basis-1/2 sm:basis-auto">
            <div className="p-2">
              <img
                className="object-cover rounded-2xl"
                src="/images/wardrobe2.jpg"
                alt="logo"
              />
            </div>
          </CarouselItem>
          <CarouselItem className="pl-0 md:basis-1/2 sm:basis-auto">
            <div className="p-2">
              <img
                className="object-cover rounded-2xl"
                src="/images/wardrobe6.jpg"
                alt="logo"
              />
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious className="left-8" />
        <CarouselNext className="right-8" />
      </Carousel>
    </div>
  );
};

export default ImageCarousel;
