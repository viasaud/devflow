import React from "react";
import { RiChat1Line, RiDeleteBinLine, RiEyeLine } from "@remixicon/react";
import { formatAndDivideNumber, getTimeAgo } from "../../lib/utils";
import UserCard from "./user-card";
import Tag from "../layout/tag";
import QuantitySelector from "../layout/quantity-selector";

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
          size={18}
          className="ml-1 hidden cursor-pointer text-zinc-500 hover:text-red-500 dark:text-zinc-400 hover:dark:text-red-500"
        />
        {/* Delete Post is shown only when signed-in */}
      </header>

      <h3 className="font-h3-semibold mb-6">{title}</h3>

      <footer className="flex items-center gap-2">
        {tags.map((tag) => (
          <Tag key={tag.id} tag={tag} />
        ))}

        <div className="ml-auto flex items-center gap-2">
          <QuantitySelector upVotes={upVotes} />

          <div className="border-default flex items-center rounded-md border p-1">
            <RiChat1Line
              size={18}
              className="text-zinc-500 dark:text-zinc-400"
            />
            <p className="font-small-regular px-1">
              {formatAndDivideNumber(answers)}
            </p>
          </div>
          <div className="border-default flex items-center rounded-md border p-1">
            <RiEyeLine size={18} className="text-zinc-500 dark:text-zinc-400" />
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
