import ProfileCard from "@/components/profile/profile-card";
import UserActivityTabs from "@/components/profile/user-activity-tabs";

const ProfilePage = async ({
  params,
  searchParams,
}: {
  params: { username: string };
  searchParams: { [key: string]: string | undefined };
}) => {
  return (
    <div>
      <ProfileCard pathUsername={params.username} />
      <UserActivityTabs pathUsername={params.username} />
    </div>
  );
};

export default ProfilePage;
