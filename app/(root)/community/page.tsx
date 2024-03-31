import React from "react";

import CommunityFilterContent from "@/components/community/community-filter-content";
import UserCard from "@/components/community/user-card";
import { getUsers } from "@/lib/actions/user.action";

const Page = async () => {
  const users = await getUsers({});

  return (
    <div className="text-default border-default w-full md:w-[42rem]">
      <header className="border-default w-full border-b">
        <CommunityFilterContent />
      </header>
      <div className="flex flex-wrap justify-center gap-2 pt-4">
        {users?.users?.map((user) => (
          <div
            key={user._id}
            className="border-default hover:bg-post w-52 border-collapse cursor-pointer rounded border"
          >
            <UserCard user={user} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
