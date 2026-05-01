import { AnimeCardList } from "@/components/ui/AnimeCardList/AnimeCardList";
import { PagePagination } from "@/components/ui/PagePagination/PagePagination";
import { SearchInput } from "@/components/ui/SearchInput/SearchInput";
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
    [currentCategory, String(currentPage)],
    `/animes/${currentCategory}/${currentPage}`,
  );

  return (
    <div className="flex-1 flex flex-col justify-between overflow-hidden">
      <SearchInput />
      <AnimeCardList animes={data?.animes ?? []} isLoading={isLoading} />
      <div className="py-1 flex bg-sidebar-accent rounded-md">
        <PagePagination totalPages={data?.pagination?.lastPage ?? 1} />
      </div>
    </div>
  );
}
