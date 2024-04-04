import NavContent from "../../shared/nav-content";

const LeftSidebar = () => {
  return (
    <section className=" bg-default sticky left-0 top-16 h-full w-60 shadow-zinc-300 dark:shadow-none max-lg:hidden">
      <NavContent />
    </section>
  );
};

export default LeftSidebar;
