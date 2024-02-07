"use client";

import NavContent from "../nav-content";

const LeftSidebar = () => {
  return (
    <section className="border-zinc bg-light-850_dark-100 sticky left-0 top-16 h-screen border-r px-3 pt-4 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-60">
      <NavContent isMobile={false} />
    </section>
  );
};

export default LeftSidebar;
