import { Metadata } from "next";

import QuestionCard from "@/components/questions/question-card";
import Filter from "@/components/shared/filter";
import Pagination from "@/components/shared/pagination";
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
    page: searchParams?.page ? +searchParams.page : 1,
  });
  return (
    <main className="text-primary border-primary w-full">
      <Filter type="bookmarks" />

      {questions?.savedQuestions.map((question: Question) => (
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

      {questions?.savedQuestions.length === 0 ? (
        <p className="text-primary mt-5 text-center text-sm">
          No hot questions in the last 7 days
        </p>
      ) : (
        questions?.savedQuestions.length >= 20 && (
          <div className="my-10">
            <Pagination
              pageNumber={searchParams?.page ? +searchParams.page : 1}
              hasNext={questions.hasNext}
            />
          </div>
        )
      )}
    </main>
  );
};

export default BookmarksPage;
