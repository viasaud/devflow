"use client";

import { RiArrowLeftSLine, RiArrowRightSLine } from "@remixicon/react";
import { useRouter, useSearchParams } from "next/navigation";

import { SMALL_ICON_SIZE } from "@/constants/constants";
import { formUrlQuery } from "@/lib/utils";

const Pagination = ({
  pageNumber,
  hasNext,
}: {
  pageNumber: number;
  hasNext: boolean;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleNavigation = (direction: string) => {
    const nextPageNumber =
      direction === "next" ? pageNumber + 1 : pageNumber - 1;

    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "page",
      value: nextPageNumber.toString(),
    });

    router.push(newUrl);
  };

  return (
    <div className="text-primary flex-center gap-2 text-sm">
      <button
        className="flex-center hover:bg-hover cursor-pointer gap-1 rounded-md p-2 pr-3 disabled:cursor-not-allowed disabled:opacity-50"
        disabled={pageNumber === 1}
        onClick={() => handleNavigation("previous")}
      >
        <RiArrowLeftSLine size={SMALL_ICON_SIZE} />
        <p>Previous</p>
      </button>
      <p className="bg-hover select-none rounded-md px-3 py-2 text-sm">
        {pageNumber}
      </p>
      <button
        className="flex-center hover:bg-hover cursor-pointer gap-1 rounded-md p-2 pl-3 disabled:cursor-not-allowed disabled:opacity-50"
        disabled={!hasNext}
        onClick={() => handleNavigation("next")}
      >
        <p>Next</p>
        <RiArrowRightSLine size={SMALL_ICON_SIZE} />
      </button>
    </div>
  );
};

export default Pagination;
