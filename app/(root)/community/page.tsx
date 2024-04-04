import UserCard from "@/components/community/user-card";
import Filter from "@/components/shared/filter";
import { getUsers } from "@/lib/actions/user.action";

const CommunityPage = async () => {
  const users = await getUsers({});

  return (
    <div className="text-default border-default w-full">
      <Filter type="community" />

      <div className="flex flex-wrap justify-center gap-2 pt-4">
        <div className="border-default hover:bg-post w-40 cursor-pointer rounded border">
          {users?.users?.map((user) => <UserCard user={user} key={user._id} />)}
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
