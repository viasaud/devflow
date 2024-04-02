"use client";

import { RiMenuFill } from "@remixicon/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import NavContent from "../../nav-content";

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger className="w-11" asChild>
        <RiMenuFill className="text-default lg:hidden" />
      </SheetTrigger>
      <SheetContent side="left" className="bg-default border-none">
        <Link href="/" className="flex items-center gap-1">
          <Image src="/svg/logo.svg" alt="DevFlow" width={34} height={34} />
          <p className="font-h2-bold text-default font-spaceGrotesk">
            Dev<span className="text-orange-500">Overflow</span>
          </p>
        </Link>
        <div className="flex h-full flex-col justify-end pb-12">
          <SheetClose asChild>
            <NavContent isMobile={true} />
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
