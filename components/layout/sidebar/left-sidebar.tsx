"use client";

import { Button } from "@/components/ui/button";
import { SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import NavContent from "../nav-content";

const LeftSidebar = () => {
  return (
    <section className="bg-light-900_dark-200 custom-scrollbar border-light-700_dark-400 sticky left-0 top-0 flex h-screen flex-col justify-between overflow-y-auto border-r p-8 pt-24 shadow-light-300 dark:shadow-none max-lg:px-4 max-sm:hidden lg:w-72">
      <NavContent isMobile={false} />

      <SignedOut>
        <Link href="/sign-in">
          <Button variant={"sign_in"}>
            <Image
              src="/icons/account.svg"
              alt="login"
              width={20}
              height={20}
              className="invert-colors lg:hidden"
            />
            <span className="font-base-medium font-normal text-white max-lg:hidden">
              Sign in
            </span>
          </Button>
        </Link>
      </SignedOut>
    </section>
  );
};

export default LeftSidebar;
