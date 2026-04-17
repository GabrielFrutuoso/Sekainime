import { AnimeCard } from "@/components/ui/AnimeCard/AnimeCard";
import { useApi } from "@/hooks/useApi";
import { AnimePromise } from "@/types/anime.type";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export function Home() {
  const { category } = useParams<{ category?: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!category) {
      navigate("/top-animes", { replace: true });
    }
  }, [category, navigate]);

  const endpoint = category ? `/animes/${category}` : "/animes/top-animes";
  const { data } = useApi<AnimePromise>([endpoint], endpoint);
  console.log(data);

  return (
    <div className="p-2">
      <div className="p-4 bg-sidebar rounded-md grid grid-cols-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {data?.animes?.map((anime, index) => (
          <AnimeCard key={index} name={anime.name} poster={anime.poster} />
        ))}
      </div>
    </div>
  );
}
