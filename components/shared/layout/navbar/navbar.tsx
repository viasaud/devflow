import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { getTopInteractedTags } from "@/lib/actions/tag.action";
import { getMongoUser } from "@/lib/utils";

import GlobalSearch from "../search/global-search";

import MobileNav from "./mobile-nav";
import Theme from "./theme";

const Navbar = async () => {
  const mongoUser = await getMongoUser();
  const tags = await getTopInteractedTags({});
  return (
    <nav className="flex-between border-primary bg-primary fixed z-50 h-14 w-full gap-3 border-b p-4 shadow-zinc-300 dark:shadow-none lg:px-8">
      <MobileNav username={mongoUser?.username} tags={JSON.stringify(tags)} />
      <Link
        href="/"
        className="flex size-16 items-center gap-1 lg:w-72 xl:w-48"
      >
        <Image src="/svg/logo.svg" alt="DevFlow" width={34} height={34} />
        <p className="text-primary ml-1 font-geistMono text-2xl font-bold max-lg:hidden">
          Dev<span className="text-orange-500">Overflow</span>
        </p>
      </Link>
      <GlobalSearch />
      <div className="flex w-32 justify-end gap-3 xl:w-48">
        <Theme />
        <SignedOut>
          <Link href="/sign-in">
            <Button variant={"sign_in"}>Sign in</Button>
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
