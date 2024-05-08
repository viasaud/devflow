import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import { redirect } from "next/navigation";

import ProfileCard from "@/components/profile/profile-card";
import UserActivityTabs from "@/components/profile/user-activity-tabs";
import { getUserData } from "@/lib/actions/user.action";

export let metadata: Metadata;

const ProfilePage = async ({
  params,
  searchParams,
}: {
  params: { username: string };
  searchParams: { [key: string]: string | undefined };
}) => {
  const { userId } = auth();
  const user = await getUserData({ username: params.username });
  if (!user) return redirect("/404");
  const isUserProfile = userId === user?.user.clerkId;

  metadata = {
    title: `${params.username}`,
    description: "Profile page",
  };

  return (
    <div>
      <ProfileCard user={user} isUserProfile={isUserProfile} />
      <UserActivityTabs
        username={params.username}
        page={searchParams.page ? +searchParams.page : 1}
      />
    </div>
  );
};

export default ProfilePage;
