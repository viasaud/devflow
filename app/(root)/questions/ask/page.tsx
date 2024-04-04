import { redirect } from "next/navigation";

import Question from "@/components/forms/question";
import { getMongoUserId } from "@/lib/utils";

const AskQuestionPage = async () => {
  const mongoUser = await getMongoUserId();
  if (!mongoUser) redirect("/sign-in");

  return (
    <div className="text-default w-full pt-7">
      <Question mongoUserId={JSON.stringify(mongoUser._id)} />
    </div>
  );
};

export default AskQuestionPage;
