import { Input } from "@workspace/ui/components/input";
import { SearchIcon } from "lucide-react";

const Search = () => {
  return (
    <div className="flex items-center gap-2 border border-border px-2 rounded-md bg-input">
      <SearchIcon className="w-4 h-4 text-white" />
      <Input
        type="text"
        placeholder="Search for a cryptocurrency"
        className="border-none text-white placeholder:text-white focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
      />
    </div>
  );
};

export default Search;
