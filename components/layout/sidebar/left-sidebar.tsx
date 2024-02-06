"use client";

import NavContent from "../nav-content";

const LeftSidebar = () => {
  return (
    <section className="custom-scrollbar border-light-700_dark-400 sticky left-0 top-0 flex h-screen flex-col justify-between overflow-y-auto border-r p-4 pt-24 shadow-light-300 dark:shadow-none max-lg:px-4 max-sm:hidden lg:w-56">
      <NavContent isMobile={false} />
    </section>
  );
};

export default LeftSidebar;
