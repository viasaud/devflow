import { Metadata } from "next";

import QuestionCard from "@/components/questions/question-card";
import Filter from "@/components/shared/filter";
import { getQuestions } from "@/lib/actions/question.action";
import { Question, SearchParamsProps } from "@/types";

export const metadata: Metadata = {
  title: "Home",
  description: "Home page",
};

const HomePage = async ({ searchParams }: SearchParamsProps) => {
  const questions = await getQuestions({ filter: searchParams.filter });
  console.log(questions);
  return (
    <main className="text-primary border-primary w-full">
      <Filter type="home" />

      {questions?.map((question: Question) => (
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
          />
        </div>
      ))}

      {questions.length === 0 && (
        <p className="text-primary mt-5 text-center text-sm">
          No hot questions in the last 7 days
        </p>
      )}
    </main>
  );
};

export default HomePage;
