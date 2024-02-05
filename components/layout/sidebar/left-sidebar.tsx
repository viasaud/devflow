"use client";

import { Button } from "@/components/ui/button";
import { sidebarLinks } from "@/constants/constants";
import { SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LeftSidebar = () => {
  const pathName = usePathname();
  return (
    <section className="bg-light-900_dark-200 custom-scrollbar border-light-700_dark-400 sticky left-0 top-0 flex h-screen flex-col justify-between overflow-y-auto border-r p-8 pt-24 shadow-light-300 dark:shadow-none max-lg:px-4 max-sm:hidden lg:w-72">
      <div className="flex flex-1 flex-col gap-3">
        {sidebarLinks.map((item) => {
          const isActive =
            (pathName.includes(item.route) && item.route.length > 1) ||
            pathName === item.route;

          return (
            <Link
              href={item.route}
              key={item.route}
              className={`${isActive ? "bg-light-800_dark-400" : " hover:bg-light-800_dark-400"} text-dark-300_light-900 flex items-center justify-start gap-3 rounded-lg px-4 py-2`}
            >
              <Image
                src={item.imgURL}
                width={20}
                height={20}
                alt={item.label}
                className={`invert-colors`}
              />
              <p className="font-base-medium font-light max-lg:hidden">
                {item.label}
              </p>
            </Link>
          );
        })}
      </div>

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
