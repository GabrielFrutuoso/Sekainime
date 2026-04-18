import { Search } from "lucide-react";
import { Input } from "../input";
import { useApi } from "@/hooks/useApi";
import { useState, useRef, useEffect } from "react";
import { Skeleton } from "../skeleton";

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
    }, 200);
    return () => clearTimeout(timer);
  }, [searchText]);

  const { data, isLoading } = useApi<{ animes: Anime[] }>(
    debouncedSearch ? [`/animes/search/${debouncedSearch}`] : [],
    debouncedSearch ? `/animes/search/${debouncedSearch}` : "",
  );

  const suggestions: Anime[] = data?.animes ?? [];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
          <button className="absolute right-2 text-muted-foreground">
            <Search size={20} />
          </button>
        </div>

        {isOpen && debouncedSearch && (
          <ul className="absolute top-full left-0 right-0 z-50 mt-1 max-h-64 overflow-y-auto rounded-md border border-border bg-popover shadow-md p-2">
            {isLoading && (
              <div className="space-y-2 p-1 px-3 py-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 animate-pulse"
                  >
                    <Skeleton className="w-8 h-10 bg-muted rounded" />
                    <Skeleton className="h-4 bg-muted rounded w-3/4" />
                  </div>
                ))}
              </div>
            )}
            {suggestions.length === 0 && !isLoading && (
              <span className="px-3 font-sm text-muted-foreground">
                Sem resultados para: {debouncedSearch}
              </span>
            )}
            {suggestions.map((anime) => (
              <li
                key={anime.id}
                className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-accent transition-colors"
              >
                {anime.poster && (
                  <img
                    src={anime.poster}
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
