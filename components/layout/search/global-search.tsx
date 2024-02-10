import { Input } from "@/components/ui/input";
import { RiSearch2Line } from "@remixicon/react";

const GlobalSearch = () => {
  return (
    <div className="relative w-full xl:w-2/5">
      <div className="border-default bg-hover relative flex h-10 grow items-center gap-1 rounded-3xl border px-4 ">
        <RiSearch2Line
          size={24}
          className="cursor-pointer text-zinc-500"
        />
        <Input
          type="text"
          placeholder="Search"
          className="font-paragraph-regular no-focus bg-default text-default border-none bg-transparent shadow-none outline-none placeholder:text-zinc-500"
        />
      </div>
    </div>
  );
};

export default GlobalSearch;
