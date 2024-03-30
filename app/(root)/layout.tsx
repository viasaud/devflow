import React from "react";

import Navbar from "@/components/layout/navbar/navbar";
import LeftSidebar from "@/components/layout/sidebar/left-sidebar";
import RightSidebar from "@/components/layout/sidebar/right-sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="bg-default relative">
      <Navbar />
      <div className="flex grow justify-center max-lg:flex-col max-lg:items-center">
        <LeftSidebar />
        <section className="min-h-screen pt-10 lg:pl-12 xl:pl-32 2xl:pr-12">
          <div className="w-full max-w-2xl pt-4 max-lg:max-w-full">{children}</div>
        </section>
        <RightSidebar />
      </div>
      {/* Toaster */}
    </main>
  );
};

export default Layout;
