import Navbar from "@/components/layout/navbar/navbar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="bg-light-850_dark-100 relative">
      <Navbar />
      <div className="flex">
        LeftSidebar
        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-36 max-md:pb-14 sm:px-14">
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </section>
        RightSidebar
      </div>
      Toaster
    </main>
  );
};

export default Layout;