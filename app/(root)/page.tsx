import PostCard from "@/components/home/post-card";
import FilterContent from "@/components/shared/filter-content";
import { getQuestions } from "@/lib/actions/question.action";

export default async function Home() {
  const questions = await getQuestions({});

  return (
    <main className="text-default border-default w-screen pt-4 md:max-w-2xl lg:border-x">
      <header className="border-default w-full border-b">
        <FilterContent />
      </header>

      {questions?.map((question) => (
        <div className="border-default text-default hover:bg-post border-b p-5" key={question._id}>
          <PostCard
            _id={question._id}
            title={question.title}
            tags={question.tags}
            author={question.author}
            upVotes={question.upVotes}
            views={question.views}
            answers={question.answers}
            createdAt={question.createdAt}
          />
        </div>
      ))}
    </main>
  );
}
