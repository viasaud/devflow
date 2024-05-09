"use client";

import { RiDeleteBinLine } from "@remixicon/react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

import { QUESTION_ICON_SIZE } from "@/constants/constants";
import { deleteAnswer } from "@/lib/actions/answer.action";
import { deleteQuestion } from "@/lib/actions/question.action";

const DeleteItemButton = ({
  type,
  itemId,
}: {
  type: string;
  itemId: string;
}) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleDelete = () => {
    if (type === "question") {
      return async () => {
        await deleteQuestion(JSON.parse(itemId), pathname);
        toast.success("Question deleted successfully");
        router.push("/");
      };
    } else if (type === "answer") {
      return async () => {
        await deleteAnswer(JSON.parse(itemId), pathname);
        toast.success("Answer deleted successfully");
        router.push(pathname);
      };
    }
  };

  return (
    <div
      className="border-primary hover:border-hover no-focus text-primary group flex cursor-pointer items-center rounded-md border p-1"
      onClick={() => {
        toast.error(`Confirm deleting the ${type}`, {
          action: (
            <button
              className="ml-auto rounded-md bg-red-700 p-1 px-2 text-red-100 hover:brightness-90"
              onClick={handleDelete()}
            >
              Delete
            </button>
          ),
        });
      }}
    >
      <RiDeleteBinLine
        size={QUESTION_ICON_SIZE}
        className="cursor-pointer text-zinc-500 group-hover:text-red-500 dark:text-zinc-400 group-hover:dark:text-red-500"
      />
    </div>
  );
};

export default DeleteItemButton;
