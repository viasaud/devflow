import { SignedIn, SignedOut } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import AnswerForm from "@/components/forms/answer-form";
import AnswerList from "@/components/questions/answer-list";
import QuestionContent from "@/components/questions/question-content";
import { getQuestionById } from "@/lib/actions/question.action";
import { getUserById } from "@/lib/actions/user.action";

export const metadata: Metadata = {
  title: "Question",
  description: "Question page",
};

const QuestionPage = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | undefined };
}) => {
  const question = await getQuestionById({ questionId: params.id });
  if (!question) return redirect("/404");
  const { userId } = auth();
  const user = userId ? await getUserById({ clerkId: userId }) : undefined;

  return (
    <div className="pt-2 max-md:px-5">
      <QuestionContent question={question} user={user} />

      <AnswerList
        questionId={JSON.stringify(question._id)}
        user={user}
        page={searchParams.page ? +searchParams.page : 1}
      />

      <SignedIn>
        <AnswerForm
          authorId={JSON.stringify(user?._id)}
          questionId={JSON.stringify(question._id)}
          question={question.content}
        />
      </SignedIn>

      <SignedOut>
        <Link
          href="/sign-up"
          className="text-primary border-primary flex-center my-5 mt-3.5 cursor-pointer gap-1.5 rounded-md border py-2 text-center text-sm transition-colors duration-200 ease-linear hover:!border-teal-500 hover:!text-teal-500"
        >
          <p>Sign in to share your knowledge by responding to this question!</p>
        </Link>
      </SignedOut>
    </div>
  );
};

export default QuestionPage;
