import Link from "next/link";
import React from "react";

interface Props {
  name: string;
}

const Tag = ({ name }: Props) => {
  return (
    <Link
      href={`/tags/${name}`}
      className="text-secondary border-default hover:border-hover font-small-regular rounded-md border p-1.5 leading-none"
    >
      {name}
    </Link>
  );
};

export default Tag;
