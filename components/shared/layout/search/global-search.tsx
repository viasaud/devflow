import { RiSearch2Line } from "@remixicon/react";

import { Input } from "@/components/ui/input";

const GlobalSearch = () => {
  return (
    <div className="relative w-full xl:w-2/5">
      <div className="border-primary bg-primary relative flex h-10 grow items-center gap-1 rounded-3xl border-[1.5px] px-4 ">
        <RiSearch2Line
          size={20}
          className="cursor-pointer text-zinc-900 dark:text-zinc-300"
        />
        <Input
          type="text"
          placeholder="Search"
          className="no-focus bg-primary text-primary border-none bg-transparent text-base shadow-none outline-none placeholder:text-zinc-500"
        />
      </div>
    </div>
  );
};

export default GlobalSearch;
