import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Home() {
  return (
    <div className="text-default w-full">
      <div className="border-default w-full border-b">
        <Select>
          <SelectTrigger className="text-secondary hover:text-default no-focus w-24 border-none outline-none">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent className="bg-default text-default border-default">
            <SelectItem value="Best" className="hover:bg-hover py-2">
              Best
            </SelectItem>
            <SelectItem value="Hot" className="hover:bg-hover py-2">
              Hot
            </SelectItem>
            <SelectItem value="New" className="hover:bg-hover py-2">
              New
            </SelectItem>
            <SelectItem value="Open" className="hover:bg-hover py-2">
              Open
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <p className="mt-4 px-3">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur error
        aut officiis dolorem quam. Voluptatem deserunt soluta cupiditate nostrum
        reprehenderit? Natus cupiditate suscipit officia fuga illum quos modi,
        laboriosam necessitatibus.
      </p>
    </div>
  );
}
