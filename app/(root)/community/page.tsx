import { Metadata } from "next";

import UserCard from "@/components/community/user-card";
import Filter from "@/components/shared/filter";
import Pagination from "@/components/shared/pagination";
import { getUsers } from "@/lib/actions/user.action";
import { Author, SearchParamsProps } from "@/types";

export const metadata: Metadata = {
  title: "Community",
  description: "Community page",
};

const CommunityPage = async ({ searchParams }: SearchParamsProps) => {
  const users = await getUsers({
    filter: searchParams.filter,
    page: searchParams?.page ? +searchParams.page : 1,
  });

  return (
    <div className="text-primary border-primary w-full">
      <Filter type="community" />

      <div className="flex flex-wrap justify-center gap-2 pt-4">
        {users?.users.map((user: Author) => (
          <div
            className="border-primary hover:bg-hover w-40 cursor-pointer rounded border"
            key={user.username}
          >
            <UserCard user={user} />
          </div>
        ))}
      </div>
      {users?.users.length >= 40 && (
        <div className="my-10">
          <Pagination
            pageNumber={searchParams?.page ? +searchParams.page : 1}
            hasNext={users.hasNext}
          />
        </div>
      )}
    </div>
  );
};

export default CommunityPage;
