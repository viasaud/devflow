import { SignedIn, auth } from "@clerk/nextjs";
import {
  RiBug2Line,
  RiCalendar2Line,
  RiChat1Line,
  RiMapPinLine,
  RiMedalLine,
} from "@remixicon/react";
import Link from "next/link";
import { redirect } from "next/navigation";

import QuestionCard from "@/components/home/question-card";
import Filter from "@/components/shared/filter";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DEFAULT_POST_ICON_SIZE } from "@/constants/constants";
import {
  getUserById,
  getUserInfo,
  getUserQuestions,
} from "@/lib/actions/user.action";

const ProfilePage = async ({
  params,
  searchParams,
}: {
  params: { username: string };
  searchParams: any;
}) => {
  const userInfo = await getUserInfo({ username: params.username });
  if (!userInfo) redirect("/404");

  const { userId } = auth();
  let mongoUser;
  if (userId) mongoUser = await getUserById({ userId });
  const questions = await getUserQuestions({ username: params.username });

  return (
    <main>
      <div className="border-default my-4 rounded-md border p-5">
        <div className="flex-center flex-col gap-3.5">
          <Avatar className="size-32">
            <AvatarImage src={userInfo?.user.avatar} />
          </Avatar>
          <div className="flex-center flex-col">
            <p className="text-default text-xl font-semibold">
              {userInfo?.user.name}
            </p>
            <p className="text-mid font-mono text-sm">
              @{userInfo?.user.username}
            </p>
          </div>
          <p className="text-default text-center text-sm">
            {userInfo?.user.bio}
          </p>
          <div className="text-mid flex-center w-full gap-4">
            <div className="flex-center gap-1">
              <RiCalendar2Line size={DEFAULT_POST_ICON_SIZE} />
              <p className="font-mono text-xs">
                Joined {userInfo?.user.joinedAt.toLocaleDateString()}
              </p>
            </div>
            <div className="flex-center gap-1">
              <RiMapPinLine size={DEFAULT_POST_ICON_SIZE} />
              <p className="font-mono text-xs">
                {userInfo.user.location ?? "Earth"}
              </p>
            </div>
            <div className="flex-center gap-1">
              <RiBug2Line size={DEFAULT_POST_ICON_SIZE} />
              <p className="font-mono text-xs">{userInfo?.totalQuestions}</p>
            </div>
            <div className="flex-center gap-1">
              <RiChat1Line size={DEFAULT_POST_ICON_SIZE} />
              <p className="font-mono text-xs">{userInfo?.totalAnswers}</p>
            </div>
          </div>
          <div className="text-mid flex-center w-full gap-4">
            <div className="flex-center gap-1">
              <RiMedalLine
                size={DEFAULT_POST_ICON_SIZE}
                className="text-[#cd7f32]"
              />
              <p className="font-mono text-xs">0</p>
            </div>
            <div className="flex-center gap-1">
              <RiMedalLine
                size={DEFAULT_POST_ICON_SIZE}
                className=" dark:text-[#ecebff]"
              />
              <p className="font-mono text-xs">0</p>
            </div>
            <div className="flex-center gap-1">
              <RiMedalLine
                size={DEFAULT_POST_ICON_SIZE}
                className="text-[#f9d300] dark:text-[#ffd700]"
              />
              <p className="font-mono text-xs">0</p>
            </div>
          </div>
          {params.username === mongoUser?.username && (
            <SignedIn>
              <Link href="/profile/edit" className="flex-center">
                <Button className="border-default text-secondary hover:border-hover font-small-regular max-h-8 cursor-pointer rounded-full border px-4 leading-none">
                  Edit Profile
                </Button>
              </Link>
            </SignedIn>
          )}
        </div>
      </div>
      {questions?.questions.length !== 0 && <Filter type="bookmarks" />}
      {questions?.questions.map((question) => (
        <div
          className="border-default text-default hover:bg-post border-b p-5"
          key={question._id}
        >
          <QuestionCard
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
};

export default ProfilePage;
