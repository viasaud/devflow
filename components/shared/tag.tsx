import Link from "next/link";

const Tag = ({ name }: { name: string }) => {
  return (
    <Link
      href={`/tags/${name}`}
      className="text-secondary border-default hover:border-hover font-small-regular cursor-pointer rounded-md border p-1.5 leading-none"
    >
      {name}
    </Link>
  );
};

export default Tag;
