import { ITag } from "@/database/tag.model";
import { IUser } from "@/database/user.model";

import NavContent from "../nav-content";

const LeftSidebar = async ({ user, tags }: { user: IUser; tags: ITag }) => {
  return (
    <section className="fixed left-8 top-16 w-52 shadow-zinc-300 dark:shadow-none max-xl:hidden 2xl:mr-28">
      <NavContent username={user?.username} tags={JSON.stringify(tags)} />
    </section>
  );
};

export default LeftSidebar;
