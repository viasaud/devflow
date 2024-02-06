import { sidebarLinks } from "@/constants/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavContent = ({ isMobile }: { isMobile: boolean }) => {
  const pathName = usePathname();
  return (
    <div className={`flex flex-1 flex-col gap-3 ${isMobile && "pt-16"}`}>
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
            <p
              className={`font-base-medium font-light ${!isMobile && "max-lg:hidden"}`}
            >
              {item.label}
            </p>
          </Link>
        );
      })}
    </div>
  );
};

export default NavContent;
