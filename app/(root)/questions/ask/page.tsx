import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import QuestionForm from "@/components/forms/question-form";
import { getUserById } from "@/lib/actions/user.action";

const AskQuestionPage = async () => {
  const { userId } = auth();
  if (!userId) return redirect("/sign-in");
  const user = userId ? await getUserById({ clerkId: userId }) : undefined;

  return (
    <div className="text-primary w-full pt-4">
      <QuestionForm userId={JSON.stringify(user._id)} />
    </div>
  );
};

export default AskQuestionPage;
