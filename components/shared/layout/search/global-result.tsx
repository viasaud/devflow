"use client";

import { RiArrowDropRightLine, RiLoaderLine } from "@remixicon/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import { SMALL_ICON_SIZE } from "@/constants/constants";
import { globalSearch } from "@/lib/actions/general.action";

import GlobalFilters from "./global-filters";

const GlobalResult = () => {
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState([]);

  const q = searchParams.get("q");
  const type = searchParams.get("type");

  useEffect(() => {
    const fetchResult = async () => {
      setResult([]);
      setIsLoading(true);

      try {
        const res = await globalSearch({ query: q, type });

        setResult(JSON.parse(res));
      } catch (error) {
        throw new Error(String(error));
      } finally {
        setIsLoading(false);
      }
    };

    if (q) {
      fetchResult();
    }
  }, [q, type]);

  const renderLink = (type: string, id: string, name: string) => {
    console.log(id);
    switch (type) {
      case "question":
        return `/questions/${id}`;
      case "user":
        return `/profile/${name}`;
      case "tag":
        return `/tags/${name}`;
      default:
        return "/";
    }
  };

  return (
    <div className="border-primary bg-primary absolute top-full z-10 mt-3 w-full rounded-lg border p-4">
      <GlobalFilters />

      <div className="mt-4 space-y-5">
        <p className="text-primary border-primary border-t pt-4 text-xs uppercase">
          Top matches
        </p>

        {isLoading ? (
          <div className="flex-center text-secondary flex-col px-5">
            <RiLoaderLine className="my-2 size-5 animate-spin" />
            <p className="text-sm">Searching</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {result.length > 0 ? (
              result.map((item: any, index: number) => (
                <Link
                  href={renderLink(item.type, item.id, item.name)}
                  key={item.type + item.id + index}
                  className="hover:bg-hover flex w-full cursor-pointer items-center gap-3 rounded-md p-1 py-1.5"
                >
                  <RiArrowDropRightLine
                    className="text-primary"
                    size={SMALL_ICON_SIZE}
                  />

                  <div className="text-primary flex flex-col text-sm">
                    <p>{item.title}</p>
                    <p className="text-secondary text-xs uppercase">
                      {item.type}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="flex-center flex-col px-5">
                <p className="text-secondary px-5 py-2.5 text-sm">
                  No results found
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GlobalResult;
