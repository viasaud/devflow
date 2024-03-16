import React from "react";
import Link from "next/link";

interface Props {
  tag: { id: number; name: string };
}

const Tag = ({ tag }: Props) => {
  return (
    <Link
      href={`/tags/${tag.id}`}
      className="text-secondary border-default hover:border-hover font-small-regular rounded-md border p-1.5 leading-none"
    >
      {tag.name}
    </Link>
  );
};

export default Tag;
