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
      className={` ${glow === name ? "border-teal-500 text-teal-500 hover:border-teal-700 hover:text-teal-700" : "border-primary text-hover hover:hover:border-hover"} cursor-pointer rounded-md border p-1.5 font-geistMono text-xs leading-none`}
      onClick={goBack}
    >
      {name}
    </div>
  );
};

export default Tag;
