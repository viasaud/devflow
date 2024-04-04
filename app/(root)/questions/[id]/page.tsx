import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";

import Answer from "@/components/forms/answer";
import AllAnswers from "@/components/questions/all-answers";
import Question from "@/components/questions/question";
import { getQuestionById } from "@/lib/actions/question.action";
import { getMongoUserId } from "@/lib/utils";

const QuestionPage = async ({ params, searchParams }: any) => {
  const question = await getQuestionById({ questionId: params.id });
  const mongoUser = await getMongoUserId();

  return (
    <div className="pt-2 max-md:px-5">
      <Question question={question} mongoUser={mongoUser} />

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
          className="font-body-regular text-default border-hover hover:text-invert flex-center my-5 mt-3.5 cursor-pointer gap-1.5 rounded-full border py-2 text-center transition-colors duration-200 ease-linear hover:bg-zinc-900 dark:hover:bg-zinc-200"
        >
          <p>Share your knowledge by answering this question.</p>
        </Link>
      </SignedOut>
    </div>
  );
};

export default QuestionPage;
