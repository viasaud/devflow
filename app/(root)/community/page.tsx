import UserCard from "@/components/community/user-card";
import Filter from "@/components/shared/filter";
import { getUsers } from "@/lib/actions/user.action";

const CommunityPage = async () => {
  const users = await getUsers({});

  return (
    <div className="text-default border-default w-full">
      <Filter type="community" />

      <div className="flex flex-wrap justify-center gap-2 pt-4">
        {users?.users?.map((user) => (
          <div
            className="border-default hover:bg-post w-40 cursor-pointer rounded border"
            key={user._id}
          >
            <UserCard user={user} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityPage;
