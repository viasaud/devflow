import { getAnswers } from "@/lib/actions/answer.action";
import { getMongoUser, getTimeAgo } from "@/lib/utils";
import { Answer } from "@/types";

import DeleteItem from "../shared/delete-item";
import Pagination from "../shared/pagination";
import ParseHTML from "../shared/parse-html";
import UserProfileLink from "../shared/user-profile-link";
import VoteAndSave from "../shared/vote-and-save";

interface Props {
  questionId: string;
  authorId: string;
  totalAnswers: number;
  page?: number;
  filter?: number;
}

const AnswerList = async ({
  questionId,
  authorId,
  totalAnswers,
  page,
  filter,
}: Props) => {
  const answers = await getAnswers({
    questionId: JSON.parse(questionId),
    page,
  });
  const mongoUser = await getMongoUser();

  return (
    <div>
      {answers?.answers.map((answer: Answer) => (
        <div key={answer._id}>
          <div className="flex-start py-3.5">
            <UserProfileLink author={answer.author} />
            <p className="text-secondary ml-auto font-geistMono text-xs">
              {getTimeAgo(answer.createdAt)}
            </p>
            {answer.author.username === mongoUser?.username && (
              <div className="ml-3">
                <DeleteItem type="answer" itemId={JSON.stringify(answer._id)} />
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
              userId={JSON.stringify(mongoUser?._id)}
              hasUpVoted={answer.upVotes.includes(mongoUser?._id)}
              hasDownVoted={answer.downVotes.includes(mongoUser?._id)}
            />
          </div>
        </div>
      ))}

      <div className="my-10">
        <Pagination pageNumber={page ?? 1} hasNext={answers.hasNext} />
      </div>
    </div>
  );
};

export default AnswerList;
