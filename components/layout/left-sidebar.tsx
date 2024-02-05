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
    <section className="bg-light-900_dark-200 custom-scrollbar sticky left-0 top-0 flex h-screen flex-col justify-between overflow-y-auto p-6 pt-36 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[266px]">
      <div className="flex flex-1 flex-col gap-4">
        {sidebarLinks.map((item) => {
          const isActive =
            (pathName.includes(item.route) && item.route.length > 1) ||
            pathName === item.route;

          return (
            <Link
              href={item.route}
              key={item.route}
              className={`${isActive ? "primary-gradient text-light-900" : "text-dark-300_light-900 hover:bg-light-700_dark-300"} flex items-center justify-start gap-4 rounded-lg bg-transparent px-6 py-3`}
            >
              <Image
                src={item.imgURL}
                width={20}
                height={20}
                alt={item.label}
                className={`${!isActive && "invert-colors"}`}
              />
              <p
                className={`${isActive ? "font-base-bold" : "font-base-medium"} max-lg:hidden`}
              >
                {item.label}
              </p>
            </Link>
          );
        })}
      </div>

      <SignedOut>
        <Link href="/sign-in">
          <Button className="btn-secondary no-focus min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
            <Image
              src="/icons/account.svg"
              alt="login"
              width={20}
              height={20}
              className="invert-colors lg:hidden"
            />
            <span className="font-base-medium p-2 text-primary-500 max-lg:hidden">
              Sign in
            </span>
          </Button>
        </Link>
      </SignedOut>
    </section>
  );
};

export default LeftSidebar;
