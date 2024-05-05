import { RiBug2Line, RiChat1Line } from "@remixicon/react";

import { QUESTION_ICON_SIZE } from "@/constants/constants";
import { getUserQuestions, getUserAnswers } from "@/lib/actions/user.action";
import { Answer, Question } from "@/types";

import QuestionCard from "../questions/question-card";
import Pagination from "../shared/pagination";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

interface AnsweredQuestions extends Answer {
  question: Question;
}

const UserActivityTabs = async ({
  pathUsername,
  page,
}: {
  pathUsername: string;
  page: number;
}) => {
  const questions = await getUserQuestions({
    username: pathUsername,
    page,
  });
  const answers = await getUserAnswers({ username: pathUsername, page });
  return (
    <Tabs defaultValue="questions" className="text-secondary w-full">
      <TabsList className="border-primary flex-center mx-auto w-fit border">
        <TabsTrigger
          value="questions"
          className="data-[state=active]:bg-active data-[state=active]:text-primary gap-1"
        >
          <RiBug2Line size={QUESTION_ICON_SIZE} />
          Questions
        </TabsTrigger>
        <TabsTrigger
          value="answers"
          className="data-[state=active]:bg-active data-[state=active]:text-primary gap-1"
        >
          <RiChat1Line size={QUESTION_ICON_SIZE} />
          Answers
        </TabsTrigger>
      </TabsList>
      <TabsContent value="questions">
        <main>
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
          <div className="my-10">
            <Pagination pageNumber={page} hasNext={questions.hasNext} />
          </div>
        </main>
      </TabsContent>
      <TabsContent value="answers">
        <main>
          {answers?.answers.map((answer: AnsweredQuestions) => (
            <div
              className="border-primary text-primary hover:bg-question-hover border-b p-5"
              key={answer.question._id}
            >
              <QuestionCard
                _id={answer.question._id}
                title={answer.question.title}
                tags={answer.question.tags}
                author={answer.question.author}
                upVotes={answer.question.upVotes}
                downVotes={answer.question.downVotes}
                views={answer.question.views}
                answers={answer.question.answers}
                createdAt={answer.question.createdAt}
              />
            </div>
          ))}
          <div className="my-10">
            <Pagination pageNumber={page} hasNext={answers.hasNext} />
          </div>
        </main>
      </TabsContent>
    </Tabs>
  );
};

export default UserActivityTabs;
