import Image from "next/image";
import React from "react";

const Navbar = () => {
  return (
    <div className="h-28 flex items-center justify-center bg-transparent">
      <Image src="/images/logo.png" width={80} height={80} alt="logo" />
    </div>
  );
};

export default Navbar;
