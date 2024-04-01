import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

import Answer from "@/components/forms/answer";
import ParseHTML from "@/components/shared/parse-html";
import QuantitySelector from "@/components/shared/quantity-selector";
import Stats from "@/components/shared/stats";
import Tag from "@/components/shared/tag";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getQuestionById } from "@/lib/actions/question.action";

const Page = async ({ params, searchParams }: { params: any; searchParams: unknown }) => {
  const question = await getQuestionById({ questionId: params.id });
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
          <div className="flex flex-col">
            <p className="text-default font-body-medium">{question.author.name}</p>
            <p className="font-body-regular text-secondary">@{question.author.username}</p>
          </div>
        </Link>
        <QuantitySelector upVotes={question.upVotes} downVotes={question.downVotes} />
      </div>
      <h2 className="font-h3-bold text-default my-3.5">{question.title}</h2>
      <ParseHTML content={question.content} />
      <section className="border-default flex items-center gap-2 border-b py-3.5">
        {question.tags.map((tag: { name: string }) => (
          <Tag key={tag.name} name={tag.name} />
        ))}

        <Stats
          upVotes={question.upVotes}
          downVotes={question.downVotes}
          answers={question.answers}
          views={question.views}
        />
      </section>
      <SignedIn>
        <p className="font-paragraph-semibold text-default mt-3.5">Your Answer</p>
        <Answer />
      </SignedIn>
      <SignedOut>
        <Link
          href="/sign-up"
          className="font-body-regular text-default border-hover hover:text-invert mt-3.5 flex cursor-pointer justify-center rounded-full border py-2 text-center transition-colors duration-200 ease-linear hover:bg-white"
        >
          Join us and share your knowledge by answering this question
        </Link>
      </SignedOut>
    </div>
  );
};

export default Page;
