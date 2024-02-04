import { Input } from "@/components/ui/input";
import Image from "next/image";

const GlobalSearch = () => {
  return (
    <div className="relative w-full max-w-[600px] max-lg:hidden">
      <div className="bg-light-800_dark-gradient relative flex min-h-[56px] grow items-center gap-1 rounded-xl px-4">
        <Image
          src="/icons/search.svg"
          alt="search"
          width={24}
          height={24}
          className="cursor-pointer"
        />
        <Input
          type="text"
          placeholder="Search"
          value=""
          className="font-paragraph-regular no-focus placeholder bg-light-800_dark-gradient border-none shadow-none outline-none"
        />
      </div>
    </div>
  );
};

export default GlobalSearch;
