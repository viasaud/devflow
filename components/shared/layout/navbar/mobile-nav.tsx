"use client";

import { RiMenuFill } from "@remixicon/react";
import Image from "next/image";
import Link from "next/link";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import NavContent from "../nav-content";

const MobileNav = ({ username, tags }: { username: string; tags: string }) => {
  return (
    <Sheet>
      <SheetTrigger className="w-11" asChild>
        <RiMenuFill className="text-primary lg:hidden" />
      </SheetTrigger>
      <SheetContent side="left" className="bg-primary border-none">
        <Link href="/" className="flex items-center gap-1">
          <Image src="/svg/logo.svg" alt="DevFlow" width={24} height={24} />
          <p className="text-primary font-geistMono text-2xl font-bold">
            Dev<span className="text-teal-500">Overflow</span>
          </p>
        </Link>
        <div className="flex h-full flex-col justify-end pb-12 pt-3.5">
          <SheetClose asChild>
            <NavContent username={username} tags={tags} />
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
