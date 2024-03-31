import React from "react";

import CommunityFilterContent from "@/components/community/community-filter-content";
import UserCard from "@/components/community/user-card";
import { getUsers } from "@/lib/actions/user.action";

const Page = async () => {
  const users = await getUsers({});

  return (
    <div className="text-default border-default w-full">
      <header className="border-default w-full border-b">
        <CommunityFilterContent />
      </header>
      <div className="flex flex-wrap justify-center gap-2 pt-4">
        <div className="border-default hover:bg-post w-40 border-collapse cursor-pointer rounded border">
          {users?.users?.map((user) => <UserCard user={user} key={user._id} />)}
        </div>
      </div>
    </div>
  );
};

export default Page;
