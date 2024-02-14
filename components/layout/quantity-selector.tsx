"use client";

import { formatAndDivideNumber } from "@/lib/utils";
import { RiArrowUpLine, RiArrowDownLine } from "@remixicon/react";
import React from "react";

interface Props {
  upVotes: number;
}

const QuantitySelector = ({ upVotes }: Props) => {
  return (
    <div className="border-default hover:border-hover flex items-center rounded-md border p-1">
      <RiArrowUpLine
        size={18}
        className="cursor-pointer text-zinc-500 hover:text-green-500 dark:text-zinc-400 hover:dark:text-green-500"
        onClick={() => {}}
      />
      <p className="font-small-regular px-1">
        {formatAndDivideNumber(upVotes)}
      </p>
      <RiArrowDownLine
        size={18}
        className="cursor-pointer text-zinc-500 hover:text-red-500 dark:text-zinc-400 hover:dark:text-red-500"
        onClick={() => {}}
      />
    </div>
  );
};

export default QuantitySelector;
