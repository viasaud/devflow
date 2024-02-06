import { Input } from "@/components/ui/input";
import { RiSearch2Line } from "@remixicon/react";

const GlobalSearch = () => {
  return (
    <div className="relative w-full max-w-[600px] max-lg:hidden">
      <div className="border-light-700_dark-400 relative flex min-h-10 grow items-center gap-1 rounded-xl border bg-light-800 px-4 dark:bg-dark-500">
        <RiSearch2Line
          size={24}
          className="cursor-pointer text-light-400"
        />
        <Input
          type="text"
          placeholder="Search"
          className="font-paragraph-regular no-focus bg-light-800_dark-gradient text-dark-100_light-900 border-none bg-transparent shadow-none outline-none placeholder:text-light-400"
        />
      </div>
    </div>
  );
};

export default GlobalSearch;
