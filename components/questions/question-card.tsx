import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

import { getUserById } from "@/lib/actions/user.action";
import { getTimeAgo } from "@/lib/utils";
import { Question } from "@/types";

import AuthorProfileLink from "../shared/author-profile-link";
import Stats from "../shared/stats";
import Tag from "../shared/tag";
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
  const { userId } = auth();
  const user = userId ? await getUserById({ clerkId: userId }) : undefined;
  return (
    <div className="flex flex-col">
      <header className="flex items-center">
        <AuthorProfileLink author={author} />
        <p className="text-secondary ml-auto font-geistMono text-xs">
          {getTimeAgo(createdAt)}
        </p>
      </header>

      <Link href={`/questions/${_id}`}>
        <p className="py-4 text-base font-semibold">{title}</p>
      </Link>

      <footer className="flex items-center justify-between">
        <div className="flex items-center justify-center gap-3">
          <VoteAndSave
            upVotes={upVotes.length}
            downVotes={downVotes.length}
            type={"question"}
            itemId={JSON.stringify(_id)}
            userId={JSON.stringify(user?._id)}
            hasUpVoted={upVotes.includes(user?._id)}
            hasDownVoted={downVotes.includes(user?._id)}
            hasSaved={user?.savedQuestions.includes(_id)}
          />
          <div className="flex items-center justify-center gap-1">
            {tags.map((tag: { name: string }) => (
              <Tag key={tag.name} name={tag.name} glow={glow} />
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center gap-2">
          <Stats
            answers={answers.length}
            views={views}
            itemId={JSON.stringify(_id)}
            userId={JSON.stringify(user?._id)}
          />
        </div>
      </footer>
    </div>
  );
};

export default QuestionCard;
