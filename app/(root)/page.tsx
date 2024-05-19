import QuestionCard from "@/components/questions/question-card";
import Filter from "@/components/shared/filter";
import Pagination from "@/components/shared/pagination";
import { getQuestions } from "@/lib/actions/question.action";
import { Question, SearchParamsProps } from "@/types";

const HomePage = async ({ searchParams }: SearchParamsProps) => {
  const questions = await getQuestions({
    filter: searchParams.filter,
    page: searchParams?.page ? +searchParams.page : 1,
  });

  return (
    <main className="text-primary border-primary w-full">
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
          />
        </div>
      ))}

      {questions?.questions.length === 0 ? (
        <p className="text-primary mt-5 text-center text-sm">
          No hot questions in the last 7 days
        </p>
      ) : (
        questions?.questions.length >= 20 && (
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

export default HomePage;
