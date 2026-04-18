import { Search } from "lucide-react";
import { Input } from "../input";

export const SearchInput = () => {
  return (
    <div className="w-full flex-nowrap flex justify-center mb-1">
      <div className="relative flex items-center w-1/3 min-w-80">
        <Input className="pr-9" placeholder="Pesquisar anime..." />
        <button type="submit" className="absolute right-2 text-muted-foreground">
          <Search size={20} />
        </button>
      </div>
    </div>
  );
};
