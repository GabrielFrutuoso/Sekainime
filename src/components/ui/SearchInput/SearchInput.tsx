import { Search } from "lucide-react";
import { Input } from "../input";
import { useApi } from "@/hooks/useApi";
import { useState, useRef, useEffect } from "react";

interface Anime {
  id: string | number;
  name: string;
  image?: string;
  poster?: string;
}

export const SearchInput = () => {
  const [searchText, setSearchText] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchText);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchText]);

  const { data } = useApi<{ animes: Anime[] }>(
    debouncedSearch ? [`/animes/search/${debouncedSearch}`] : null,
    debouncedSearch ? `/animes/search/${debouncedSearch}` : null
  );

  const suggestions: Anime[] = data?.animes ?? [];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (anime: Anime) => {
    setSearchText(anime.title);
    setIsOpen(false);
  };

  return (
    <div className="w-full flex-nowrap flex justify-center mb-1">
      <div ref={containerRef} className="relative flex flex-col w-1/3 min-w-80">
        <div className="relative flex items-center">
          <Input
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            className="pr-9"
            placeholder="Pesquisar anime..."
          />
          <button type="submit" className="absolute right-2 text-muted-foreground">
            <Search size={20} />
          </button>
        </div>

        {isOpen && suggestions.length > 0 && debouncedSearch && (
          <ul className="absolute top-full left-0 right-0 z-50 mt-1 max-h-64 overflow-y-auto rounded-md border border-border bg-popover shadow-md">
            {suggestions.map((anime) => (
              <li
                key={anime.id}
                onMouseDown={() => handleSelect(anime)}
                className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-accent transition-colors"
              >
                {(anime.image || anime.poster) && (
                  <img
                    src={anime.image || anime.poster}
                    alt={anime.name}
                    className="w-8 h-10 object-cover rounded"
                  />
                )}
                <span className="text-sm truncate">{anime.name}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};