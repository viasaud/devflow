import { Skeleton } from "@/components/ui/skeleton";

const LoadingPage = () => {
  return (
    <main className="text-primary border-primary w-full">
      <div className="border-primary my-4 h-[25rem] w-full rounded-md border">
        <Skeleton className="size-full" />
      </div>

      <div className="border-primary mx-auto mb-5 w-60 rounded-md border">
        <Skeleton className="h-10 w-full" />
      </div>

      {Array.from({ length: 10 }, (_, num) => (
        <div
          className="border-primary text-primary hover:bg-question-hover border-b py-0.5"
          key={num}
        >
          <Skeleton className="h-36 w-full" />
        </div>
      ))}
    </main>
  );
};

export default LoadingPage;
