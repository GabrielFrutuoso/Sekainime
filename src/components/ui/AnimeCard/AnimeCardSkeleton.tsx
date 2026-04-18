import { Skeleton } from "@/components/ui/skeleton";

export const AnimeCardSkeleton = () => {
  return (
    <div className="relative flex flex-col w-full bg-card rounded-md overflow-hidden shadow-md">
      <Skeleton className="w-full aspect-2/3" />
      <div className="absolute inset-0 flex items-end p-2">
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
};
