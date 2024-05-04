import { Metadata } from "next";

import UserCard from "@/components/community/user-card";
import Filter from "@/components/shared/filter";
import { getUsers } from "@/lib/actions/user.action";
import { Author, SearchParamsProps } from "@/types";

export const metadata: Metadata = {
  title: "Community",
  description: "Community page",
};

const CommunityPage = async ({ searchParams }: SearchParamsProps) => {
  const users = await getUsers({ filter: searchParams.filter });
  console.log(searchParams.filter);

  return (
    <div className="text-primary border-primary w-full">
      <Filter type="community" />

      <div className="flex flex-wrap justify-center gap-2 pt-4">
        {users?.map((user: Author) => (
          <div
            className="border-primary hover:bg-hover w-40 cursor-pointer rounded border"
            key={user.username}
          >
            <UserCard user={user} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityPage;
