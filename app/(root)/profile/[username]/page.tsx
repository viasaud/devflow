import { Metadata } from "next";

import ProfileCard from "@/components/profile/profile-card";
import UserActivityTabs from "@/components/profile/user-activity-tabs";

export let metadata: Metadata;

const ProfilePage = async ({
  params,
  searchParams,
}: {
  params: { username: string };
  searchParams: { [key: string]: string | undefined };
}) => {
  metadata = {
    title: `${params.username}`,
    description: "Profile page",
  };

  return (
    <div>
      <ProfileCard pathUsername={params.username} />
      <UserActivityTabs pathUsername={params.username} />
    </div>
  );
};

export default ProfilePage;
