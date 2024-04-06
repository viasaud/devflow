import Link from "next/link";

import { Avatar, AvatarImage } from "../ui/avatar";

interface User {
  _id: string;
  username: string;
  avatar: string;
  name: string;
}

const UserCard = async ({ user }: { user: User }) => {
  return (
    <Link href={`/profile/${user.username}`}>
      <div className="flex flex-col items-center justify-center gap-4 p-5">
        <Avatar className="border-default size-28 border">
          <AvatarImage src={user.avatar} width={112} height={112} />
        </Avatar>
        <div className="text-default text-center">
          <p className="font-paragraph-semibold">{user.name}</p>
          <p className="font-body-regular text-secondary font-mono">
            @{user.username}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default UserCard;
