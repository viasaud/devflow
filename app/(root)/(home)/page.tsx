import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  RiArrowDownLine,
  RiArrowUpLine,
  RiChat1Line,
  RiDeleteBinLine,
  RiEyeLine,
} from "@remixicon/react";
import Image from "next/image";
import Link from "next/link";

const Questions = [
  {
    _id: 1,
    title: "How to create a new project?",
    tags: [
      { id: 1, name: "React" },
      { id: 2, name: "Next.js" },
    ],
    author: { _id: 1, name: "John Doe", avatar: "/images/profile.jpg" },
    upvotes: 154,
    views: 2045,
    answers: 133,
    created_at: "2021-09-01T12:00:00Z",
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
    upvotes: 540,
    views: 2398,
    answers: 55,
    created_at: "2021-09-01T12:00:00Z",
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
    upvotes: 87,
    views: 921,
    answers: 24,
    created_at: "2024-02-13T19:50:00Z",
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
    upvotes: 122,
    views: 1403,
    answers: 37,
    created_at: "2024-02-13T19:50:00Z",
  },
  {
    _id: 5,
    title: "Best practices for accessibility in React applications",
    tags: [
      { id: 1, name: "React" },
      { id: 4, name: "Accessibility" },
    ],
    author: { _id: 1, name: "John Doe", avatar: "/images/profile.jpg" },
    upvotes: 234,
    views: 1534,
    answers: 78,
    created_at: "2022-01-10T12:00:00Z",
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
    upvotes: 198,
    views: 1200,
    answers: 32,
    created_at: "2022-02-15T12:00:00Z",
  },
];

function getTimeAgo(date: string) {
  const currentDate = new Date();
  currentDate.setHours(currentDate.getHours() + 3);
  const createdAt = new Date(date);
  const timeDiff = currentDate.getTime() - createdAt.getTime();
  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const years = Math.floor(days / 365);
  console.log(currentDate);

  if (years > 0) {
    return `${years} year${years > 1 ? "s" : ""} ago`;
  } else if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else {
    return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
  }
}

export default function Home() {
  return (
    <div className="text-default w-full">
      <div className="border-default w-full border-b">
        <Select>
          <SelectTrigger className="text-secondary hover:text-default no-focus w-24 border-none outline-none">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent className="bg-default text-default border-default">
            <SelectItem value="Best" className="hover:bg-hover py-2">
              Best
            </SelectItem>
            <SelectItem value="Hot" className="hover:bg-hover py-2">
              Hot
            </SelectItem>
            <SelectItem value="New" className="hover:bg-hover py-2">
              New
            </SelectItem>
            <SelectItem value="Open" className="hover:bg-hover py-2">
              Open
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      {Questions.map((question) => (
        <Link key={question._id} href="/">
          <div className="border-default text-default hover:bg-hover border-b p-5">
            <div className="mb-4 flex items-center">
              <Link
                href="/"
                className="text-secondary-2 flex items-center gap-2"
              >
                <Image
                  src={question.author.avatar}
                  alt="avatar"
                  width={24}
                  height={24}
                  className="rounded-full"
                />
                <p className="font-small-medium">{question.author.name}</p>
              </Link>
              <p className="font-small-medium ml-auto text-zinc-500 dark:text-zinc-400">
                {getTimeAgo(question.created_at)}
              </p>
              {/* hover-card from shadcn/ui */}
              <RiDeleteBinLine
                size={18}
                className="ml-1 hidden text-zinc-500 hover:text-red-500 dark:text-zinc-400 hover:dark:text-red-500"
              />
              {/* Delete Post is shown only when signed-in */}
            </div>
            <h3 className="font-h3-semibold mb-6">{question.title}</h3>
            <div className="flex items-center gap-2">
              {question.tags.map((tag) => (
                <Link href={`/`} key={tag.id}>
                  <span className="text-secondary border-default hover:border-hover rounded-md border px-2 py-1 text-xs">
                    {tag.name}
                  </span>
                </Link>
              ))}
              <section className="ml-auto flex items-center gap-2">
                <div className="border-default hover:border-hover flex items-center rounded-md border p-1">
                  <RiArrowUpLine
                    size={18}
                    className="text-zinc-500 hover:text-green-500 dark:text-zinc-400 hover:dark:text-green-500"
                  />
                  <p className="font-small-regular px-1">{question.upvotes}</p>
                  <RiArrowDownLine
                    size={18}
                    className="text-zinc-500 hover:text-red-500 dark:text-zinc-400 hover:dark:text-red-500"
                  />
                </div>
                <div className="border-default hover:border-hover group flex items-center rounded-md border p-1">
                  <RiChat1Line
                    size={18}
                    className="text-zinc-500 group-hover:text-blue-500 dark:text-zinc-400"
                  />
                  <p className="font-small-regular px-1">{question.answers}</p>
                </div>
                <div className="border-default flex items-center rounded-md border p-1">
                  <RiEyeLine
                    size={18}
                    className="text-zinc-500 dark:text-zinc-400"
                  />
                  <p className="font-small-regular px-1">{question.views}</p>
                </div>
              </section>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
