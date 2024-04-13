import { redirect } from "next/navigation";

import QuestionForm from "@/components/forms/question-form";
import { getQuestionById } from "@/lib/actions/question.action";
import { getMongoUser } from "@/lib/utils";

const EditQuestion = async ({ params }: { params: { id: string } }) => {
  const mongoUser = await getMongoUser();
  const question = await getQuestionById({ questionId: params.id });

  if (mongoUser.username !== question.author.username) return redirect("/404");

  return (
    <div className="text-primary w-full pt-7">
      <QuestionForm
        mongoUserId={JSON.stringify(mongoUser._id)}
        question={JSON.stringify(question)}
        edit
      />
    </div>
  );
};

export default EditQuestion;
