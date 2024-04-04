import React from "react";

import Navbar from "@/components/shared/layout/navbar/navbar";
import LeftSidebar from "@/components/shared/layout/sidebar/left-sidebar";
import RightSidebar from "@/components/shared/layout/sidebar/right-sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="bg-default relative">
      <Navbar />
      <div className="flex pt-14 lg:px-8 2xl:justify-between">
        <LeftSidebar />
        <section className="min-h-screen max-2xl:mx-auto">
          <div className="w-[95vw] pt-2 md:w-[42rem]">{children}</div>
        </section>
        <RightSidebar />
      </div>
      {/* Toaster */}
      {/* Toaster */}
    </main>
  );
};

export default Layout;
