import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { getTopInteractedTags } from "@/lib/actions/tag.action";
import { getMongoUser } from "@/lib/utils";

import GlobalSearch from "../search/global-search";

import { MobileNav } from "./mobile-nav";
import Theme from "./theme";

const Navbar = async () => {
  const mongoUser = await getMongoUser();
  const tags = await getTopInteractedTags({});

  return (
    <nav className="flex-between border-primary fixed z-50 h-14 w-full gap-3 border-b bg-transparent p-4 shadow-zinc-300 dark:shadow-none lg:px-8">
      <MobileNav username={mongoUser?.username} tags={JSON.stringify(tags)} />
      <Link
        href="/"
        className="flex size-16 items-center gap-1 lg:w-72 xl:w-48"
      >
        <Image src="/svg/logo.svg" alt="DevFlow" width={24} height={24} />
        <p className="text-primary ml-1 font-geistSans text-lg font-semibold max-lg:hidden">
          DevOverflow
        </p>
      </Link>
      <GlobalSearch />
      <div className="flex w-32 justify-end gap-3 xl:w-48">
        <Theme />
        <SignedOut>
          <Link href="/sign-in">
            <Button className="w-full rounded-full bg-gradient-to-r from-teal-500 to-teal-600 text-sm text-white shadow-lg transition-all duration-1000 hover:cursor-pointer hover:shadow-teal-800 hover:drop-shadow-xl">
              Sign in
            </Button>
          </Link>
        </SignedOut>
        <SignedIn>
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "h-10 w-10",
              },
              variables: { colorPrimary: "#ff7000" },
            }}
          />
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navbar;
