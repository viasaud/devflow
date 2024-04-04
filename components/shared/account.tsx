import Link from "next/link";
import React from "react";

import { Avatar, AvatarImage } from "../ui/avatar";

interface Props {
  author: { name: string; avatar: string; username: string };
}

const Account = ({ author }: Props) => {
  return (
    <Link
      href={`/profile/${author.username}`}
      className="text-secondary-2 flex cursor-pointer items-center gap-2"
    >
      <Avatar>
        <AvatarImage src={author.avatar} />
      </Avatar>

      <p className="font-small-medium">{author.name}</p>
    </Link>
  );
};

export default Account;
