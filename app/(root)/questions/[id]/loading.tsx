import { Skeleton } from "@/components/ui/skeleton";

const LoadingPage = () => {
  return (
    <div className="mt-2 flex flex-col space-y-2">
      <div className="space-y-5">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
      </div>
      <Skeleton className="h-96 w-full" />
      <Skeleton className="border-primary mb-2 h-6 w-full border-b" />
    </div>
  );
};

export default LoadingPage;
