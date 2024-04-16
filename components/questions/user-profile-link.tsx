import Image from "next/image";
import Link from "next/link";

import { Author } from "@/types";

import { Avatar } from "../ui/avatar";

const UserProfileLink = ({ author }: { author: Author }) => {
  return (
    <Link
      href={`/profile/${author.username}`}
      className="text-hover flex-center w-fit cursor-pointer gap-2"
    >
      <Avatar>
        <Image
          src={author.avatar}
          width={32}
          height={32}
          alt="Profile Picture"
        />
      </Avatar>

      <p className="text-primary text-sm">{author.name}</p>
    </Link>
  );
};

export default UserProfileLink;
