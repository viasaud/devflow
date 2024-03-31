import React from "react";

import Navbar from "@/components/layout/navbar/navbar";
import LeftSidebar from "@/components/layout/sidebar/left-sidebar";
import RightSidebar from "@/components/layout/sidebar/right-sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="bg-default relative">
      <Navbar />
      <div className="flex justify-center pt-14">
        <LeftSidebar />
        <section className="min-h-screen lg:pl-32 2xl:pr-12">
          <div className="w-full pt-2 lg:max-w-2xl">{children}</div>
        </section>
        <RightSidebar />
      </div>
      Toaster
    </main>
  );
};

export default Layout;
