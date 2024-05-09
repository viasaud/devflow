"use client";

import { RiHashtag } from "@remixicon/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { toast, useToast } from "@/components/ui/use-toast";
import { THEME_MENU_ICON_SIZE, sidebarLinks } from "@/constants/constants";
import { Tag } from "@/types";

import { Button } from "../../ui/button";

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
        return (
          <div
            key={item.route}
            className={`${pathname === item.route ? "bg-active" : "hover:bg-hover"} flex-start cursor-pointer gap-2 rounded-md px-3.5 py-1.5`}
            onClick={handleClick(item.route)}
          >
            {pathname === item.route ? (
              <item.iconFilled size={THEME_MENU_ICON_SIZE} />
            ) : (
              <item.icon size={THEME_MENU_ICON_SIZE} />
            )}
            <p className="text-sm">{item.label}</p>
          </div>
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
        <Link
          href={`/tags/${tag.name}`}
          key={tag.name}
          className={`${pathname === `/tags/${tag.name}` ? "bg-active" : "hover:bg-hover"} text-primary flex-start cursor-pointer gap-2 rounded-md px-3.5 py-1.5`}
        >
          <RiHashtag />
          <p className="text-sm">{tag.name}</p>
          <p className="ml-auto font-geistMono text-xs text-zinc-500 dark:text-zinc-400">
            {tag.questions.length}
          </p>
        </Link>
      ))}
      <Link
        href="/tags"
        className="text-primary hover:bg-hover mt-1 w-fit rounded-3xl px-5 py-2 text-xs"
      >
        More Tags
      </Link>
    </section>
  );
};

const SidebarContent = ({
  username,
  tags,
}: {
  username: string;
  tags: string;
}) => {
  return (
    <div className="flex flex-1 select-none flex-col">
      <Discover username={username} />
      <PopularTags tags={tags} />
      <Link
        href={username ? "/questions/ask" : ""}
        className="mt-8 rounded-3xl"
      >
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
      </Link>
    </div>
  );
};

export default SidebarContent;
