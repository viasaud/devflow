import { auth } from "@clerk/nextjs";

import { getAnswers } from "@/lib/actions/answer.action";
import { getUserById } from "@/lib/actions/user.action";
import { getTimeAgo } from "@/lib/utils";

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
  const answers = await getAnswers({ questionId: JSON.parse(questionId) });
  const { userId } = auth();
  let mongoUser: any;
  if (userId) mongoUser = await getUserById({ userId });

  return (
    <div>
      {answers?.answers.map((answer) => (
        <div key={answer._id}>
          <div className="flex items-center justify-between py-3.5">
            <UserProfileLink author={answer.author} />
            <p className="text-mid text-xs">{getTimeAgo(answer.createdAt)}</p>
          </div>

          <ParseHTML content={answer.content} />

          <div className="border-default border-b py-3.5">
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
    </div>
  );
};

export default AnswerList;
