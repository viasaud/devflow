"use client";
import { RiHashtag } from "@remixicon/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import {
  DEFAULT_THEME_MENU_ICON_SIZE,
  sidebarLinks,
} from "@/constants/constants";

import { Button } from "../../ui/button";

const popularTags = [
  { _id: 1, name: "javascript", totalQuestions: 24 },
  { _id: 2, name: "react", totalQuestions: 21 },
  { _id: 3, name: "next", totalQuestions: 15 },
  { _id: 4, name: "vue", totalQuestions: 11 },
  { _id: 5, name: "redux", totalQuestions: 11 },
];

const Discover = () => {
  const pathName = usePathname();

  return (
    <section className="text-default">
      <h3 className="my-2 font-semibold">Discover</h3>
      {sidebarLinks.map((item) => {
        const isActive = pathName === item.route;
        return (
          <Link
            href={item.route}
            key={item.route}
            className={`${isActive ? "bg-select" : "hover:bg-hover"} flex items-center justify-start gap-2 rounded-md px-3.5 py-1.5`}
          >
            {isActive ? (
              <item.iconFilled size={DEFAULT_THEME_MENU_ICON_SIZE} />
            ) : (
              <item.icon size={DEFAULT_THEME_MENU_ICON_SIZE} />
            )}
            <p className="text-sm">{item.label}</p>
          </Link>
        );
      })}
    </section>
  );
};

const PopularTags = () => {
  return (
    <section>
      <h3 className="text-default mb-2 mt-4 font-semibold">Popular Tags</h3>
      {popularTags.map((tag) => (
        <Link
          href={`/tag/${tag.name}`}
          key={tag.name}
          className={`hover:bg-hover text-default flex items-center justify-start gap-2 rounded-md px-3.5 py-1.5`}
        >
          <RiHashtag />
          <p className="text-sm">{tag.name}</p>
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

const NavContent = () => {
  return (
    <div className={`flex flex-1 flex-col`}>
      <Discover />
      <PopularTags />
      <Link href="/questions/ask" className="mt-8 rounded-3xl">
        <Button variant={"zinc"} className="max-h-8 w-full">
          Ask a Question
        </Button>
      </Link>
    </div>
  );
};

export default NavContent;
