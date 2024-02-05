import { Input } from "@/components/ui/input";
import Image from "next/image";

const GlobalSearch = () => {
  return (
    <div className="relative w-full max-w-[600px] max-lg:hidden">
      <div className="bg-light-800_dark-300 border-light-700_dark-400 relative flex min-h-10 grow items-center gap-1 rounded-xl border px-4">
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
          className="font-paragraph-regular no-focus placeholder bg-light-800_dark-gradient text-dark-100_light-900 border-none bg-transparent shadow-none outline-none"
        />
      </div>
    </div>
  );
};

export default GlobalSearch;
