import { Metadata } from "next";

import QuestionCard from "@/components/questions/question-card";
import Filter from "@/components/shared/filter";
import { getSavedQuestions } from "@/lib/actions/user.action";
import { getMongoUser } from "@/lib/utils";
import { Question, SearchParamsProps } from "@/types";

export const metadata: Metadata = {
  title: "Bookmarks",
  description: "Bookmarks page",
};

const BookmarksPage = async ({ searchParams }: SearchParamsProps) => {
  const mongoUser = await getMongoUser();
  const questions = await getSavedQuestions({
    mongoUser,
    filter: searchParams.filter,
  });
  return (
    <main className="text-primary border-primary w-full">
      <Filter type="bookmarks" />

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

export default BookmarksPage;
