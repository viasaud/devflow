import { RiArrowRightSLine } from "@remixicon/react";
import Link from "next/link";

import { getPopularQuestions } from "@/lib/actions/question.action";
import { Question } from "@/types";

const RightSidebar = async () => {
  const questions = await getPopularQuestions();
  return (
    <section className="border-primary fixed right-8 top-20 h-fit rounded-md border p-4 shadow shadow-zinc-100 dark:shadow-none max-2xl:hidden lg:w-80">
      <div>
        <h3 className="text-primary mb-4 text-lg font-bold">Top Questions</h3>
        <div className="flex w-full flex-col gap-5">
          {questions.map((question: Question) => (
            <Link
              href={`/questions/${question._id}`}
              key={question._id}
              className="text-hover flex-between cursor-pointer gap-7"
            >
              <p className="w-full text-sm">{question.title}</p>
              <RiArrowRightSLine />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RightSidebar;
