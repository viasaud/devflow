import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import QuestionForm from "@/components/forms/question-form";
import { getQuestionById } from "@/lib/actions/question.action";
import { getUserById } from "@/lib/actions/user.action";

const EditQuestion = async ({ params }: { params: { id: string } }) => {
  const { userId } = auth();
  const question = await getQuestionById({ questionId: params.id });
  if (userId !== question.author.clerkId) return redirect("/404");
  const user = userId ? await getUserById({ clerkId: userId }) : undefined;

  return (
    <div className="text-primary w-full pt-7">
      <QuestionForm
        userId={JSON.stringify(user._id)}
        question={JSON.stringify(question)}
        edit
      />
    </div>
  );
};

export default EditQuestion;
