import { AnimeCard } from "@/components/ui/AnimeCard/AnimeCard";
import { AnimeCardSkeleton } from "@/components/ui/AnimeCard/AnimeCardSkeleton";
import { AnimeCardList } from "@/components/ui/AnimeCardList/AnimeCardList";
import { PagePagination } from "@/components/ui/PagePagination/PagePagination";
import { useApi } from "@/hooks/useApi";
import { AnimePromise } from "@/types/anime.type";
import { useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";

export function Home() {
  const { category } = useParams<{ category?: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const navigate = useNavigate();

  useEffect(() => {
    if (!category) {
      navigate("/top-animes", { replace: true });
    }
  }, [category, navigate]);

  useEffect(() => {
    if (category) {
      setSearchParams({}, { replace: true });
    }
  }, [category]);

  const currentCategory = category || "top-animes";
  const { data, isLoading } = useApi<AnimePromise>(
    [currentCategory, currentPage],
    `/animes/${currentCategory}/${currentPage}`,
  );

  return (
    <div className="p-2 flex-1 flex flex-col justify-between overflow-hidden">
      <AnimeCardList animes={data?.animes} isLoading={isLoading} />
      <div className="p-1 flex bg-sidebar rounded-md">
        <PagePagination totalPages={data?.pagination?.lastPage ?? 1} />
      </div>
    </div>
  );
}
