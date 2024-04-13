"use client";

import { RiPencilLine } from "@remixicon/react";
import { useRouter } from "next/navigation";

import { QUESTION_ICON_SIZE } from "@/constants/constants";

const EditQuestion = ({ questionId }: { questionId: string }) => {
  const router = useRouter();
  return (
    <div className="border-primary hover:border-hover no-focus text-primary group ml-2 flex cursor-pointer items-center rounded-md border p-1">
      <RiPencilLine
        size={QUESTION_ICON_SIZE}
        className="cursor-pointer text-zinc-500 group-hover:text-pink-500 dark:text-zinc-400 group-hover:dark:text-pink-500"
        onClick={() => router.push(`/questions/edit/${JSON.parse(questionId)}`)}
      />
    </div>
  );
};

export default EditQuestion;
