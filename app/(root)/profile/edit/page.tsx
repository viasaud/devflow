import { redirect } from "next/navigation";

import { ProfileForm } from "@/components/forms/profile-form";
import { getMongoUser } from "@/lib/utils";

const EditProfile = async () => {
  const mongoUser = await getMongoUser();
  if (!mongoUser) return redirect("/404");

  return (
    <div className="text-primary w-full pt-7">
      <ProfileForm mongoUser={JSON.stringify(mongoUser)} />
    </div>
  );
};

export default EditProfile;
