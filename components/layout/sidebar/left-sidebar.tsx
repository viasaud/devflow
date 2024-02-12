"use client";

import NavContent from "../nav-content";

const LeftSidebar = () => {
  return (
    <section className="bg-default sticky left-0 top-16 h-full px-3 shadow-zinc-300 dark:shadow-none max-lg:hidden max-sm:hidden lg:w-60">
      <NavContent isMobile={false} />
    </section>
  );
};

export default LeftSidebar;
