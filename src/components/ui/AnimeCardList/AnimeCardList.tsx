import { Anime } from "@/types/anime.type";
import { AnimeCard } from "../AnimeCard/AnimeCard"
import { AnimeCardSkeleton } from "../AnimeCard/AnimeCardSkeleton"

interface AnimeCardListProps {
  animes: Anime[];
  isLoading: boolean;
}


export const AnimeCardList = ({ animes, isLoading }: AnimeCardListProps) => {
  return (
      <div className="p-4 overflow-y-auto flex-1 min-h-0">
        <div className="rounded-md grid grid-cols-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {isLoading
            ? Array.from({ length: 24 }).map((_, index) => (
                <AnimeCardSkeleton key={index} />
              ))
            : animes?.map((anime, index) => (
                <AnimeCard key={index} name={anime.name} poster={anime.poster} />
              ))}
        </div>
      </div>
  )
}
