import QuestionCard from "@/components/questions/question-card";
import Filter from "@/components/shared/filter";
import { getSavedQuestions } from "@/lib/actions/user.action";
import { getMongoUser } from "@/lib/utils";
import { Question } from "@/types";

const BookmarksPage = async () => {
  const mongoUser = await getMongoUser();
  const questions = await getSavedQuestions({ mongoUser });
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
    </main>
  );
};

export default BookmarksPage;
