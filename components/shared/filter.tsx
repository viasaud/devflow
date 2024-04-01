"use client";

import React, { useState } from "react";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface Props {
  sortOptions: string[];
  defaultSortOption: string;
}

const Filter = ({ sortOptions, defaultSortOption }: Props) => {
  const [selectedOption, setSelectedOption] = useState(defaultSortOption);

  const handleOptionChange = (value: string) => setSelectedOption(value);

  return (
    <Select value={selectedOption} onValueChange={handleOptionChange}>
      <SelectTrigger className="text-secondary hover:text-default no-focus w-fit border-none outline-none">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="bg-default text-default border-default">
        {sortOptions.map((option) => (
          <SelectItem key={option} value={option} className="hover:bg-hover py-2">
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default Filter;
