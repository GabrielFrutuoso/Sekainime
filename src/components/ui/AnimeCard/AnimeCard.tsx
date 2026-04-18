import { Anime } from "@/types/anime.type";
import { Link } from "react-router-dom";

export const AnimeCard = (anime: Anime) => {
  return (
    <Link
      to={`/infos/${anime.name.toLowerCase().replace(/[^a-z0-9\s]/g, " ").trim().replace(/\s+/g, "-")}`}
      className="relative group flex flex-col w-full bg-card rounded-md overflow-hidden shadow-md"
    >
      <img
        src={anime.poster}
        alt={anime.name}
        className="w-full aspect-2/3 object-cover transition-transform duration-300 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent flex items-end p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <h1 className="text-white text-xs sm:text-sm font-medium line-clamp-2">
          {anime.name}
        </h1>
      </div>
    </Link>
  );
};
