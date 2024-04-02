import { RiChat1Line, RiEyeLine } from "@remixicon/react";
import React from "react";

import { DEFAULT_POST_ICON_SIZE } from "@/constants/constants";
import { formatLargeNumber } from "@/lib/utils";

interface QuestionProps {
  answers: number;
  views: number;
}

const Stats = ({ answers, views }: QuestionProps) => {
  return (
    <>
      <div className="text-default ml-auto flex items-center gap-2">
        <div className="border-default flex items-center rounded-md border p-1">
          <RiChat1Line
            size={DEFAULT_POST_ICON_SIZE}
            className="text-zinc-500 dark:text-zinc-400"
          />
          <p className="font-small-regular px-1">
            {formatLargeNumber(answers)}
          </p>
        </div>
        <div className="border-default flex items-center rounded-md border p-1">
          <RiEyeLine
            size={DEFAULT_POST_ICON_SIZE}
            className="text-zinc-500 dark:text-zinc-400"
          />
          <p className="font-small-regular px-1">{formatLargeNumber(views)}</p>
        </div>
      </div>
    </>
  );
};

export default Stats;
