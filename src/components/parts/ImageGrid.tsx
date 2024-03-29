import React from "react";

const ImageGrid = () => {
  return (
    <div className="p-2">
      <div className="grid grid-cols-5 grid-flow-col gap-2">
        <div className="col-span-1 space-y-2 flex flex-col justify-center">
          <img
            className="object-cover rounded-2xl"
            src="/images/wardrobe.jpg"
            alt="logo"
          />
          <img
            className="object-cover rounded-2xl"
            src="/images/wardrobe2.jpg"
            alt="logo"
          />
        </div>
        <div className="col-span-1 flex flex-col justify-center">
          <img
            className="object-cover rounded-2xl"
            src="/images/wardrobe5.jpg"
            alt="logo"
          />
        </div>
        <div className="col-span-2">
          <img
            className="object-cover rounded-2xl"
            src="/images/wardrobe3.jpg"
            alt="logo"
          />
        </div>
        <div className="col-span-1 space-y-2 flex flex-col justify-center">
          <img
            className="object-cover rounded-2xl"
            src="/images/wardrobe4.jpg"
            alt="logo"
          />
          <img
            className="object-cover rounded-2xl"
            src="/images/wardrobe6.jpg"
            alt="logo"
          />
        </div>

        <h1 className="col-span-1 absolute top-5">Lorem Ipsum</h1>
      </div>
    </div>
  );
};

export default ImageGrid;
