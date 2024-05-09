import { getTimeAgo } from "@/lib/utils";
import { Question } from "@/types";

import DeleteItemButton from "../shared/delete-item-button";
import ParseHTML from "../shared/parse-html";
import Stats from "../shared/stats";
import Tag from "../shared/tag";
import VoteAndSave from "../shared/vote-and-save";

import AuthorProfileLink from "./author-profile-link";
import EditQuestion from "./edit-question";

interface Content extends Question {
  content: string;
}

const QuestionContent = ({
  question,
  user,
}: {
  question: Content;
  user: { _id: string; savedQuestions: string[]; username: string };
}) => {
  return (
    <div>
      <div className="flex-start">
        <AuthorProfileLink author={question.author} />
        <p className="text-secondary ml-auto font-geistMono text-xs">
          {getTimeAgo(question.createdAt)}
        </p>
        {question.author.username === user?.username && (
          <div className="flex-center ml-3 gap-1">
            <EditQuestion questionId={JSON.stringify(question._id)} />

            <DeleteItemButton
              type="question"
              itemId={JSON.stringify(question._id)}
            />
          </div>
        )}
      </div>

      <h2 className="text-primary mb-1 mt-3.5 text-xl font-semibold">
        {question.title}
      </h2>
      <ParseHTML content={question.content} />

      <section className="border-primary flex items-center gap-3 border-b py-3.5">
        <VoteAndSave
          upVotes={question.upVotes.length}
          downVotes={question.downVotes.length}
          type={"question"}
          itemId={JSON.stringify(question._id)}
          userId={JSON.stringify(user?._id)}
          hasUpVoted={question.upVotes.includes(user?._id)}
          hasDownVoted={question.downVotes.includes(user?._id)}
          hasSaved={user?.savedQuestions.includes(question._id)}
          bookmarkButton
        />
        <div className="flex-start gap-1 max-md:hidden">
          {question.tags.map((tag: { name: string }) => (
            <Tag key={tag.name} name={tag.name} />
          ))}
        </div>
        <div className="flex-center ml-auto gap-2">
          <Stats
            answers={question.answers.length}
            views={question.views}
            itemId={JSON.stringify(question._id)}
            userId={JSON.stringify(user?._id)}
          />
        </div>
      </section>
    </div>
  );
};

export default QuestionContent;
