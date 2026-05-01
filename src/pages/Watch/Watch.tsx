import { VideoPlayer } from "./VideoPlayer/VideoPlayer";
import { useNavigate, useParams } from "react-router-dom";
import { useApi } from "../../hooks/useApi";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { AnimeInfos, AnimeWatchPromise } from "@/types/anime.type";
import { ChevronLeft } from "lucide-react";

interface Episode {
  title: string;
  number: string | number;
}

export const Watch = () => {
  const { anime, episode } = useParams<{ anime: string; episode: string }>();
  const navigate = useNavigate();
  const { data: episodeData, isLoading } = useApi<AnimeWatchPromise>(
    [`/animes/watch/${anime}/${episode}`],
    `/animes/watch/${anime}/${episode}`,
  );
  const { data: animeData, isLoading: infosIsLoading } = useApi<AnimeInfos>(
    [`/animes/infos/${anime}`],
    `/animes/infos/${anime}`,
  );

  const frameRef = useRef<HTMLIFrameElement>(null);

  if (isLoading || !episodeData || infosIsLoading) {
    return (
      <div className="container bg-sidebar m-2 p-2 rounded-md">
        <div className="w-full aspect-video bg-white/5 animate-pulse rounded-xl" />
      </div>
    );
  }

  return (
    <div className="container flex flex-col bg-sidebar m-2 p-2 rounded-md">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1 text-zinc-400 hover:text-white transition-colors mb-2 w-fit px-2 py-1 rounded-md hover:bg-white/5"
      >
        <ChevronLeft size={20} />
        <span className="text-sm font-medium">Voltar</span>
      </button>
      {episodeData?.animesFire?.videoUrl ? (
        <VideoPlayer
          src={episodeData.animesFire.videoUrl || frameRef.current?.src || ""}
          poster={animeData?.poster || ""}
          title={animeData?.name || ""}
          episode={episode || ""}
        />
      ) : episodeData?.animesOnline?.videoUrl ? (
        <iframe
          src={episodeData?.animesOnline?.videoUrl || ""}
          ref={frameRef}
          className="w-full h-full"
          frameBorder="0"
          scrolling="no"
          allowFullScreen
          allow="fullscreen"
        ></iframe>
      ) : (
        <div className=" w-full aspect-video bg-white/5 rounded-xl flex items-center justify-center flex-col gap-6 text-center text-zinc-400">
          <h1 className="text-9xl">:(</h1>
          <p>Parece que esse episódio ou anime não está disponível!</p>
        </div>
      )}

      <div className="mt-1 flex flex-col gap-4">
        <div className="w-full flex flex-col gap-4">
          <h3 className="text-xl font-semibold border-b border-white/10 py-2">
            Episódios
          </h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-2 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
            {animeData?.episodes.map((ep: Episode) => {
              const isCurrent = String(ep.number) === episode;
              return (
                <Link
                  key={ep.number}
                  to={`/watch/${ep.title
                    .toLowerCase()
                    .replace("(dublado)", "dublado")
                    .replace("episódio", "")
                    .replace(`${ep.number}`, "")
                    .replace(/[^a-z0-9\s]/g, " ")
                    .trim()
                    .replace(/\s+/g, "-")}/${ep.number}`}
                  className={`flex items-center justify-center rounded-md py-2 px-1 text-sm transition-all border font-medium ${
                    isCurrent
                      ? "bg-primary border-primary text-white shadow-lg shadow-primary/20"
                      : "bg-sidebar border-sidebar-primary/30 text-zinc-300 hover:border-sidebar-primary hover:bg-sidebar-primary hover:text-white"
                  }`}
                >
                  {ep.number}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
