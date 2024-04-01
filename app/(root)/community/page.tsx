import React from "react";

import UserCard from "@/components/community/user-card";
import Filter from "@/components/shared/filter";
import { getUsers } from "@/lib/actions/user.action";

const SORT_OPTIONS = ["Top Contributors", "New Users", "Old Users"];
const DEFAULT_SORT_OPTION = SORT_OPTIONS[0];

const Page = async () => {
  const users = await getUsers({});

  return (
    <div className="text-default border-default w-full">
      <header className="border-default w-full border-b">
        <Filter sortOptions={SORT_OPTIONS} defaultSortOption={DEFAULT_SORT_OPTION} />
      </header>
      <div className="flex flex-wrap justify-center gap-2 pt-4">
        <div className="border-default hover:bg-post w-40 cursor-pointer rounded border">
          {users?.users?.map((user) => <UserCard user={user} key={user._id} />)}
        </div>
      </div>
    </div>
  );
};

export default Page;
