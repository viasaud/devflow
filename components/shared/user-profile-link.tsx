import Image from "next/image";
import Link from "next/link";

import { Author } from "@/types";

import { Avatar } from "../ui/avatar";

const UserProfileLink = ({ author }: { author: Author }) => {
  return (
    <Link
      href={`/profile/${author.username}`}
      className="text-hover flex cursor-pointer items-center gap-2"
    >
      <Avatar>
        <Image
          src={author.avatar}
          width={24}
          height={24}
          alt="Profile Picture"
        />
      </Avatar>

      <p className="text-xs">{author.name}</p>
    </Link>
  );
};

export default UserProfileLink;
