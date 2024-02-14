"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const Filter = () => {
  return (
    <Select>
      <SelectTrigger className="text-secondary hover:text-default no-focus w-24 border-none outline-none">
        <SelectValue placeholder="Sort By" />
      </SelectTrigger>
      <SelectContent className="bg-default text-default border-default">
        <SelectItem value="Best" className="hover:bg-hover py-2">
          Best
        </SelectItem>
        <SelectItem value="Hot" className="hover:bg-hover py-2">
          Hot
        </SelectItem>
        <SelectItem value="New" className="hover:bg-hover py-2">
          New
        </SelectItem>
        <SelectItem value="Open" className="hover:bg-hover py-2">
          Open
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default Filter;
