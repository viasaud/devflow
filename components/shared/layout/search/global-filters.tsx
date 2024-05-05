"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

import { GlobalSearchFilters } from "@/constants/constants";
import { formUrlQuery } from "@/lib/utils";

const GlobalFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const typeParams = searchParams.get("type");

  const [active, setActive] = useState(typeParams || "");

  const handleTypeClick = (item: string) => {
    if (active === item) {
      setActive("");

      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "type",
        value: null,
      });

      router.push(newUrl, { scroll: false });
    } else {
      setActive(item);

      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "type",
        value: item.toLowerCase(),
      });

      router.push(newUrl, { scroll: false });
    }
  };

  return (
    <div className="flex items-center gap-5">
      <p className="text-primary text-xs uppercase">Filters</p>
      <div className="flex items-center gap-2">
        {GlobalSearchFilters.map((item) => (
          <button
            type="button"
            key={item.value}
            className={`border-primary text-primary rounded-md border p-1 px-4 text-sm
              ${active === item.value ? "bg-active" : "hover:bg-hover"}
            `}
            onClick={() => handleTypeClick(item.value)}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GlobalFilters;
