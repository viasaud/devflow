"use client";

import {
  RiBookmarkLine,
  RiBookmarkFill,
  RiArrowUpDoubleLine,
  RiArrowDownDoubleLine,
} from "@remixicon/react";
import { usePathname } from "next/navigation";

import { useToast } from "@/components/ui/use-toast";
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
  const { toast } = useToast();

  const handleVote = async (voteType: string) => {
    if (!userId)
      return toast({
        className:
          "text-primary border-primary border bg-yellow-500/50 dark:bg-yellow-600/40 border-yellow-600 backdrop-blur rounded-md",
        title: "Sign In Required",
        description:
          "Please sign in to your account in order to access the voting feature.",
      });
    if (type === "question") {
      if (voteType === "upVote") {
        await upVoteQuestion({
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasUpVoted,
          hasDownVoted,
          path: pathname,
        });
        return toast({
          className:
            "text-primary border-primary border backdrop-blur rounded-md",
          title: `${hasUpVoted ? "Upvote Removed" : "Upvoted"}`,
          description: `${hasUpVoted ? "You have removed your upvote." : "You have upvoted the question."}`,
        });
      } else if (voteType === "downVote") {
        await downVoteQuestion({
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasUpVoted,
          hasDownVoted,
          path: pathname,
        });
        return toast({
          className:
            "text-primary border-primary border backdrop-blur rounded-md",
          title: `${hasDownVoted ? "Downvote Removed" : "Downvoted"}`,
          description: `${hasDownVoted ? "You have removed your downvote." : "You have downvoted the question."}`,
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
        return toast({
          className:
            "text-primary border-primary border backdrop-blur rounded-md",
          title: `${hasUpVoted ? "Upvote Removed" : "Upvoted"}`,
          description: `${hasUpVoted ? "You have removed your upvote." : "You have upvoted the answer."}`,
        });
      } else if (voteType === "downVote") {
        await downVoteAnswer({
          answerId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasUpVoted,
          hasDownVoted,
          path: pathname,
        });
        return toast({
          className:
            "text-primary border-primary border backdrop-blur rounded-md",
          title: `${hasDownVoted ? "Downvote Removed" : "Downvoted"}`,
          description: `${hasDownVoted ? "You have removed your downvote." : "You have downvoted the answer."}`,
        });
      }
    }
  };

  const handleSave = async () => {
    if (!userId)
      return toast({
        className:
          "text-primary border-primary border bg-yellow-500/50 dark:bg-yellow-600/40 border-yellow-600 backdrop-blur rounded-md",
        title: "Sign In Required",
        description:
          "Please sign in to your account in order to access the bookmark feature.",
      });
    else {
      await toggleSaveQuestion({
        questionId: JSON.parse(itemId),
        userId: JSON.parse(userId),
        path: pathname,
      });
      return toast({
        className:
          "text-primary border-primary border backdrop-blur rounded-md",
        title: `${hasSaved ? "Bookmark Removed" : "Bookmarked"}`,
        description: `${hasSaved ? "You have removed the bookmark." : "You have bookmarked the question."}`,
      });
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
