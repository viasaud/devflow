"use client";

import NavContent from "../nav-content";

const LeftSidebar = () => {
  return (
    <section className="border-default bg-default sticky left-0 top-16 h-screen border-r px-3 pt-4 shadow-zinc-300 dark:shadow-none max-sm:hidden lg:w-60">
      <NavContent isMobile={false} />
    </section>
  );
};

export default LeftSidebar;
