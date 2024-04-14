"use client";

import { RiChat1Line, RiEyeLine } from "@remixicon/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

import { QUESTION_ICON_SIZE } from "@/constants/constants";
import { viewQuestion } from "@/lib/actions/interaction.action";
import { formatLargeNumber } from "@/lib/utils";

interface QuestionProps {
  answers: number;
  views: number;
  itemId: string;
  userId: string;
}

const ContentStats = ({ answers, views, itemId, userId }: QuestionProps) => {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    viewQuestion({
      userId: userId ? JSON.parse(userId) : undefined,
      questionId: JSON.parse(itemId),
    });
  }, [itemId, userId, pathname, router]);

  return (
    <div className="cursor-default select-none font-geistMono">
      <div className="text-primary ml-auto flex items-center gap-2">
        <div className="flex items-center rounded-md p-1">
          <RiChat1Line
            size={QUESTION_ICON_SIZE}
            className="text-zinc-500 dark:text-zinc-400"
          />
          <p className="px-1 text-xs">{formatLargeNumber(answers)}</p>
        </div>
        <div className="flex items-center rounded-md p-1">
          <RiEyeLine
            size={QUESTION_ICON_SIZE}
            className="text-zinc-500 dark:text-zinc-400"
          />
          <p className="px-1 text-xs">{formatLargeNumber(views)}</p>
        </div>
      </div>
    </div>
  );
};

export default ContentStats;
