import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { redirect } from "next/navigation";

import AnswerForm from "@/components/forms/answer-form";
import AnswerList from "@/components/questions/answer-list";
import QuestionContent from "@/components/questions/question-content";
import { getQuestionById } from "@/lib/actions/question.action";
import { getMongoUser } from "@/lib/utils";

const QuestionPage = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | undefined };
}) => {
  const question = await getQuestionById({ questionId: params.id });
  if (!question) redirect("/404");
  const mongoUser = await getMongoUser();

  return (
    <div className="pt-2 max-md:px-5">
      <QuestionContent question={question} mongoUser={mongoUser} />

      <AnswerList
        totalAnswers={question.answers.length}
        authorId={JSON.stringify(mongoUser?._id)}
        questionId={JSON.stringify(question._id)}
      />

      <SignedIn>
        <AnswerForm
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
