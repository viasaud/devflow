import React from "react";
import Link from "next/link";

interface Props {
  tag: { id: number; name: string };
}

const Tag = ({ tag }: Props) => {
  return (
    <Link
      href={`/tags/${tag.id}`}
      className="text-secondary border-default hover:border-hover font-small-regular rounded-md border px-2 py-1"
    >
      {tag.name}
    </Link>
  );
};

export default Tag;
