import { AnimeCard } from "@/components/ui/AnimeCard/AnimeCard";
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

  return (
    <div className="p-2">
      <div
        className="p-4 bg-sidebar rounded-md grid grid-cols-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-4"
      >
        {Array.from({ length: 24 }).map((_, index) => (
          <AnimeCard
            key={index}
            name="Chainsaw Man"
            poster="https://animefire.io/img/animes/chainsaw-man-large.webp"
          />
        ))}
      </div>
    </div>
  );
}
