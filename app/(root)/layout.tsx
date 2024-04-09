import React from "react";

import Navbar from "@/components/shared/layout/navbar/navbar";
import LeftSidebar from "@/components/shared/layout/sidebar/left-sidebar";
import RightSidebar from "@/components/shared/layout/sidebar/right-sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="bg-primary relative font-geistSans">
      <Navbar />
      <div className="flex justify-center pt-14">
        <LeftSidebar />
        <section className="min-h-[90vh] max-2xl:mx-auto">
          <div className="w-[95vw] pt-2 md:w-[42rem]">{children}</div>
        </section>
        <RightSidebar />
      </div>
      {/* Toaster */}
    </main>
  );
};

export default Layout;
