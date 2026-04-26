import { useApi } from "@/hooks/useApi";
import { AnimeInfos } from "@/types/anime.type";
import { useParams } from "react-router-dom";
import { InfosSkeleton } from "./components/InfosSkeleton";
import { AnimeDetails } from "./components/AnimeDetails";
import { EpisodeList } from "./EpisodeList";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

export const Infos = () => {
  const { anime } = useParams<{ anime: string }>();
  const navigate = useNavigate();
  const { data } = useApi<AnimeInfos>(
    [
      `/animes/infos/${anime?.replace("-todos-os-episodios", "")}`,
    ],
    `/animes/infos/${anime?.replace("-todos-os-episodios", "")}`,
  );

  if (!data) return <InfosSkeleton />;

  return (
    <div className="min-h-screen w-full flex flex-col text-white p-2 overflow-y-auto">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1 text-zinc-400 hover:text-white transition-colors mb-2 w-fit px-2 py-1 rounded-md hover:bg-white/5"
      >
        <ChevronLeft size={20} />
        <span className="text-sm font-medium">Voltar</span>
      </button>
      <div className="container mx-auto px-3 rounded-lg shadow-xl bg-sidebar h-full overflow-y-auto">
        <div className="flex flex-col gap-6 md:flex-row md:gap-8 h-full">
          <div className="w-full md:w-1/4 shrink-0">
            <img
              src={data.poster}
              alt={data.name}
              className="w-full rounded-lg shadow-2xl border border-white/5 object-cover aspect-2/3"
            />
          </div>

          <div className="flex flex-col gap-6 flex-1">
            <AnimeDetails
              name={data.name}
              japaneseName={data.japaneseName}
              synopsis={data.synopsis}
            />
            <EpisodeList episodes={data.episodes} />
          </div>
        </div>
      </div>
    </div>
  );
};
