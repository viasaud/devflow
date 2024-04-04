import { auth } from "@clerk/nextjs";

import PostCard from "@/components/home/post-card";
import Filter from "@/components/shared/filter";
import { getSavedQuestions } from "@/lib/actions/user.action";

const SORT_OPTIONS = ["Best", "Hot", "New", "Open"];
const DEFAULT_SORT_OPTION = SORT_OPTIONS[2];

interface Question {
  _id: string;
  title: string;
  tags: { id: number; name: string }[];
  author: { name: string; avatar: string; username: string };
  upVotes: number[];
  downVotes: number[];
  views: number;
  answers: number[];
  createdAt: string;
}

export default async function Page() {
  const { userId } = auth();
  if (!userId) return null;
  const questions = await getSavedQuestions({ clerkId: userId });

  return (
    <main className="text-default border-default w-full">
      <header className="border-default w-full border-b">
        <Filter
          sortOptions={SORT_OPTIONS}
          defaultSortOption={DEFAULT_SORT_OPTION}
        />
      </header>

      {questions?.savedQuestions.map((question: Question) => (
        <div
          className="border-default text-default hover:bg-post border-b p-5"
          key={question._id}
        >
          <PostCard
            _id={question._id}
            title={question.title}
            tags={question.tags}
            author={question.author}
            upVotes={question.upVotes}
            downVotes={question.downVotes}
            views={question.views}
            answers={question.answers}
            createdAt={question.createdAt}
          />
        </div>
      ))}
    </main>
  );
}
