"use client";

import { getCurrentSession } from "@/lib/auth";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FiLogOut } from "react-icons/fi";
import { logoutUser } from "@/actions/authActions";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRightLeft, Bed, LogOut, User } from "lucide-react";

const Navbar = () => {
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryFn: () => getCurrentSession(),
    queryKey: ["currentUser"],
  });
  const { mutateAsync: logoutMutation } = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });

  return (
    (!pathname.includes("/design-from-scratches") ||
      pathname == "/design-from-scratches/sizing") && (
      <div className="h-28 flex items-center justify-between bg-neutral-100 px-10">
        <Link href={"/"}>
          <Image src="/images/logo.png" width={80} height={80} alt="logo" />
        </Link>
        <div>
          {data ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex gap-3 items-center rounded-full pl-2 pr-4 py-2 bg-white cursor-pointer hover:bg-gray-200 transition-all">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <h1>{data.email}</h1>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                {data.role === "admin" && (
                  <>
                    <DropdownMenuLabel>Admin </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <Link href={"/admin/user"}>
                        <DropdownMenuItem>
                          <User className="mr-2 h-4 w-4" />
                          <span>Manage User</span>
                        </DropdownMenuItem>
                      </Link>
                      <Link href={"/admin/item"}>
                        <DropdownMenuItem>
                          <Bed className="mr-2 h-4 w-4" />
                          <span>Manage Item</span>
                        </DropdownMenuItem>
                      </Link>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                  </>
                )}

                <DropdownMenuItem onClick={() => logoutMutation()}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex gap-3 items-center">
              <Link href={"/login"}>
                <Button variant={"link"} className="rounded-lg">
                  Login
                </Button>
              </Link>
              <Link href={"/register"}>
                <Button
                  variant={"default"}
                  className="bg-neutral-600 rounded-lg px-8 py-6"
                >
                  Register
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default Navbar;
