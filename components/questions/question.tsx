import { getTimeAgo } from "@/lib/utils";

import ParseHTML from "../shared/parse-html";
import Stats from "../shared/stats";
import Tag from "../shared/tag";
import VoteAndSave from "../shared/vote-and-save";

import Account from "./account";

interface Props {
  question: {
    _id: string;
    author: { name: string; avatar: string; username: string };
    title: string;
    content: string;
    tags: { name: string }[];
    views: number;
    upVotes: string[];
    downVotes: string[];
    answers: string[];
    createdAt: string;
  };
  mongoUser: {
    _id: string;
    savedQuestions: string[];
  };
}

const Question = ({ question, mongoUser }: Props) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <Account author={question.author} />
        <p className="text-mid text-xs">{getTimeAgo(question.createdAt)}</p>
      </div>

      <h2 className="font-h3-bold text-default my-3.5">{question.title}</h2>
      <ParseHTML content={question.content} />

      <section className="border-default flex items-center gap-2 border-b py-3.5">
        {question.tags.map((tag: { name: string }) => (
          <Tag key={tag.name} name={tag.name} />
        ))}
        <div className="flex-center ml-auto gap-2">
          <Stats
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

export default Question;
