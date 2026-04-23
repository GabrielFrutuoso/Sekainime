import { AnimeCardList } from "@/components/ui/AnimeCardList/AnimeCardList";
import { PagePagination } from "@/components/ui/PagePagination/PagePagination";
import { SearchInput } from "@/components/ui/SearchInput/SearchInput";
import { useApi } from "@/hooks/useApi";
import { AnimePromise } from "@/types/anime.type";
import { useParams, useSearchParams } from "react-router-dom";

export const Search = () => {
  const { query } = useParams<{ query: string }>();
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const { data, isLoading } = useApi<AnimePromise>(
    ["search", query || "", String(currentPage)],
    query ? `/animes/search/${query}/${currentPage}` : "",
  );

  return (
    <div className="p-2 flex-1 flex flex-col justify-between overflow-hidden">
      <div className="flex flex-col gap-4">
        <SearchInput />
        <div className="px-4">
          <h1 className="text-xl font-bold">
            Resultados para: <span className="text-primary">{query}</span>
          </h1>
        </div>
      </div>

      <AnimeCardList animes={data?.animes ?? []} isLoading={isLoading} />

      <div className="p-1 flex bg-sidebar rounded-md">
        <PagePagination totalPages={data?.pagination?.lastPage ?? 1} />
      </div>
    </div>
  );
};
