import {
  RiCalendar2Line,
  RiMapPinLine,
  RiBug2Line,
  RiChat1Line,
} from "@remixicon/react";
import Image from "next/image";

import { QUESTION_ICON_SIZE } from "@/constants/constants";

import { Avatar } from "../ui/avatar";

interface Props {
  userInfo: {
    user: {
      avatar: string;
      name: string;
      username: string;
      bio: string;
      joinedAt: Date;
      location: string;
    };
    totalQuestions: number;
    totalAnswers: number;
  };
}

const ProfileInfo = ({ userInfo }: Props) => {
  return (
    <div className="flex-center flex-col gap-3.5">
      <Avatar className="border-primary size-32 border-2">
        <Image
          src={userInfo?.user.avatar}
          alt="Profile Picture"
          width={128}
          height={128}
        />
      </Avatar>
      <div className="flex-center flex-col">
        <p className="text-primary text-xl font-semibold">
          {userInfo?.user.name}
        </p>
        <p className="text-secondary font-geistMono text-sm">
          @{userInfo?.user.username}
        </p>
      </div>
      <p className="text-primary text-center text-sm">{userInfo?.user.bio}</p>
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
            {userInfo?.user.location ?? "Earth"}
          </p>
        </div>
        <div className="flex-center gap-1">
          <RiBug2Line size={QUESTION_ICON_SIZE} />
          <p className="font-geistMono text-xs">{userInfo?.totalQuestions}</p>
        </div>
        <div className="flex-center gap-1">
          <RiChat1Line size={QUESTION_ICON_SIZE} />
          <p className="font-geistMono text-xs">{userInfo?.totalAnswers}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
