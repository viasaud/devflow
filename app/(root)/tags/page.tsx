import { Metadata } from "next";

import Filter from "@/components/shared/filter";
import Tag from "@/components/shared/tag";
import { getTags } from "@/lib/actions/tag.action";

export const metadata: Metadata = {
  title: "Tags",
  description: "Tags page",
};

const TagsPage = async () => {
  const tags = await getTags({});

  return (
    <div className="text-primary border-primary w-full">
      <Filter type="tags" />

      <div className="flex-center flex-wrap gap-2 pt-4">
        {tags?.map((tag: { name: string }) => (
          <Tag name={tag.name} key={tag.name} />
        ))}
      </div>
    </div>
  );
};

export default TagsPage;
