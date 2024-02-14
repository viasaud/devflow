import React from "react";
import Link from "next/link";

interface Props {
  tag: { id: number; name: string };
}

const Tag = ({ tag }: Props) => {
  return (
    <Link
      href={`/tags/${tag.id}`}
      key={tag.id}
      className="text-secondary border-default hover:border-hover rounded-md border px-2 py-1 text-xs"
    >
      {tag.name}
    </Link>
  );
};

export default Tag;
