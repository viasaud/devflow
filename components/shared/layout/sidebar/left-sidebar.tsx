import { getTopInteractedTags } from "@/lib/actions/tag.action";
import { getMongoUser } from "@/lib/utils";

import NavContent from "../nav-content";

const LeftSidebar = async () => {
  const mongoUser = await getMongoUser();
  const tags = await getTopInteractedTags({});
  return (
    <section className="fixed left-8 top-16 w-52 shadow-zinc-300 dark:shadow-none max-lg:hidden 2xl:mr-28">
      <NavContent username={mongoUser?.username} tags={JSON.stringify(tags)} />
    </section>
  );
};

export default LeftSidebar;
