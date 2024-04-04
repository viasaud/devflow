import { auth } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

import { getAnswers } from "@/lib/actions/answer.action";
import { getUserById } from "@/lib/actions/user.action";
import { getTimeAgo } from "@/lib/utils";

import { Avatar, AvatarImage } from "../ui/avatar";

import ParseHTML from "./parse-html";
import VoteAndSave from "./vote-and-save";

interface Props {
  questionId: string;
  authorId: string;
  totalAnswers: number;
  page?: number;
  filter?: number;
}

const AllAnswers = async ({
  questionId,
  authorId,
  totalAnswers,
  page,
  filter,
}: Props) => {
  const answers = await getAnswers({ questionId: JSON.parse(questionId) });
  const { userId } = auth();
  let mongoUser: any;
  if (userId) mongoUser = await getUserById({ userId });

  return (
    <div className="border-default border-b py-3.5">
      {answers?.answers.map((answer) => (
        <div key={answer._id}>
          <div className="flex items-center justify-between pb-3.5">
            <Link
              href={`/profile/${answer.author.username}`}
              className="text-secondary-2 flex w-fit cursor-pointer items-center justify-start gap-2"
            >
              <Avatar className="size-9">
                <AvatarImage src={answer.author.avatar} />
              </Avatar>
              <div className="flex items-center justify-center gap-1.5">
                <p className="text-default font-body-medium">
                  {answer.author.name}
                </p>
                <span>&#183;</span>
                <p className="font-small-regular text-mid">
                  {getTimeAgo(answer.createdAt)}
                </p>
              </div>
            </Link>
            <VoteAndSave
              upVotes={answer.upVotes.length}
              downVotes={answer.downVotes.length}
              type={"answer"}
              itemId={JSON.stringify(answer._id)}
              userId={JSON.stringify(mongoUser?._id)}
              hasUpVoted={answer.upVotes.includes(mongoUser?._id)}
              hasDownVoted={answer.downVotes.includes(mongoUser?._id)}
            />
          </div>
          <ParseHTML content={answer.content} />
        </div>
      ))}
    </div>
  );
};

export default AllAnswers;
