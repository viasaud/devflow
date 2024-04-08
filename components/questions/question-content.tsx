import { getTimeAgo } from "@/lib/utils";
import { Question } from "@/types";

import ContentStats from "../shared/content-stats";
import ParseHTML from "../shared/parse-html";
import Tag from "../shared/tag";
import VoteAndSave from "../shared/vote-and-save";

import UserProfileLink from "./user-profile-link";

interface Content extends Question {
  content: string;
}

const QuestionContent = ({
  question,
  mongoUser,
}: {
  question: Content;
  mongoUser: { _id: string; savedQuestions: string[] };
}) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <UserProfileLink author={question.author} />
        <p className="text-mid text-xs">{getTimeAgo(question.createdAt)}</p>
      </div>

      <h2 className="font-h3-bold text-default my-3.5">{question.title}</h2>
      <ParseHTML content={question.content} />

      <section className="border-default flex items-center gap-2 border-b py-3.5">
        {question.tags.map((tag: { name: string }) => (
          <Tag key={tag.name} name={tag.name} />
        ))}
        <div className="flex-center ml-auto gap-2">
          <ContentStats
            answers={question.answers.length}
            views={question.views}
            itemId={JSON.stringify(question._id)}
            userId={JSON.stringify(mongoUser?._id)}
          />
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
        </div>
      </section>
    </div>
  );
};

export default QuestionContent;
