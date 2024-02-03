import { SignedIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="flex-between bg-light-900_dark-200 shadow-light-300 fixed z-50 w-full gap-5 p-6 dark:shadow-none sm:px-12">
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="/assets/images/site-logo.svg"
          alt="DevFlow"
          width={23}
          height={23}
        />
        <p className="font-h2-bold font-spaceGrotesk text-dark-100 dark:text-light-900 max-sm:hidden">
          Dev <span className="text-primary-500">Overflow</span>
        </p>
      </Link>
      GlobalSearch
      <div className="flex-between gap-5">
        Theme
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
        Mob
      </div>
    </nav>
  );
};

export default Navbar;
