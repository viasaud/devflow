import Link from "next/link";

import { Avatar, AvatarImage } from "../ui/avatar";

interface User {
  username: string;
  avatar: string;
  name: string;
}

const UserCard = async ({ user }: { user: User }) => {
  return (
    <Link href={`/profile/${user.username}`}>
      <div className="flex h-full flex-col items-center justify-center gap-4 p-5">
        <Avatar className="border-primary size-28 border">
          <AvatarImage src={user.avatar} width={112} height={112} />
        </Avatar>
        <div className="text-primary text-center">
          <p className="font-medium">{user.name}</p>
          <p className="text-secondary font-geistMono text-sm">
            @{user.username}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default UserCard;
