import { auth } from "@clerk/nextjs";
import { RiDeleteBinLine } from "@remixicon/react";
import Link from "next/link";

import { DEFAULT_POST_ICON_SIZE } from "@/constants/constants";
import { getUserById } from "@/lib/actions/user.action";
import { getTimeAgo } from "@/lib/utils";

import ContentStats from "../shared/content-stats";
import Tag from "../shared/tag";
import UserProfileLink from "../shared/user-profile-link";
import VoteAndSave from "../shared/vote-and-save";

interface Props {
  _id: string;
  title: string;
  tags: { id: number; name: string }[];
  author: { name: string; avatar: string; username: string };
  upVotes: number[];
  downVotes: number[];
  answers: number[];
  views: number;
  createdAt: string;
}

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
}: Props) => {
  const { userId } = auth();
  let mongoUser;
  if (userId) mongoUser = await getUserById({ userId });
  return (
    <>
      <header className="mb-4 flex items-center">
        <UserProfileLink author={author} />
        <p className="text-mid ml-auto text-xs">{getTimeAgo(createdAt)}</p>

        {/* Delete Post is shown only when signed-in */}
        <RiDeleteBinLine
          size={DEFAULT_POST_ICON_SIZE}
          className="ml-1 hidden cursor-pointer text-zinc-500 hover:text-red-500 dark:text-zinc-400 hover:dark:text-red-500"
        />
      </header>

      <Link key={_id} href={`/questions/${_id}`}>
        <p className="font-base-semibold mb-6">{title}</p>
      </Link>

      <footer className="flex items-center justify-between">
        <div className="flex items-center justify-center gap-2">
          {tags.map((tag) => (
            <Tag key={tag.name} name={tag.name} />
          ))}
        </div>

        <div className="flex items-center justify-center gap-2">
          <ContentStats
            answers={answers.length}
            views={views}
            itemId={JSON.stringify(_id)}
            userId={JSON.stringify(mongoUser?._id)}
          />
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
        </div>
      </footer>
    </>
  );
};

export default QuestionCard;
