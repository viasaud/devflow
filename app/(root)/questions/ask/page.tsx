import { redirect } from "next/navigation";

import QuestionForm from "@/components/forms/question-form";
import { getMongoUser } from "@/lib/utils";

const AskQuestionPage = async () => {
  const mongoUser = await getMongoUser();
  if (!mongoUser) return redirect("/sign-in");

  return (
    <div className="text-primary w-full pt-4">
      <QuestionForm mongoUserId={JSON.stringify(mongoUser._id)} />
    </div>
  );
};

export default AskQuestionPage;
