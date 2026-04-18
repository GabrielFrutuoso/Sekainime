import { Skeleton } from "@/components/ui/skeleton";

export const InfosSkeleton = () => {
  return (
    <div className="min-h-screen w-full flex flex-col p-3">
      <div className="container mx-auto p-4 bg-sidebar rounded-lg animate-pulse">
        <div className="flex flex-col gap-6 md:flex-row md:gap-8">
          <Skeleton className="w-full md:w-64 aspect-2/3 rounded-lg" />
          <div className="flex-1 space-y-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
