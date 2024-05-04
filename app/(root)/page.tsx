import { Metadata } from "next";

import QuestionCard from "@/components/questions/question-card";
import Filter from "@/components/shared/filter";
import { getQuestions } from "@/lib/actions/question.action";
import { Question } from "@/types";

export const metadata: Metadata = {
  title: "Home",
  description: "Home page",
};

const HomePage = async () => {
  const questions = await getQuestions({});

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
    </main>
  );
};

export default HomePage;
