import { Metadata } from "next";
import { redirect } from "next/navigation";

import QuestionCard from "@/components/questions/question-card";
import Filter from "@/components/shared/filter";
import Pagination from "@/components/shared/pagination";
import { getQuestionsByTagName } from "@/lib/actions/tag.action";
import { Question } from "@/types";

export let metadata: Metadata;

const TagPage = async ({
  params,
  searchParams,
}: {
  params: { name: string };
  searchParams: { [key: string]: string | undefined };
}) => {
  const questions = await getQuestionsByTagName({
    name: params.name,
    filter: searchParams?.filter,
    page: searchParams?.page ? +searchParams.page : 1,
  });

  metadata = {
    title: `${params.name}`,
    description: "Tag page",
  };

  if (!questions) return redirect("/404");
  return (
    <div className="text-primary border-primary w-full">
      <Filter type="home" />
      {questions?.questions.map((question: Question) => (
        <div
          className="border-primary text-primary hover:bg-question-hover border-b p-5"
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

      {questions?.questions.length === 0 ? (
        <p className="text-primary mt-5 text-center text-sm">
          No hot questions in the last 7 days
        </p>
      ) : (
        <div className="my-10">
          <Pagination
            pageNumber={searchParams?.page ? +searchParams.page : 1}
            hasNext={questions.hasNext}
          />
        </div>
      )}
    </div>
  );
};

export default TagPage;
