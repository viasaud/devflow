"use client";

import { RiHashtag } from "@remixicon/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { sidebarLinks } from "@/constants/constants";


import { Button } from "../ui/button";

const popularTags = [
  { _id: 1, name: "javascript", totalQuestions: 24 },
  { _id: 2, name: "react", totalQuestions: 21 },
  { _id: 3, name: "next", totalQuestions: 15 },
  { _id: 4, name: "vue", totalQuestions: 11 },
  { _id: 5, name: "redux", totalQuestions: 11 },
];

const Discover = ({ isMobile }: { isMobile: boolean }) => {
  const pathName = usePathname();

  return (
    <section>
      {sidebarLinks.map((item) => {
        const isActive =
          (pathName.includes(item.route) && item.route.length > 1) ||
          pathName === item.route;
        return (
          <React.Fragment key={item.route}>
            {item.label === "Home" && (
              <h3 className="text-default font-base-bold mb-2 ml-5 mt-4">
                Discover
              </h3>
            )}
            <Link
              href={item.route}
              key={item.route}
              className={`${isActive ? "bg-select text-default" : "hover:bg-hover text-default"}  flex items-center justify-start gap-2 rounded-md px-5 py-2`}
            >
              {isActive ? <item.iconFilled /> : <item.icon />}
              <p
                className={`${isMobile ? "font-paragraph-regular" : "font-body-regular"}`}
              >
                {item.label}
              </p>
            </Link>
          </React.Fragment>
        );
      })}
    </section>
  );
};

const PopularTags = ({ isMobile }: { isMobile: boolean }) => {
  return (
    <section>
      <h3 className="text-default font-base-bold mb-2 ml-5 mt-4">
        Popular Tags
      </h3>
      {popularTags.map((tag) => (
        <Link
          href={`/tags/${tag._id}`}
          key={tag._id}
          className={`hover:bg-hover text-default flex items-center justify-start gap-2 rounded-md px-5 py-2`}
        >
          <RiHashtag />
          <p
            className={`${isMobile ? "font-paragraph-regular" : "font-body-regular"} capitalize`}
          >
            {tag.name}
          </p>
          <p className="font-small-medium ml-auto text-zinc-500 dark:text-zinc-400">
            {tag.totalQuestions}
          </p>
        </Link>
      ))}
      <Link
        href="/tags"
        className="text-default font-small-medium hover:bg-hover mt-1 w-fit rounded-3xl px-5 py-2"
      >
        See More
      </Link>
    </section>
  );
};

const NavContent = ({ isMobile }: { isMobile: boolean }) => {
  return (
    <div className={`flex flex-1 flex-col ${isMobile && "pt-16"}`}>
      <Discover isMobile />
      <PopularTags isMobile />
      <Link href="/ask-question" className="mt-8 rounded-3xl">
        <Button variant={"zinc"} className="w-full">
          Ask a Question
        </Button>
      </Link>
    </div>
  );
};

export default NavContent;
