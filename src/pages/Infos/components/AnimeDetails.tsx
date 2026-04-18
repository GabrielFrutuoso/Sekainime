interface AnimeDetailsProps {
  name: string;
  japaneseName?: string;
  synopsis: string;
}

export const AnimeDetails = ({
  name,
  japaneseName,
  synopsis,
}: AnimeDetailsProps) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-sidebar-primary">
          {name}
        </h1>
        <h2 className="text-zinc-400 text-lg font-medium italic">
          {japaneseName}
        </h2>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-semibold border-b border-white/10 pb-1">
          Sinopse
        </h3>
        <p className="leading-relaxed text-zinc-300 text-sm md:text-base text-justify">
          {synopsis}
        </p>
      </div>
    </div>
  );
};
