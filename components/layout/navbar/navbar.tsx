import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Theme from "./theme";
import MobileNav from "./mobile-nav";
import GlobalSearch from "../search/global-search";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="flex-between border-zinc bg-light-850_dark-100 fixed z-50 h-16 w-full gap-3 border-b p-4 shadow-light-300 dark:shadow-none lg:px-8">
      <MobileNav />
      <Link
        href="/"
        className="flex w-14 items-center gap-1 sm:w-10 lg:w-72"
      >
        <Image
          src="/images/site-logo.svg"
          alt="DevFlow"
          width={28}
          height={28}
        />
        <p className="font-h2-bold text-dark-100_light-900 ml-1 font-spaceGrotesk max-lg:hidden">
          Dev<span className="text-primary-500">Overflow</span>
        </p>
      </Link>
      <GlobalSearch />
      <div className="flex w-32 justify-end gap-3 xl:w-72">
        <Theme />
        <SignedOut>
          <Link href="/sign-in">
            <Button variant={"sign_in"}>
              <span className="font-body-regular text-white">Sign in</span>
            </Button>
          </Link>
        </SignedOut>
        <SignedIn>
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "h-10 w-10",
              },
              variables: { colorPrimary: "#ff7000" },
            }}
          />
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navbar;
