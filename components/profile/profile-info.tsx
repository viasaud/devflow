import {
  RiCalendar2Line,
  RiMapPinLine,
  RiBug2Line,
  RiChat1Line,
} from "@remixicon/react";

import { QUESTION_ICON_SIZE } from "@/constants/constants";

import { Avatar, AvatarImage } from "../ui/avatar";

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
      <Avatar className="size-32">
        <AvatarImage src={userInfo?.user.avatar} />
      </Avatar>
      <div className="flex-center flex-col">
        <p className="text-primary text-xl font-bold">{userInfo?.user.name}</p>
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
