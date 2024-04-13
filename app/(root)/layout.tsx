import React from "react";

import Navbar from "@/components/shared/layout/navbar/navbar";
import LeftSidebar from "@/components/shared/layout/sidebar/left-sidebar";
import RightSidebar from "@/components/shared/layout/sidebar/right-sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="bg-primary relative h-full font-geistSans dark:bg-gradient-to-br dark:from-zinc-950 dark:from-20% dark:to-zinc-900">
      <Navbar />
      <div className="flex justify-center pt-14">
        <LeftSidebar />
        <section className="min-h-[90vh] max-2xl:mx-auto">
          <div className="w-[95vw] pt-2 md:w-[42rem]">{children}</div>
        </section>
        <RightSidebar />
      </div>
    </main>
  );
};

export default Layout;
