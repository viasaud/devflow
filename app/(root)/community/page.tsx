import UserCard from "@/components/community/user-card";
import Filter from "@/components/shared/filter";
import { getUsers } from "@/lib/actions/user.action";
import { Author } from "@/types";

const CommunityPage = async () => {
  const users = await getUsers({});

  return (
    <div className="text-default border-default w-full">
      <Filter type="community" />

      <div className="flex flex-wrap justify-center gap-2 pt-4">
        {users?.map((user: Author) => (
          <div
            className="border-default hover:bg-question w-40 cursor-pointer rounded border"
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
