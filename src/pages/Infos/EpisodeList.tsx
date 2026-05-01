import { Link, useParams } from "react-router-dom";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface Episode {
  title: any;
  number: string | number;
}

interface EpisodeListProps {
  episodes: Episode[];
}

export const EpisodeList = ({ episodes }: EpisodeListProps) => {
  const { anime } = useParams<{ anime: string }>();
  console.log(anime);

  return (
    <div className="w-full flex flex-col gap-4">
      <h3 className="text-xl font-semibold border-b border-white/10 pb-1">
        Episódios
      </h3>
      <ScrollArea className="max-h-155 pr-4">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-2">
          {episodes.map((ep) => (
            <Link
              key={ep.number}
              to={`/watch/${anime
                ?.toLowerCase()
                .toLowerCase()
                .replace("ª", "a")
                .replace(/\s+/g, "-")
                .replace("episódio", "")
                .replace(" - filme", "")
                .replace(`${ep.number}`, "")
                .replace(/[^a-z0-9\s]/g, " ")
                .trim()
                .replace(/\s+/g, "-")}/${ep.number}`}
              className="flex items-center justify-center rounded-md py-2 px-1 text-sm transition-all bg-sidebar border border-sidebar-primary/30 text-zinc-300 hover:border-sidebar-primary hover:bg-sidebar-primary hover:text-white font-medium"
            >
              {ep.number}
            </Link>
          ))}
        </div>
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    </div>
  );
};
