"use client";

import { RiHashtag, RiMenuFill } from "@remixicon/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { sidebarLinks, THEME_MENU_ICON_SIZE } from "@/constants/constants";
import { Tag } from "@/types";

const Discover = ({ username }: { username: string }) => {
  const pathname = usePathname();

  return (
    <section className="text-primary">
      <h3 className="my-2 font-bold">Discover</h3>
      {sidebarLinks.map((item) => {
        const isActive = pathname === item.route;
        return (
          <SheetClose asChild key={item.route}>
            <Link
              href={
                item.label === "Profile"
                  ? username
                    ? `/profile/${username}`
                    : "/sign-in"
                  : item.route
              }
              className={`${isActive ? "bg-active" : "hover:bg-hover"} flex-start gap-2 rounded-md px-3.5 py-1.5`}
            >
              {isActive ? (
                <item.iconFilled size={THEME_MENU_ICON_SIZE} />
              ) : (
                <item.icon size={THEME_MENU_ICON_SIZE} />
              )}
              <p className="text-sm">{item.label}</p>
            </Link>
          </SheetClose>
        );
      })}
    </section>
  );
};

const PopularTags = ({ tags }: { tags: string }) => {
  return (
    <section>
      <h3 className="text-primary mb-2 mt-4 font-bold">Popular Tags</h3>
      {JSON.parse(tags).map((tag: Tag) => (
        <SheetClose asChild key={tag.name}>
          <Link
            href={`/tags/${tag.name}`}
            className={`hover:bg-hover text-primary flex-start gap-2 rounded-md px-3.5 py-1.5`}
          >
            <RiHashtag />
            <p className="text-sm">{tag.name}</p>
            <p className="ml-auto font-geistMono text-xs text-zinc-500 dark:text-zinc-400">
              {tag.questions.length}
            </p>
          </Link>
        </SheetClose>
      ))}
      <SheetClose asChild>
        <Link
          href="/tags"
          className="text-primary hover:bg-hover mt-1 w-fit rounded-3xl px-5 py-2 text-xs"
        >
          See More
        </Link>
      </SheetClose>
    </section>
  );
};

const NavContent = ({ username, tags }: { username: string; tags: string }) => {
  return (
    <div className={`flex flex-1 flex-col`}>
      <Discover username={username} />
      <PopularTags tags={tags} />
      <Link href="/questions/ask" className="mt-8 rounded-3xl">
        <SheetClose asChild>
          <Button variant="default">Ask a Question</Button>
        </SheetClose>
      </Link>
    </div>
  );
};

const MobileNav = ({ username, tags }: { username: string; tags: string }) => {
  return (
    <Sheet>
      <SheetTrigger className="w-11" asChild>
        <RiMenuFill className="text-primary xl:hidden" />
      </SheetTrigger>
      <SheetContent side="left" className="bg-primary border-none">
        <Link href="/" className="flex items-center gap-1">
          <Image src="/svg/logo.svg" alt="DevFlow" width={24} height={24} />
          <p className="text-primary font-geistMono text-2xl font-bold">
            Dev<span className="text-teal-500">Overflow</span>
          </p>
        </Link>
        <div className="flex h-full flex-col pb-12 pt-3.5">
          <NavContent username={username} tags={tags} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export { MobileNav, NavContent };
