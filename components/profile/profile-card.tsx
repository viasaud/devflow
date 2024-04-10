import { redirect } from "next/navigation";

import { getUserInfo } from "@/lib/actions/user.action";

import EditProfileButton from "./edit-profile-button";
import ProfileInfo from "./profile-info";
import ProfileMedals from "./profile-medals";

const ProfileCard = async ({ pathUsername }: { pathUsername: string }) => {
  const userInfo = await getUserInfo({ username: pathUsername });
  if (!userInfo) return redirect("/404");

  return (
    <div className="border-primary my-4 rounded-md border p-5">
      <div className="flex-center flex-col gap-3.5">
        <ProfileInfo userInfo={userInfo} />

        <ProfileMedals />

        <EditProfileButton pathUsername={pathUsername} />
      </div>
    </div>
  );
};

export default ProfileCard;
