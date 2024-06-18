"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

const Navbar = () => {
  const pathname = usePathname();

  return (
    (!pathname.includes("/design-from-scratches") ||
      pathname == "/design-from-scratches/sizing") && (
      <div className="h-28 flex items-center justify-center bg-neutral-100">
        <Image src="/images/logo.png" width={80} height={80} alt="logo" />
      </div>
    )
  );
};

export default Navbar;
