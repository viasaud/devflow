"use client";

import { RiHashtag } from "@remixicon/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  DEFAULT_THEME_MENU_ICON_SIZE,
  sidebarLinks,
} from "@/constants/constants";
import { Tag } from "@/types";

import { Button } from "../../ui/button";

const Discover = ({ username }: { username: string }) => {
  const pathname = usePathname();

  return (
    <section className="text-default">
      <h3 className="my-2 font-semibold">Discover</h3>
      {sidebarLinks.map((item) => {
        const isActive = pathname === item.route;
        return (
          <Link
            href={
              item.label === "Profile" ? `/profile/${username}` : item.route
            }
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

const PopularTags = ({ tags }: { tags: string }) => {
  return (
    <section>
      <h3 className="text-default mb-2 mt-4 font-semibold">Popular Tags</h3>
      {JSON.parse(tags).map((tag: Tag) => (
        <Link
          href={`/tags/${tag.name}`}
          key={tag.name}
          className={`hover:bg-hover text-default flex items-center justify-start gap-2 rounded-md px-3.5 py-1.5`}
        >
          <RiHashtag />
          <p className="text-sm">{tag.name}</p>
          <p className="font-small-medium ml-auto text-zinc-500 dark:text-zinc-400">
            {tag.questions.length}
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

const NavContent = ({ username, tags }: { username: string; tags: string }) => {
  return (
    <div className={`flex flex-1 flex-col`}>
      <Discover username={username} />
      <PopularTags tags={tags} />
      <Link href="/questions/ask" className="mt-8 rounded-3xl">
        <Button variant={"zinc"} className="max-h-8 w-full">
          Ask a Question
        </Button>
      </Link>
    </div>
  );
};

export default NavContent;
