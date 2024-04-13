import { Skeleton } from "@/components/ui/skeleton";

const LoadingPage = () => {
  return (
    <main className="text-primary border-primary w-full">
      <div className="border-primary w-full border-b">
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
