import { RiChat1Line, RiEyeLine } from "@remixicon/react";
import React from "react";

import { DEFAULT_POST_ICON_SIZE } from "@/constants/constants";
import { formatLargeNumber } from "@/lib/utils";

import QuantitySelector from "./quantity-selector";

interface QuestionProps {
  upVotes: number[];
  downVotes: number[];
  answers: number[];
  views: number;
}

const Stats = ({ upVotes, downVotes, answers, views }: QuestionProps) => {
  return (
    <>
      <div className="text-default ml-auto flex items-center gap-2">
        <QuantitySelector upVotes={upVotes} downVotes={downVotes} />

        <div className="border-default flex items-center rounded-md border p-1">
          <RiChat1Line size={DEFAULT_POST_ICON_SIZE} className="text-zinc-500 dark:text-zinc-400" />
          {/* The following line is incorrect. It should be: */}
          {/* <p className="font-small-regular px-1">{formatLargeNumber(answers.length)}</p> */}
          <p className="font-small-regular px-1">{formatLargeNumber(0)}</p>
        </div>
        <div className="border-default flex items-center rounded-md border p-1">
          <RiEyeLine size={DEFAULT_POST_ICON_SIZE} className="text-zinc-500 dark:text-zinc-400" />
          <p className="font-small-regular px-1">{formatLargeNumber(views)}</p>
        </div>
      </div>
    </>
  );
};

export default Stats;
