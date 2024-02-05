"use client";

import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { sidebarLinks } from "@/constants/constants";
import { usePathname } from "next/navigation";

const NavContent = () => {
  const pathName = usePathname();

  return (
    <section className="flex flex-1 flex-col gap-3 pt-16">
      {sidebarLinks.map((item) => {
        const isActive =
          (pathName.includes(item.route) && item.route.length > 1) ||
          pathName === item.route;

        return (
          <SheetClose
            asChild
            key={item.route}
          >
            <Link
              href={item.route}
              className={`${isActive ? "bg-light-800_dark-400" : " hover:bg-light-800_dark-400"} text-dark-300_light-900 flex items-center justify-start gap-3 rounded-lg px-4 py-2`}
            >
              <Image
                src={item.imgURL}
                width={20}
                height={20}
                alt={item.label}
                className={`invert-colors`}
              />
              <p className="font-base-medium font-light">{item.label}</p>
            </Link>
          </SheetClose>
        );
      })}
    </section>
  );
};

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image
          src="/icons/hamburger.svg"
          width={36}
          height={36}
          alt="Menu"
          className="invert-colors sm:hidden"
        />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="bg-light-900_dark-200 border-none"
      >
        <Link
          href="/"
          className="flex items-center gap-1"
        >
          <Image
            src="/images/site-logo.svg"
            alt="DevFlow"
            width={23}
            height={23}
          />
          <p className="font-h2-bold text-dark-100_light-900 font-spaceGrotesk">
            Dev <span className="text-primary-500">Overflow</span>
          </p>
        </Link>
        <div className="flex h-full flex-col justify-end pb-12">
          <SheetClose asChild>
            <NavContent />
          </SheetClose>

          <SignedOut>
            <SheetClose asChild>
              <Link href="/sign-in">
                <Button variant={"sign_in"}>
                  <span className="font-base-medium font-normal text-white">
                    Sign in
                  </span>
                </Button>
              </Link>
            </SheetClose>
          </SignedOut>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
