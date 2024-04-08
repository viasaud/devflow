import { redirect } from "next/navigation";

import QuestionCard from "@/components/home/question-card";
import Filter from "@/components/shared/filter";
import { getQuestionsByTagName } from "@/lib/actions/tag.action";
import { Question } from "@/types";

const TagPage = async ({
  params,
  searchParams,
}: {
  params: { name: string };
  searchParams: { [key: string]: string | undefined };
}) => {
  const questions = await getQuestionsByTagName({ name: params.name });
  if (!questions) redirect("/404");
  return (
    <div className="text-default border-default w-full">
      <Filter type="home" />
      {questions?.map((question: Question) => (
        <div
          className="border-default text-default hover:bg-question border-b p-5"
          key={question._id}
        >
          <QuestionCard
            _id={question._id}
            title={question.title}
            tags={question.tags}
            author={question.author}
            upVotes={question.upVotes}
            downVotes={question.downVotes}
            views={question.views}
            answers={question.answers}
            createdAt={question.createdAt}
            glow={params.name}
          />
        </div>
      ))}
    </div>
  );
};

export default TagPage;
