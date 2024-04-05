"use client";

import {
  RiArrowUpLine,
  RiArrowDownLine,
  RiBookmarkLine,
  RiBookmarkFill,
} from "@remixicon/react";
import { usePathname } from "next/navigation";

import { DEFAULT_POST_ICON_SIZE } from "@/constants/constants";
import { upVoteAnswer, downVoteAnswer } from "@/lib/actions/answer.action";
import {
  downVoteQuestion,
  upVoteQuestion,
} from "@/lib/actions/question.action";
import { toggleSaveQuestion } from "@/lib/actions/user.action";
import { formatLargeNumber } from "@/lib/utils";

interface Props {
  upVotes: number;
  downVotes: number;
  type: string;
  itemId: string;
  userId: string;
  hasUpVoted: boolean;
  hasDownVoted: boolean;
  hasSaved?: boolean;
  bookmarkButton?: boolean;
}

const VoteAndSave = ({
  upVotes,
  downVotes,
  type,
  itemId,
  userId,
  hasUpVoted,
  hasDownVoted,
  hasSaved,
  bookmarkButton,
}: Props) => {
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
    } else if (type === "answer") {
      if (voteType === "upVote") {
        await upVoteAnswer({
          answerId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasUpVoted,
          hasDownVoted,
          path: pathname,
        });
      } else if (voteType === "downVote") {
        await downVoteAnswer({
          answerId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasUpVoted,
          hasDownVoted,
          path: pathname,
        });
      }
    }
  };

  const handleSave = async () => {
    if (!userId) return;
    await toggleSaveQuestion({
      questionId: JSON.parse(itemId),
      userId: JSON.parse(userId),
      path: pathname,
    });
  };

  return (
    <div className="flex items-center justify-end gap-2">
      <div className="border-default hover:border-hover text-default no-focus flex items-center rounded-md border p-1">
        <RiArrowUpLine
          size={DEFAULT_POST_ICON_SIZE}
          className={
            hasUpVoted
              ? "cursor-pointer text-green-500 hover:text-green-700 dark:hover:text-green-600"
              : "cursor-pointer text-zinc-500 hover:text-green-500 dark:text-zinc-400 hover:dark:text-green-500"
          }
          onClick={() => handleVote("upVote")}
        />
        <p className="font-small-regular px-1">
          {formatLargeNumber(upVotes, downVotes)}
        </p>
        <RiArrowDownLine
          size={DEFAULT_POST_ICON_SIZE}
          className={
            hasDownVoted
              ? "cursor-pointer text-red-500 hover:text-red-700 dark:hover:text-red-600"
              : "cursor-pointer text-zinc-500 hover:text-red-500 dark:text-zinc-400 hover:dark:text-red-500 "
          }
          onClick={() => handleVote("downVote")}
        />
      </div>
      {bookmarkButton && (
        <div
          className="border-default hover:border-hover no-focus text-default group flex cursor-pointer items-center rounded-md border p-1"
          onClick={() => handleSave()}
        >
          {hasSaved ? (
            <RiBookmarkFill
              size={DEFAULT_POST_ICON_SIZE}
              className="text-sky-500 group-hover:text-sky-700 dark:group-hover:text-sky-600"
            />
          ) : (
            <RiBookmarkLine
              size={DEFAULT_POST_ICON_SIZE}
              className="text-zinc-500 hover:text-sky-500 dark:text-zinc-400 hover:dark:text-sky-500"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default VoteAndSave;
