import QuestionCard from "@/components/home/question-card";
import Filter from "@/components/shared/filter";
import { getQuestions } from "@/lib/actions/question.action";

const HomePage = async () => {
  const questions = await getQuestions({});

  return (
    <main className="text-default border-default w-full">
      <Filter type="home" />

      {questions?.map((question) => (
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
          />
        </div>
      ))}
    </main>
  );
};

export default HomePage;
