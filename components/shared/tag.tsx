"use client";

import { useRouter } from "next/navigation";

const Tag = ({ name, glow }: { name: string; glow?: string }) => {
  const router = useRouter();

  const goBack = () => {
    if (glow === name) {
      router.back();
    } else {
      router.push(`/tags/${name}`);
    }
  };

  return (
    <div
      className={` ${glow === name ? "border-orange-500 text-orange-500 hover:border-orange-700 hover:text-orange-700" : "border-default text-secondary hover:border-hover"}  font-small-regular cursor-pointer rounded-md border p-1.5 leading-none`}
      onClick={goBack}
    >
      {name}
    </div>
  );
};

export default Tag;
