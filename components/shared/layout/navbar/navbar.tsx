import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { getPopularTags } from "@/lib/actions/tag.action";
import { getMongoUser } from "@/lib/utils";

import GlobalSearch from "../search/global-search";

import { MobileNav } from "./mobile-nav";
import Theme from "./theme";

const Navbar = async () => {
  const mongoUser = await getMongoUser();
  const tags = await getPopularTags({});

  return (
    <nav className="flex-between border-primary bg-primary fixed z-50 h-14 w-full gap-3 border-b p-4 shadow-zinc-300 dark:shadow-none lg:px-8">
      <MobileNav username={mongoUser?.username} tags={JSON.stringify(tags)} />
      <Link
        href="/"
        className="flex size-10 items-center gap-1 lg:w-72 xl:w-48"
      >
        <Image src="/svg/logo.svg" alt="DevFlow" width={24} height={24} />
        <p className="text-primary ml-1 font-geistSans text-lg font-semibold max-lg:hidden">
          DevOverflow
        </p>
      </Link>
      <GlobalSearch />
      <div className="flex items-center justify-end gap-3 xl:w-48">
        <Theme />
        <SignedOut>
          <Link href="/sign-in">
            <Button variant="default">Sign in</Button>
          </Link>
        </SignedOut>
        <div className="max-sm:hidden">
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
      </div>
    </nav>
  );
};

export default Navbar;
