import Link from "next/link";

import { getTopInteractedTags } from "@/lib/actions/tag.action";

import Tag from "../shared/tag";
import { Avatar, AvatarImage } from "../ui/avatar";

interface User {
  _id: string;
  username: string;
  avatar: string;
  name: string;
}

const UserCard = async ({ user }: { user: User }) => {
  const tags = await getTopInteractedTags({ userId: user._id });
  return (
    <Link href={`/profile/${user.username}`}>
      <div className="flex flex-col items-center justify-center gap-4 p-5">
        <Avatar className="border-default size-28 border">
          <AvatarImage src={user.avatar} />
        </Avatar>
        <div className="text-default text-center">
          <p className="font-paragraph-semibold">{user.name}</p>
          <p className="font-body-regular text-secondary">@{user.username}</p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {tags?.map((tag) => <Tag key={tag.name} name={tag.name} />)}
        </div>
      </div>
    </Link>
  );
};

export default UserCard;
