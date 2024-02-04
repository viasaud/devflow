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
    <section className="flex h-full flex-col gap-4 pt-16">
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
              className={`${isActive ? "primary-gradient text-light-900" : "text-dark-300_light-900 hover:bg-light-700_dark-300"} flex items-center justify-start gap-4 rounded-lg bg-transparent p-4`}
            >
              <Image
                src={item.imgURL}
                width={20}
                height={20}
                alt={item.label}
                className={`${!isActive && "invert-colors"}`}
              />
              <p
                className={`${isActive ? "font-base-bold" : "font-base-medium"}`}
              >
                {item.label}
              </p>
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
                <Button className="btn-secondary no-focus min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                  <span className="primary-text-gradient font-base-medium">
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
