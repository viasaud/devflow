"use client";

import { useState } from "react";

import { getSortOptions } from "@/constants/constants";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const Filter = ({ type }: { type: string }) => {
  const { sortOptions, defaultSortOption } = getSortOptions(type);

  const [selectedOption, setSelectedOption] = useState(defaultSortOption);

  const handleOptionChange = (value: string) => setSelectedOption(value);

  return (
    <div className="border-default w-full border-b">
      <Select value={selectedOption} onValueChange={handleOptionChange}>
        <SelectTrigger className="text-secondary hover:text-default no-focus w-fit border-none outline-none">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-default text-default border-default">
          {sortOptions?.map((option) => (
            <SelectItem
              key={option}
              value={option}
              className="hover:bg-hover py-2"
            >
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default Filter;
