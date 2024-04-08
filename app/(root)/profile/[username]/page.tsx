import { SignedIn } from "@clerk/nextjs";
import {
  RiBug2Line,
  RiCalendar2Line,
  RiChat1Line,
  RiMapPinLine,
  RiMedalLine,
  RiPencilLine,
} from "@remixicon/react";
import Link from "next/link";
import { redirect } from "next/navigation";

import QuestionCard from "@/components/questions/question-card";
import Filter from "@/components/shared/filter";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { QUESTION_ICON_SIZE, SMALL_ICON_SIZE } from "@/constants/constants";
import { getUserInfo, getUserQuestions } from "@/lib/actions/user.action";
import { getMongoUser } from "@/lib/utils";
import { Question } from "@/types";

const ProfilePage = async ({
  params,
  searchParams,
}: {
  params: { username: string };
  searchParams: { [key: string]: string | undefined };
}) => {
  const userInfo = await getUserInfo({ username: params.username });
  if (!userInfo) redirect("/404");

  const mongoUser = await getMongoUser();
  const questions = await getUserQuestions({ username: params.username });

  return (
    <main>
      <div className="border-primary my-4 rounded-md border p-5">
        <div className="flex-center flex-col gap-3.5">
          <Avatar className="size-32">
            <AvatarImage src={userInfo?.user.avatar} />
          </Avatar>
          <div className="flex-center flex-col">
            <p className="text-primary text-xl font-semibold">
              {userInfo?.user.name}
            </p>
            <p className="text-secondary font-geistMono text-sm">
              @{userInfo?.user.username}
            </p>
          </div>
          <p className="text-primary text-center text-sm">
            {userInfo?.user.bio}
          </p>
          <div className="text-secondary flex-center w-full gap-4">
            <div className="flex-center gap-1">
              <RiCalendar2Line size={QUESTION_ICON_SIZE} />
              <p className="font-geistMono text-xs">
                Joined {userInfo?.user.joinedAt.toLocaleDateString()}
              </p>
            </div>
            <div className="flex-center gap-1">
              <RiMapPinLine size={QUESTION_ICON_SIZE} />
              <p className="font-geistMono text-xs">
                {userInfo.user.location ?? "Earth"}
              </p>
            </div>
            <div className="flex-center gap-1">
              <RiBug2Line size={QUESTION_ICON_SIZE} />
              <p className="font-geistMono text-xs">
                {userInfo?.totalQuestions}
              </p>
            </div>
            <div className="flex-center gap-1">
              <RiChat1Line size={QUESTION_ICON_SIZE} />
              <p className="font-geistMono text-xs">{userInfo?.totalAnswers}</p>
            </div>
          </div>
          <div className="text-secondary flex-center w-full gap-4">
            <div className="flex-center gap-1">
              <RiMedalLine
                size={QUESTION_ICON_SIZE}
                className="text-[#cd7f32]"
              />
              <p className="font-geistMono text-xs">0</p>
            </div>
            <div className="flex-center gap-1">
              <RiMedalLine
                size={QUESTION_ICON_SIZE}
                className=" dark:text-[#ecebff]"
              />
              <p className="font-geistMono text-xs">0</p>
            </div>
            <div className="flex-center gap-1">
              <RiMedalLine
                size={QUESTION_ICON_SIZE}
                className="text-[#f9d300] dark:text-[#ffd700]"
              />
              <p className="font-geistMono text-xs">0</p>
            </div>
          </div>
          {params.username === mongoUser?.username && (
            <SignedIn>
              <Link href="/profile/edit" className="flex-center">
                <Button className="border-primary text-hover hover:border-hover max-h-8 cursor-pointer gap-1 rounded-full border px-4 text-xs">
                  <RiPencilLine size={SMALL_ICON_SIZE} />
                  Edit Profile
                </Button>
              </Link>
            </SignedIn>
          )}
        </div>
      </div>
      {questions?.length !== 0 && <Filter type="bookmarks" />}
      {questions?.map((question: Question) => (
        <div
          className="border-primary text-primary hover:bg-question-hover border-b p-5"
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
