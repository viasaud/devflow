import PostCard from "@/components/home/post-card";
import Filter from "@/components/shared/filter";
import { getQuestions } from "@/lib/actions/question.action";

const SORT_OPTIONS = ["Best", "Hot", "New", "Open"];
const DEFAULT_SORT_OPTION = SORT_OPTIONS[2];

export default async function Home() {
  const questions = await getQuestions({});

  return (
    <main className="text-default border-default w-full">
      <header className="border-default w-full border-b">
        <Filter sortOptions={SORT_OPTIONS} defaultSortOption={DEFAULT_SORT_OPTION} />
      </header>

      {questions?.map((question) => (
        <div className="border-default text-default hover:bg-post border-b p-5" key={question._id}>
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
