import { auth } from "@clerk/nextjs";
import { RiDeleteBinLine } from "@remixicon/react";
import Link from "next/link";
import React from "react";

import { DEFAULT_POST_ICON_SIZE } from "@/constants/constants";
import { getUserById } from "@/lib/actions/user.action";
import { getTimeAgo } from "@/lib/utils";

import Stats from "../shared/stats";
import Tag from "../shared/tag";
import VoteAndSave from "../shared/vote-and-save";

import UserCard from "./user-card";

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

const PostCard = async ({
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
  if (!userId) return null;
  const mongoUser = await getUserById({ userId });
  return (
    <>
      <header className="mb-4 flex items-center">
        <UserCard author={author} />
        <p className="font-small-medium ml-auto text-zinc-500 dark:text-zinc-400">
          {getTimeAgo(createdAt)}
        </p>
        <RiDeleteBinLine
          size={DEFAULT_POST_ICON_SIZE}
          className="ml-1 hidden cursor-pointer text-zinc-500 hover:text-red-500 dark:text-zinc-400 hover:dark:text-red-500"
        />
        {/* Delete Post is shown only when signed-in */}
      </header>

      <Link key={_id} href={`/question/${_id}`}>
        <p className="font-base-semibold mb-6">{title}</p>
      </Link>

      <footer className="flex items-center justify-between">
        <div className="flex items-center justify-center gap-2">
          {tags.map((tag) => (
            <Tag key={tag.name} name={tag.name} />
          ))}
        </div>

        <div className="flex items-center justify-center gap-2">
          <VoteAndSave
            upVotes={upVotes.length}
            downVotes={downVotes.length}
            type={"question"}
            itemId={JSON.stringify(_id)}
            userId={JSON.stringify(mongoUser._id)}
            hasUpVoted={upVotes.includes(mongoUser._id)}
            hasDownVoted={downVotes.includes(mongoUser._id)}
            hasSaved={mongoUser.savedQuestions.includes(_id)}
          />
          <Stats answers={answers.length} views={views} />
        </div>
      </footer>
    </>
  );
};

export default PostCard;
