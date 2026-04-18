import { Link } from "react-router-dom";

interface Episode {
  number: string | number;
}

interface EpisodeListProps {
  animeName: string;
  episodes: Episode[];
}

export const EpisodeList = ({ animeName, episodes }: EpisodeListProps) => {
  return (
    <div className="w-full flex flex-col  gap-4">
      <h3 className="text-xl font-semibold border-b border-white/10 pb-1">
        Episódios
      </h3>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-2 overflow-auto h-auto">
        {episodes.map((ep) => (
          <Link
            key={ep.number}
            to={`/watch/${animeName.toLowerCase().replace(/\s+/g, "-")}/${ep.number}`}
            className="flex items-center justify-center rounded-md py-2 px-1 text-sm transition-all bg-sidebar border border-sidebar-primary/30 text-zinc-300 hover:border-sidebar-primary hover:bg-sidebar-primary hover:text-white font-medium"
          >
            {ep.number}
          </Link>
        ))}
      </div>
    </div>
  );
};
