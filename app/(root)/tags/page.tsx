import { Metadata } from "next";

import Filter from "@/components/shared/filter";
import Pagination from "@/components/shared/pagination";
import Tag from "@/components/shared/tag";
import { getTags } from "@/lib/actions/tag.action";
import { SearchParamsProps } from "@/types";

export const metadata: Metadata = {
  title: "Tags",
  description: "Tags page",
};

const TagsPage = async ({ searchParams }: SearchParamsProps) => {
  const tags = await getTags({
    filter: searchParams.filter,
    page: searchParams?.page ? +searchParams.page : 1,
  });

  return (
    <div className="text-primary border-primary w-full">
      <Filter type="tags" />

      <div className="flex-center flex-wrap gap-2 pt-4">
        {tags?.tags.map((tag: { name: string }) => (
          <Tag name={tag.name} key={tag.name} />
        ))}
      </div>

      <div className="my-10">
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          hasNext={tags.hasNext}
        />
      </div>
    </div>
  );
};

export default TagsPage;
