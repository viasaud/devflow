import { IUser } from "@/database/user.model";
import { getAnswers } from "@/lib/actions/answer.action";
import { getTimeAgo } from "@/lib/utils";
import { Answer } from "@/types";

import AuthorProfileLink from "../shared/author-profile-link";
import DeleteItemButton from "../shared/delete-item-button";
import Pagination from "../shared/pagination";
import ParseHTML from "../shared/parse-html";
import VoteAndSave from "../shared/vote-and-save";

interface Props {
  questionId: string;
  page?: number;
  user: IUser;
}

const AnswerList = async ({ questionId, page, user }: Props) => {
  const answers = await getAnswers({
    questionId: JSON.parse(questionId),
    page,
  });

  return (
    <div>
      {answers?.answers.map((answer: Answer) => (
        <div key={answer._id}>
          <div className="flex-start py-3.5">
            <AuthorProfileLink author={answer.author} />
            <p className="text-secondary ml-auto font-geistMono text-xs">
              {getTimeAgo(answer.createdAt)}
            </p>
            {answer.author.username === user?.username && (
              <div className="ml-3">
                <DeleteItemButton
                  type="answer"
                  itemId={JSON.stringify(answer._id)}
                />
              </div>
            )}
          </div>

          <ParseHTML content={answer.content} />

          <div className="border-primary border-b py-3.5">
            <VoteAndSave
              upVotes={answer.upVotes.length}
              downVotes={answer.downVotes.length}
              type={"answer"}
              itemId={JSON.stringify(answer._id)}
              userId={JSON.stringify(user?._id)}
              hasUpVoted={answer.upVotes.includes(user?._id)}
              hasDownVoted={answer.downVotes.includes(user?._id)}
            />
          </div>
        </div>
      ))}
      {answers?.answers.length >= 10 && (
        <div className="my-10">
          <Pagination pageNumber={page ?? 1} hasNext={answers.hasNext} />
        </div>
      )}
    </div>
  );
};

export default AnswerList;
