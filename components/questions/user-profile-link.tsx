import Link from "next/link";

import { Avatar, AvatarImage } from "../ui/avatar";

interface Props {
  author: { name: string; avatar: string; username: string };
}

const UserProfileLink = ({ author }: Props) => {
  return (
    <Link
      href={`/profile/${author.username}`}
      className="text-secondary-2 flex-center w-fit cursor-pointer gap-2"
    >
      <Avatar className="size-8">
        <AvatarImage src={author.avatar} />
      </Avatar>
      <p className="text-default text-sm">{author.name}</p>
    </Link>
  );
};

export default UserProfileLink;
