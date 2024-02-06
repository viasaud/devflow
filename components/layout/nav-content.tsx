import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { sidebarLinks } from "@/constants/constants";

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
            className={`${isActive ? "bg-light-800_dark-300" : " hover:bg-light-800_dark-300"} text-dark-300_light-900 flex items-center justify-start gap-2 rounded-lg px-4 py-2`}
          >
            <item.icon size={20} />
            <p
              className={`${isMobile ? "font-paragraph-medium font-light" : "font-body-regular max-lg:hidden"} `}
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
