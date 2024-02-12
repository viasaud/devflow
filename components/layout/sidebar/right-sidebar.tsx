import { RiArrowRightSLine } from "@remixicon/react";
import Link from "next/link";
import React from "react";

const hotQuestions = [
  { _id: 1, title: "How do I use express as a custom server in NextJS?" },
  { _id: 2, title: "Cascading Deletes in SQLAlchemy?" },
  { _id: 3, title: "How to Perfectly Center a Div with Tailwind CSS?" },
  {
    _id: 4,
    title:
      "Best practices for data fetching in a Next.js application with Server-Side Rendering (SSR)?",
  },
  { _id: 5, title: "Redux Toolkit Not Updating State as Expected" },
];

const RightSidebar = () => {
  return (
    <section className="border-default sticky right-0 top-20 h-fit rounded-md border p-4 shadow shadow-zinc-100 dark:shadow-none max-xl:hidden max-sm:hidden lg:w-80">
      <div>
        <h3 className="text-default font-base-bold mb-4">Top Questions</h3>
        <div className="flex w-full flex-col gap-5">
          {hotQuestions.map((question) => (
            <Link
              href={`/questions/${question._id}`}
              key={question._id}
              className="text-secondary flex cursor-pointer items-center justify-between gap-7"
            >
              <p className="font-body-regular w-full">{question.title}</p>
              <RiArrowRightSLine />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RightSidebar;
