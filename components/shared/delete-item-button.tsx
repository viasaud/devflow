"use client";

import { RiDeleteBinLine } from "@remixicon/react";
import { usePathname, useRouter } from "next/navigation";

import { QUESTION_ICON_SIZE } from "@/constants/constants";
import { deleteAnswer } from "@/lib/actions/answer.action";
import { deleteQuestion } from "@/lib/actions/question.action";

import { ToastAction } from "../ui/toast";
import { toast } from "../ui/use-toast";

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
        router.push("/");
      };
    } else if (type === "answer") {
      return async () => {
        await deleteAnswer(JSON.parse(itemId), pathname);
        router.push(pathname);
      };
    }
  };

  return (
    <div
      className="border-primary hover:border-hover no-focus text-primary group flex cursor-pointer items-center rounded-md border p-1"
      onClick={() => {
        toast({
          className:
            "text-primary border-primary border backdrop-blur rounded-md",
          description: `Are you sure you want to delete this ${type}?`,
          action: (
            <ToastAction
              altText={`Delete ${type}`}
              className="rounded-md border border-red-500 text-red-500 backdrop-blur"
              onClick={handleDelete()}
            >
              Delete {type}
            </ToastAction>
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
