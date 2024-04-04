import { SignedIn, SignedOut, auth } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

import Answer from "@/components/forms/answer";
import AllAnswers from "@/components/shared/all-answers";
import ParseHTML from "@/components/shared/parse-html";
import Stats from "@/components/shared/stats";
import Tag from "@/components/shared/tag";
import VoteAndSave from "@/components/shared/vote-and-save";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getQuestionById } from "@/lib/actions/question.action";
import { getUserById } from "@/lib/actions/user.action";
import { getTimeAgo } from "@/lib/utils";

const Page = async ({
  params,
  searchParams,
}: {
  params: any;
  searchParams: unknown;
}) => {
  const question = await getQuestionById({ questionId: params.id });
  const { userId } = auth();
  let mongoUser;
  if (userId) mongoUser = await getUserById({ userId });
  return (
    <div className="pt-2 max-md:px-5">
      <div className="flex items-center justify-between">
        <Link
          href={`/profile/${question.author.username}`}
          className="text-secondary-2 flex w-fit cursor-pointer items-center justify-start gap-2"
        >
          <Avatar className="size-9">
            <AvatarImage src={question.author.avatar} />
          </Avatar>
          <div className="flex items-center justify-center gap-1.5">
            <p className="text-default font-body-medium">
              {question.author.name}
            </p>
            <span>&#183;</span>
            <p className="font-small-regular text-mid">
              {getTimeAgo(question.createdAt)}
            </p>
          </div>
        </Link>
        <VoteAndSave
          upVotes={question.upVotes.length}
          downVotes={question.downVotes.length}
          type={"question"}
          itemId={JSON.stringify(question._id)}
          userId={JSON.stringify(mongoUser?._id)}
          hasUpVoted={question.upVotes.includes(mongoUser?._id)}
          hasDownVoted={question.downVotes.includes(mongoUser?._id)}
          hasSaved={mongoUser?.savedQuestions.includes(question._id)}
          bookmarkButton
        />
      </div>
      <h2 className="font-h3-bold text-default my-3.5">{question.title}</h2>
      <ParseHTML content={question.content} />
      <section className="border-default flex items-center gap-2 border-b py-3.5">
        {question.tags.map((tag: { name: string }) => (
          <Tag key={tag.name} name={tag.name} />
        ))}

        <Stats
          answers={question.answers.length}
          views={question.views}
          itemId={JSON.stringify(question._id)}
          userId={JSON.stringify(mongoUser?._id)}
        />
      </section>
      <AllAnswers
        totalAnswers={question.answers.length}
        authorId={JSON.stringify(mongoUser?._id)}
        questionId={JSON.stringify(question._id)}
      />
      <SignedIn>
        <Answer
          authorId={JSON.stringify(mongoUser?._id)}
          questionId={JSON.stringify(question._id)}
          question={question.content}
        />
      </SignedIn>
      <SignedOut>
        <Link
          href="/sign-up"
          className="font-body-regular text-default border-hover hover:text-invert mt-3.5 flex cursor-pointer items-center justify-center gap-1.5 rounded-full border py-2 text-center transition-colors duration-200 ease-linear hover:bg-zinc-900 dark:hover:bg-zinc-200"
        >
          <p>Join us and share your knowledge by answering this question</p>
        </Link>
      </SignedOut>
    </div>
  );
};

export default Page;
