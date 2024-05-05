"use client";

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { RiHashtag, RiMenuFill } from "@remixicon/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { toast, useToast } from "@/components/ui/use-toast";
import { sidebarLinks, THEME_MENU_ICON_SIZE } from "@/constants/constants";
import { Tag } from "@/types";

const Discover = ({ username }: { username: string }) => {
  const pathname = usePathname();
  const { toast } = useToast();
  const router = useRouter();

  const handleClick = (route: string) => () => {
    if ((route === "/profile" || route === "/bookmarks") && !username) {
      return toast({
        className:
          "text-primary border-primary border bg-yellow-500/50 dark:bg-yellow-600/40 border-yellow-600 backdrop-blur rounded-md",
        title: "Sign In Required",
        description: `Please sign in to your account in order to access ${route === "/profile" ? "your profile" : "your bookmarks"}.`,
      });
    }
    return router.push(route === "/profile" ? `/profile/${username}` : route);
  };
  return (
    <section className="text-primary">
      <h3 className="my-2 font-semibold">Discover</h3>
      {sidebarLinks.map((item) => {
        const isActive = pathname === item.route;
        return (
          <SheetClose asChild key={item.route}>
            <div
              className={`${isActive ? "bg-active" : "hover:bg-hover"} flex-start cursor-pointer gap-2 rounded-md px-3.5 py-1.5`}
              onClick={handleClick(item.route)}
            >
              {isActive ? (
                <item.iconFilled size={THEME_MENU_ICON_SIZE} />
              ) : (
                <item.icon size={THEME_MENU_ICON_SIZE} />
              )}
              <p className="text-sm">{item.label}</p>
            </div>
          </SheetClose>
        );
      })}
    </section>
  );
};

const PopularTags = ({ tags }: { tags: string }) => {
  const pathname = usePathname();
  return (
    <section>
      <h3 className="text-primary mb-2 mt-4 font-semibold">Popular Tags</h3>
      {JSON.parse(tags).map((tag: Tag) => (
        <SheetClose asChild key={tag.name}>
          <Link
            href={`/tags/${tag.name}`}
            className={`${pathname === `/tags/${tag.name}` ? "bg-active" : "hover:bg-hover"} text-primary flex-start cursor-pointer gap-2 rounded-md px-3.5 py-1.5`}
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
          More Tags
        </Link>
      </SheetClose>
    </section>
  );
};

const NavContent = ({ username, tags }: { username: string; tags: string }) => {
  return (
    <div className="flex flex-1 select-none flex-col">
      <Discover username={username} />
      <PopularTags tags={tags} />
      <Link
        href={username ? "/questions/ask" : ""}
        className="mt-8 rounded-3xl"
      >
        <SheetClose asChild>
          <Button
            variant="default"
            onClick={() => {
              if (!username)
                return toast({
                  className:
                    "text-primary border-primary border bg-yellow-500/50 dark:bg-yellow-600/40 border-yellow-600 backdrop-blur rounded-md",
                  title: "Sign In Required",
                  description:
                    "Please sign in to your account in order to ask a question.",
                });
            }}
          >
            Ask a Question
          </Button>
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
        <section className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-1">
            <Image src="/svg/logo.svg" alt="DevFlow" width={24} height={24} />
            <p className="text-primary ml-1 font-geistSans text-lg font-semibold max-lg:hidden">
              DevOverflow
            </p>
          </Link>
          <div className="flex items-center md:hidden">
            <SignedOut>
              <Link href="/sign-in">
                <Button variant="default">Sign in</Button>
              </Link>
            </SignedOut>
            <SignedIn>
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "h-8 w-8",
                  },
                  variables: { colorPrimary: "#ff7000" },
                }}
              />
            </SignedIn>
          </div>
        </section>
        <div className="flex h-full flex-col pb-12 pt-3.5">
          <NavContent username={username} tags={tags} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export { MobileNav, NavContent };
