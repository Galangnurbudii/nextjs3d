"use client";

import { getCurrentSession } from "@/lib/auth";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const Navbar = () => {
  const pathname = usePathname();
  const [user, setUser] = useState<{ id: string; email: string } | null>(null);

  async function getCurrentUser() {
    const getUser = await getCurrentSession();
    setUser(getUser);
  }

  useEffect(() => {
    getCurrentUser();
  }, [pathname]);

  return (
    (!pathname.includes("/design-from-scratches") ||
      pathname == "/design-from-scratches/sizing") && (
      <div className="h-28 flex items-center justify-between bg-neutral-100">
        <Image src="/images/logo.png" width={80} height={80} alt="logo" />
        <div>{user ? user.email : "login"}</div>
      </div>
    )
  );
};

export default Navbar;
