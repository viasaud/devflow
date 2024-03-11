import PostCard from "@/components/home/post-card";
import FilterContent from "@/components/shared/filter-content";

const Questions = [
  {
    _id: 1,
    title: "How to create a new project?",
    tags: [
      { id: 1, name: "React" },
      { id: 2, name: "Next.js" },
    ],
    author: { _id: 1, name: "John Doe", avatar: "/images/profile.jpg" },
    upVotes: 13454,
    views: 2034545,
    answers: 133453,
    createdAt: "2021-09-01T12:00:00Z",
  },
  {
    _id: 2,
    title: "I faced a problem with Tailwind CSS! Can anyone help me?",
    tags: [
      { id: 1, name: "Tailwind" },
      { id: 2, name: "CSS" },
      { id: 3, name: "JavaScript" },
    ],
    author: {
      _id: 2,
      name: "Saud Alshehri",
      avatar: "/images/profile2.jpeg",
    },
    upVotes: 540,
    views: 2398,
    answers: 55,
    createdAt: "2021-09-01T12:00:00Z",
  },
  {
    _id: 3,
    title:
      "How can I best structure a large, complex React application for maintainability?",
    tags: [
      { id: 1, name: "React" },
      { id: 4, name: "Architecture" },
    ],
    author: { _id: 3, name: "Maria Garcia", avatar: "/images/profile.jpg" },
    upVotes: 87,
    views: 921,
    answers: 24,
    createdAt: "2024-02-13T19:50:00Z",
  },
  {
    _id: 4,
    title:
      "What are the different approaches to secure authentication in Node.js applications?",
    tags: [
      { id: 5, name: "Node.js" },
      { id: 6, name: "Security" },
    ],
    author: { _id: 4, name: "David Lee", avatar: "/images/profile.jpg" },
    upVotes: 122,
    views: 1403,
    answers: 37,
    createdAt: "2024-02-13T19:50:00Z",
  },
  {
    _id: 5,
    title: "Best practices for accessibility in React applications",
    tags: [
      { id: 1, name: "React" },
      { id: 4, name: "Accessibility" },
    ],
    author: { _id: 1, name: "John Doe", avatar: "/images/profile.jpg" },
    upVotes: 234,
    views: 1534,
    answers: 78,
    createdAt: "2022-01-10T12:00:00Z",
  },
  {
    _id: 6,
    title: "Deploying a Next.js app to Vercel: A step-by-step guide",
    tags: [
      { id: 2, name: "Next.js" },
      { id: 5, name: "Deployment" },
    ],
    author: {
      _id: 3,
      name: "Sarah Lee",
      avatar: "/images/profile.jpg",
    },
    upVotes: 198,
    views: 1200,
    answers: 32,
    createdAt: "2022-02-15T12:00:00Z",
  },
];

export default function Home() {
  return (
    <main className="text-default border-default w-full pt-4 lg:border-x">
      <header className="border-default w-full border-b">
        <FilterContent />
      </header>

      {Questions.map((question) => (
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
            views={question.views}
            answers={question.answers}
            createdAt={question.createdAt}
          />
        </div>
      ))}
    </main>
  );
}
