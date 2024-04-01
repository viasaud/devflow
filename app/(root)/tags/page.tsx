import React from "react";

import Filter from "@/components/shared/filter";
import Tag from "@/components/shared/tag";
import { getTags } from "@/lib/actions/tag.action";

const SORT_OPTIONS = ["Popular", "Latest", "Name", "Oldest"];
const DEFAULT_SORT_OPTION = SORT_OPTIONS[0];

const Page = async () => {
  const tags = await getTags({});

  return (
    <div className="text-default border-default w-full">
      <header className="border-default w-full border-b">
        <Filter sortOptions={SORT_OPTIONS} defaultSortOption={DEFAULT_SORT_OPTION} />
      </header>

      <div className="flex flex-wrap justify-center gap-2 pt-4">
        <div className="hover:bg-post flex w-40 cursor-pointer justify-center gap-2">
          {tags?.map((tag) => <Tag name={tag.name} key={tag.name} />)}
        </div>
      </div>
    </div>
  );
};

export default Page;
