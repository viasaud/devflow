"use client";

import React, { useState } from "react";

import { HOME_DEFAULT_SORT_OPTION, HOME_SORT_OPTIONS } from "@/constants/constants";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const HomeFilterContent = () => {
  const [selectedOption, setSelectedOption] = useState(HOME_DEFAULT_SORT_OPTION);

  const handleOptionChange = (value: string) => setSelectedOption(value);

  return (
    <Select value={selectedOption} onValueChange={handleOptionChange}>
      <SelectTrigger className="text-secondary hover:text-default no-focus w-fit border-none outline-none">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="bg-default text-default border-default">
        {HOME_SORT_OPTIONS.map((option) => (
          <SelectItem key={option} value={option} className="hover:bg-hover py-2">
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default HomeFilterContent;
