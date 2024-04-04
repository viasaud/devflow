import Filter from "@/components/shared/filter";
import Tag from "@/components/shared/tag";
import { getTags } from "@/lib/actions/tag.action";

const TagsPage = async () => {
  const tags = await getTags({});

  return (
    <div className="text-default border-default w-full">
      <Filter type="tags" />

      <div className="flex-center flex-wrap gap-2 pt-4">
        {tags?.map((tag) => <Tag name={tag.name} key={tag.name} />)}
      </div>
    </div>
  );
};

export default TagsPage;
