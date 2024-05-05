import { getTimeAgo } from "@/lib/utils";
import { Question } from "@/types";

import ContentStats from "../shared/content-stats";
import DeleteItem from "../shared/delete-item";
import ParseHTML from "../shared/parse-html";
import Tag from "../shared/tag";
import VoteAndSave from "../shared/vote-and-save";

import EditQuestion from "./edit-question";
import UserProfileLink from "./user-profile-link";

interface Content extends Question {
  content: string;
}

const QuestionContent = ({
  question,
  mongoUser,
}: {
  question: Content;
  mongoUser: { _id: string; savedQuestions: string[]; username: string };
}) => {
  return (
    <div>
      <div className="flex-start">
        <UserProfileLink author={question.author} />
        <p className="text-secondary ml-auto font-geistMono text-xs">
          {getTimeAgo(question.createdAt)}
        </p>
        {question.author.username === mongoUser?.username && (
          <div className="flex-center ml-3 gap-1">
            <EditQuestion questionId={JSON.stringify(question._id)} />

            <DeleteItem type="question" itemId={JSON.stringify(question._id)} />
          </div>
        )}
      </div>

      <h2 className="text-primary mb-1 mt-3.5 text-xl font-bold">
        {question.title}
      </h2>
      <ParseHTML content={question.content} />

      <section className="border-primary flex items-center gap-3 border-b py-3.5">
        <VoteAndSave
          upVotes={question.upVotes.length}
          downVotes={question.downVotes.length}
          type={"question"}
          itemId={JSON.stringify(question._id)}
          userId={JSON.stringify(mongoUser?._id)}
          hasUpVoted={question.upVotes.includes(mongoUser?._id)}
          hasDownVoted={question.downVotes.includes(mongoUser?._id)}
          hasSaved={mongoUser?.savedQuestions.includes(question._id)}
          bookmarkButton
        />
        <div className="flex-start gap-1 max-md:hidden">
          {question.tags.map((tag: { name: string }) => (
            <Tag key={tag.name} name={tag.name} />
          ))}
        </div>
        <div className="flex-center ml-auto gap-2">
          <ContentStats
            answers={question.answers.length}
            views={question.views}
            itemId={JSON.stringify(question._id)}
            userId={JSON.stringify(mongoUser?._id)}
          />
        </div>
      </section>
    </div>
  );
};

export default QuestionContent;
