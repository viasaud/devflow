"use client";

import { RiArrowUpLine, RiArrowDownLine } from "@remixicon/react";
import { usePathname } from "next/navigation";
import React from "react";

import { DEFAULT_POST_ICON_SIZE } from "@/constants/constants";
import { downVoteQuestion, upVoteQuestion } from "@/lib/actions/question.action";
import { formatLargeNumber } from "@/lib/utils";

interface Props {
  upVotes: number[];
  downVotes: number[];
  type: string;
  itemId: string;
  userId: string;
  hasUpVoted: boolean;
  hasDownVoted: boolean;
}

const QuantitySelector = ({ upVotes, downVotes, type, itemId, userId, hasUpVoted, hasDownVoted }: Props) => {
  const pathname = usePathname();

  const handleVote = async (voteType: string) => {
    if (!userId) return;
    if (type === "question") {
      if (voteType === "upVote") {
        await upVoteQuestion({
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasUpVoted,
          hasDownVoted,
          path: pathname,
        });
      } else if (voteType === "downVote") {
        await downVoteQuestion({
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasUpVoted,
          hasDownVoted,
          path: pathname,
        });
      }
    } else {
      // handleAnswerVote({ type: voteType, answerId: itemId, userId });
    }
  };

  return (
    <div className="border-default hover:border-hover text-default flex items-center rounded-md border p-1">
      <RiArrowUpLine
        size={DEFAULT_POST_ICON_SIZE}
        className={
          hasUpVoted
            ? "cursor-pointer text-green-500 hover:text-zinc-500 dark:text-green-500 dark:hover:text-zinc-400"
            : "cursor-pointer text-zinc-500 hover:text-green-500 dark:text-zinc-400 hover:dark:text-green-500"
        }
        onClick={() => handleVote("upVote")}
      />
      <p className="font-small-regular px-1">{formatLargeNumber(upVotes.length, downVotes.length)}</p>
      <RiArrowDownLine
        size={DEFAULT_POST_ICON_SIZE}
        className={
          hasDownVoted
            ? "cursor-pointer text-red-500 hover:text-zinc-500 dark:text-red-500 dark:hover:text-zinc-400"
            : "cursor-pointer text-zinc-500 hover:text-red-500 dark:text-zinc-400 dark:hover:text-red-500"
        }
        onClick={() => handleVote("downVote")}
      />
    </div>
  );
};

export default QuantitySelector;
