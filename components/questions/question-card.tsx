import { RiDeleteBinLine } from "@remixicon/react";
import Link from "next/link";

import { QUESTION_ICON_SIZE } from "@/constants/constants";
import { getMongoUser, getTimeAgo } from "@/lib/utils";
import { Question } from "@/types";

import ContentStats from "../shared/content-stats";
import Tag from "../shared/tag";
import UserProfileLink from "../shared/user-profile-link";
import VoteAndSave from "../shared/vote-and-save";

const QuestionCard = async ({
  _id,
  title,
  tags,
  author,
  upVotes,
  downVotes,
  answers,
  views,
  createdAt,
  glow,
}: Question) => {
  const mongoUser = await getMongoUser();
  return (
    <div className="flex flex-col">
      <header className="flex items-center">
        <UserProfileLink author={author} />
        <p className="text-secondary ml-auto font-geistMono text-xs">
          {getTimeAgo(createdAt)}
        </p>

        {/* Delete Post is shown only when signed-in */}
        <RiDeleteBinLine
          size={QUESTION_ICON_SIZE}
          className="ml-1 hidden cursor-pointer text-zinc-500 hover:text-red-500 dark:text-zinc-400 hover:dark:text-red-500"
        />
      </header>

      <Link key={_id} href={`/questions/${_id}`}>
        <p className="py-4 text-base font-bold">{title}</p>
      </Link>

      <footer className="flex items-center justify-between">
        <div className="flex items-center justify-center gap-3">
          <VoteAndSave
            upVotes={upVotes.length}
            downVotes={downVotes.length}
            type={"question"}
            itemId={JSON.stringify(_id)}
            userId={JSON.stringify(mongoUser?._id)}
            hasUpVoted={upVotes.includes(mongoUser?._id)}
            hasDownVoted={downVotes.includes(mongoUser?._id)}
            hasSaved={mongoUser?.savedQuestions.includes(_id)}
          />
          <div className="flex items-center justify-center gap-1">
            {tags.map((tag: { name: string }) => (
              <Tag key={tag.name} name={tag.name} glow={glow} />
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center gap-2">
          <ContentStats
            answers={answers.length}
            views={views}
            itemId={JSON.stringify(_id)}
            userId={JSON.stringify(mongoUser?._id)}
          />
        </div>
      </footer>
    </div>
  );
};

export default QuestionCard;