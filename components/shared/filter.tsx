"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { getSortOptions } from "@/constants/constants";
import { formUrlQuery } from "@/lib/utils";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const Filter = ({ type }: { type: string }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const { sortOptions, defaultSortOption } = getSortOptions(type);

  const [selectedOption, setSelectedOption] = useState(defaultSortOption || "");

  useEffect(() => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "filter",
      value: selectedOption.toLowerCase(),
    });

    router.push(newUrl);
  }, [selectedOption, router, searchParams]);

  const handleOptionChange = (value: string) => setSelectedOption(value);

  return (
    <div className="border-primary w-full border-b">
      <Select value={selectedOption} onValueChange={handleOptionChange}>
        <SelectTrigger className="text-hover hover:text-primary no-focus w-fit border-none outline-none">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="text-primary border-primary backdrop-blur-3xl">
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
