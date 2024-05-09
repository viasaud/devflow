import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ITag } from "@/database/tag.model";
import { IUser } from "@/database/user.model";

import Search from "../search/search";

import { MobileNav } from "./mobile-nav";
import Theme from "./theme";

const Navbar = async ({ user, tags }: { user: IUser; tags: ITag }) => {
  return (
    <nav className="flex-between border-primary bg-primary fixed z-50 h-14 w-full gap-2 border-b p-4 shadow-zinc-300 dark:shadow-none lg:px-8">
      <MobileNav username={user?.username} tags={JSON.stringify(tags)} />
      <Link
        href="/"
        className="flex size-10 items-center gap-1 lg:w-72 xl:w-48"
      >
        <Image src="/svg/logo.svg" alt="DevFlow" width={24} height={24} />
        <p className="text-primary ml-1 font-geistSans text-lg font-semibold max-lg:hidden">
          DevOverflow
        </p>
      </Link>
      <Search />
      <div className="flex items-center justify-end gap-2 xl:w-48">
        <Theme />
        <div className="max-md:hidden">
          <SignedOut>
            <Link href="/sign-in">
              <Button variant="default">Sign in</Button>
            </Link>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
