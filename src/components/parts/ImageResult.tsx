const ImageResult = () => {
  return (
    <div className="flex flex-wrap">
      <div className="w-1/2 p-4">
        <img
          className="w-full rounded-lg"
          src={"/images/wardrobe3.jpg"}
          alt="cart_item"
        />
      </div>
      <div className="w-1/2 p-4">
        <img
          className="w-full rounded-lg"
          src={"/images/wardrobe4.jpg"}
          alt="cart_item"
        />
      </div>
      <div className="w-1/2 p-4">
        <img
          className="w-full rounded-lg"
          src={"/images/wardrobe2.jpg"}
          alt="cart_item"
        />
      </div>
    </div>
  );
};

export default ImageResult;
