"use client";

import {
  RiBookmarkLine,
  RiBookmarkFill,
  RiArrowUpDoubleLine,
  RiArrowDownDoubleLine,
} from "@remixicon/react";
import { usePathname } from "next/navigation";
import { toast } from "sonner";

import { QUESTION_ICON_SIZE } from "@/constants/constants";
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
    if (!userId) return toast.error("Sign in required to vote");
    if (type === "question") {
      if (voteType === "upVote") {
        await upVoteQuestion({
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasUpVoted,
          hasDownVoted,
          path: pathname,
        });
        return toast.success(`${hasUpVoted ? "Upvote Removed" : "Upvoted"}`);
      } else if (voteType === "downVote") {
        await downVoteQuestion({
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasUpVoted,
          hasDownVoted,
          path: pathname,
        });
        return toast.success(
          `${hasDownVoted ? "Downvote Removed" : "Downvoted"}`
        );
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
        return toast.success(`${hasUpVoted ? "Upvote Removed" : "Upvoted"}`);
      } else if (voteType === "downVote") {
        await downVoteAnswer({
          answerId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasUpVoted,
          hasDownVoted,
          path: pathname,
        });
        return toast.success(
          `${hasDownVoted ? "Downvote Removed" : "Downvoted"}`
        );
      }
    }
  };

  const handleSave = async () => {
    if (!userId) return toast.error("Sign in required to bookmark");
    else {
      await toggleSaveQuestion({
        questionId: JSON.parse(itemId),
        userId: JSON.parse(userId),
        path: pathname,
      });
      return toast.success(`${hasSaved ? "Bookmark Removed" : "Bookmarked"}`);
    }
  };

  return (
    <div className="flex select-none items-center justify-end gap-3 font-geistMono">
      {bookmarkButton && (
        <div
          className="border-primary hover:border-hover no-focus text-primary group flex cursor-pointer items-center rounded-md border p-1"
          onClick={() => handleSave()}
        >
          {hasSaved ? (
            <RiBookmarkFill
              size={QUESTION_ICON_SIZE}
              className="text-sky-500 group-hover:text-sky-700 dark:group-hover:text-sky-600"
            />
          ) : (
            <RiBookmarkLine
              size={QUESTION_ICON_SIZE}
              className="text-zinc-500 group-hover:text-sky-500 dark:text-zinc-400 group-hover:dark:text-sky-500"
            />
          )}
        </div>
      )}
      <div className="border-primary hover:border-hover text-primary no-focus flex items-center rounded-md border p-1">
        <RiArrowUpDoubleLine
          size={QUESTION_ICON_SIZE}
          className={
            hasUpVoted
              ? "cursor-pointer text-green-500 hover:text-green-700 dark:hover:text-green-600"
              : "cursor-pointer text-zinc-500 hover:text-green-500 dark:text-zinc-400 hover:dark:text-green-500"
          }
          onClick={() => handleVote("upVote")}
        />
        <p className="px-1 text-xs">{formatLargeNumber(upVotes, downVotes)}</p>
        <RiArrowDownDoubleLine
          size={QUESTION_ICON_SIZE}
          className={
            hasDownVoted
              ? "cursor-pointer text-red-500 hover:text-red-700 dark:hover:text-red-600"
              : "cursor-pointer text-zinc-500 hover:text-red-500 dark:text-zinc-400 hover:dark:text-red-500 "
          }
          onClick={() => handleVote("downVote")}
        />
      </div>
    </div>
  );
};

export default VoteAndSave;
