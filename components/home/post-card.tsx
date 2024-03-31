import { RiChat1Line, RiDeleteBinLine, RiEyeLine } from "@remixicon/react";
import React from "react";

import { DEFAULT_POST_ICON_SIZE } from "@/constants/constants";
import { formatAndDivideNumber, getTimeAgo } from "@/lib/utils";

import QuantitySelector from "../shared/quantity-selector";
import Tag from "../shared/tag";

import UserCard from "./user-card";


interface Props {
  _id: number;
  title: string;
  tags: { id: number; name: string }[];
  author: { name: string; avatar: string };
  upVotes: number;
  answers: number;
  views: number;
  createdAt: string;
}

const PostCard = ({
  _id,
  title,
  tags,
  author,
  upVotes,
  answers,
  views,
  createdAt,
}: Props) => {
  return (
    <div key={_id}>
      <header className="mb-4 flex items-center">
        <UserCard author={author} />
        <p className="font-small-medium ml-auto text-zinc-500 dark:text-zinc-400">
          {getTimeAgo(createdAt)}
        </p>
        <RiDeleteBinLine
          size={DEFAULT_POST_ICON_SIZE}
          className="ml-1 hidden cursor-pointer text-zinc-500 hover:text-red-500 dark:text-zinc-400 hover:dark:text-red-500"
        />
        {/* Delete Post is shown only when signed-in */}
      </header>

      <p className="font-base-semibold mb-6">{title}</p>

      <footer className="flex items-center gap-2">
        {tags.map((tag) => (
          <Tag key={tag.name} name={tag.name} />
        ))}

        <div className="ml-auto flex items-center gap-2">
          <QuantitySelector upVotes={upVotes} />

          <div className="border-default flex items-center rounded-md border p-1">
            <RiChat1Line
              size={DEFAULT_POST_ICON_SIZE}
              className="text-zinc-500 dark:text-zinc-400"
            />
            <p className="font-small-regular px-1">
              {formatAndDivideNumber(answers)}
            </p>
          </div>
          <div className="border-default flex items-center rounded-md border p-1">
            <RiEyeLine
              size={DEFAULT_POST_ICON_SIZE}
              className="text-zinc-500 dark:text-zinc-400"
            />
            <p className="font-small-regular px-1">
              {formatAndDivideNumber(views)}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PostCard;
