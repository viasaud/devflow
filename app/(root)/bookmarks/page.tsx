import QuestionCard from "@/components/home/question-card";
import Filter from "@/components/shared/filter";
import { getSavedQuestions } from "@/lib/actions/user.action";
import { getMongoUser } from "@/lib/utils";

const BookmarksPage = async () => {
  const mongoUser = await getMongoUser();
  const questions = await getSavedQuestions(mongoUser);

  return (
    <main className="text-default border-default w-full">
      <Filter type="bookmarks" />

      {questions?.savedQuestions.map((question: any) => (
        <div
          className="border-default text-default hover:bg-post border-b p-5"
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
