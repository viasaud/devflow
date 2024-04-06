import { redirect } from "next/navigation";

import QuestionForm from "@/components/forms/question-form";
import { getMongoUser } from "@/lib/utils";

const AskQuestionPage = async () => {
  const mongoUser = await getMongoUser();
  if (!mongoUser) redirect("/sign-in");

  return (
    <div className="text-default w-full pt-7">
      <QuestionForm mongoUserId={JSON.stringify(mongoUser._id)} />
    </div>
  );
};

export default AskQuestionPage;
