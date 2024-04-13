import { Skeleton } from "@/components/ui/skeleton";

const LoadingPage = () => {
  return (
    <main className="text-primary border-primary w-full">
      <div className="border-primary w-full border-b">
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="flex flex-wrap justify-center gap-2 pt-4">
        {Array.from({ length: 24 }, (_, num) => (
          <div
            className="border-primary hover:bg-hover h-60 w-40 cursor-pointer rounded border"
            key={num}
          >
            <Skeleton className="size-full" />
          </div>
        ))}
      </div>
    </main>
  );
};

export default LoadingPage;
