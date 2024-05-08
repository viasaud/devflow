import { auth } from "@clerk/nextjs/server";
import React from "react";

import Navbar from "@/components/shared/layout/navbar/navbar";
import LeftSidebar from "@/components/shared/layout/sidebar/left-sidebar";
import RightSidebar from "@/components/shared/layout/sidebar/right-sidebar";
import { getPopularTags } from "@/lib/actions/tag.action";
import { getUserById } from "@/lib/actions/user.action";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const { userId } = auth();
  const user = userId ? await getUserById({ clerkId: userId }) : undefined;
  const tags = await getPopularTags({});

  return (
    <main className="bg-primary relative h-full font-geistSans dark:bg-gradient-to-br dark:from-zinc-950 dark:from-20% dark:to-zinc-900">
      <Navbar user={user} tags={tags} />
      <div className="flex justify-center pt-14">
        <LeftSidebar user={user} tags={tags} />
        <section className="min-h-[90vh] max-2xl:mx-auto">
          <div className="w-[95vw] pt-2 md:w-[42rem]">{children}</div>
        </section>
        <RightSidebar />
      </div>
    </main>
  );
};

export default Layout;
