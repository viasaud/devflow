import Link from "next/link";

import { Author } from "@/types";

import { Avatar, AvatarImage } from "../ui/avatar";

const UserProfileLink = ({ author }: { author: Author }) => {
  return (
    <Link
      href={`/profile/${author.username}`}
      className="text-hover flex-center w-fit cursor-pointer gap-2"
    >
      <Avatar className="size-8">
        <AvatarImage src={author.avatar} width={32} height={32} />
      </Avatar>
      <p className="text-primary text-sm">{author.name}</p>
    </Link>
  );
};

export default UserProfileLink;
