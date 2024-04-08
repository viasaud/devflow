import Link from "next/link";

import { Author } from "@/types";

import { Avatar, AvatarImage } from "../ui/avatar";

const UserProfileLink = ({ author }: { author: Author }) => {
  return (
    <Link
      href={`/profile/${author.username}`}
      className="text-hover flex cursor-pointer items-center gap-2"
    >
      <Avatar>
        <AvatarImage src={author.avatar} width={24} height={24} />
      </Avatar>

      <p className="text-xs font-medium">{author.name}</p>
    </Link>
  );
};

export default UserProfileLink;
