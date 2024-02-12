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
        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-14 max-md:pb-14 sm:px-14">
          <div className="border-default mx-auto w-full max-w-5xl pt-4 lg:border-x">
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
