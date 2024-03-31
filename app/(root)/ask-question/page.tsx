import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

import Question from "@/components/forms/question";
import { getUserById } from "@/lib/actions/user.action";

const AskQuestion = async () => {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");

  const mongoUser = await getUserById({ userId });

  return (
    <div className="text-default w-full pt-7 md:w-[42rem]">
      <Question mongoUserId={JSON.stringify(mongoUser._id)} />
    </div>
  );
};

export default AskQuestion;
