import { SignedIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Theme from "./theme";
import MobileNav from "./mobile-nav";
import GlobalSearch from "../search/global-search";

const Navbar = () => {
  return (
    <nav className="flex-between bg-light-900_dark-200 fixed z-50 h-16 w-full gap-5 p-4 shadow-light-300 dark:shadow-none lg:px-8">
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
        <p className="font-h2-bold font-spaceGrotesk text-dark-100 dark:text-light-900 max-sm:hidden">
          Dev <span className="text-primary-500">Overflow</span>
        </p>
      </Link>
      <GlobalSearch />
      <div className="flex-between gap-5">
        <Theme />
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
        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
