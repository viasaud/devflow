import NavContent from "../nav-content";

const LeftSidebar = () => {
  return (
    <section className="bg-default sticky left-0 top-16 w-52 pt-2 shadow-zinc-300 dark:shadow-none max-lg:hidden 2xl:mr-28">
      <NavContent />
    </section>
  );
};

export default LeftSidebar;
