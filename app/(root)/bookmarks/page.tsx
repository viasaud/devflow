import PostCard from "@/components/home/question-card";
import Filter from "@/components/shared/filter";
import { getSavedQuestions } from "@/lib/actions/user.action";
import { getMongoUserId } from "@/lib/utils";

const BookmarksPage = async () => {
  const mongoUser = await getMongoUserId();
  const questions = await getSavedQuestions(mongoUser);

  return (
    <div>
      <Filter type="bookmarks" />

      {questions?.savedQuestions.map((question: any) => (
        <div
          className="border-default text-default hover:bg-post border-b p-5"
          key={question._id}
        >
          <PostCard
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
    </div>
  );
};

export default BookmarksPage;
