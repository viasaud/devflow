"use client";

import { RiSearch2Line } from "@remixicon/react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useRef, useState, useEffect } from "react";

import { Input } from "@/components/ui/input";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";

import GlobalResult from "./global-result";

const GlobalSearch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchContainerRef = useRef(null);

  const query = searchParams.get("q");

  const [search, setSearch] = useState(query || "");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (
        searchContainerRef.current &&
        // @ts-ignore
        !searchContainerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
        setSearch("");
      }
    };

    setIsOpen(false);

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [pathname]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "q",
          value: search,
        });

        router.push(newUrl);
      } else {
        if (query) {
          const newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keysToRemove: ["q", "type"],
          });

          router.push(newUrl);
        }
      }
    }, 50);

    return () => clearTimeout(delayDebounceFn);
  }, [search, router, pathname, searchParams, query]);

  return (
    <div className="relative w-full xl:w-2/5" ref={searchContainerRef}>
      <div className="border-primary relative flex h-10 grow items-center gap-1 rounded-lg border-[1.5px] px-4 ">
        <RiSearch2Line
          size={20}
          className="cursor-pointer text-zinc-900 dark:text-zinc-300"
        />
        <Input
          type="text"
          placeholder="Search"
          className="no-focus text-primary border-none bg-transparent text-sm shadow-none outline-none placeholder:text-zinc-500"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);

            if (!isOpen) setIsOpen(true);
            if (e.target.value === "" && isOpen) setIsOpen(false);
          }}
        />
      </div>
      {isOpen && <GlobalResult />}
    </div>
  );
};

export default GlobalSearch;
