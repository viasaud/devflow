import React from "react";

import { Avatar, AvatarImage } from "../ui/avatar";
import { HoverCard, HoverCardTrigger } from "../ui/hover-card";

interface Props {
  author: { name: string; avatar: string };
}

const UserCard = ({ author }: Props) => {
  return (
    <div className="text-secondary-2 flex cursor-pointer items-center gap-2">
      <Avatar>
        <AvatarImage src={author.avatar} />
      </Avatar>

      <HoverCard>
        <HoverCardTrigger className="font-small-medium">
          {author.name}
        </HoverCardTrigger>
        {/* <HoverCardContent className="bg-default border-default rounded-md border">
              Something to put when hovered
            </HoverCardContent> */}
      </HoverCard>
    </div>
  );
};

export default UserCard;
