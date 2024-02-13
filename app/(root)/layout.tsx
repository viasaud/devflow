import React from "react";
import RightSidebar from "@/components/layout/sidebar/right-sidebar";
import LeftSidebar from "@/components/layout/sidebar/left-sidebar";
import Navbar from "@/components/layout/navbar/navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="bg-default relative">
      <Navbar />
      <div className="mx-auto flex w-[86rem] max-w-fit justify-center">
        <LeftSidebar />
        <section className="min-h-screen pt-14 sm:px-14">
          <div className="border-default max-w-[44rem] pt-4 lg:border-x">
            {children}
          </div>
        </section>
        <RightSidebar />
      </div>
      Toaster
    </main>
  );
};

export default Layout;
