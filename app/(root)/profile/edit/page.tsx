import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { ProfileForm } from "@/components/forms/profile-form";
import { getUserById } from "@/lib/actions/user.action";

const EditProfile = async () => {
  const { userId } = auth();
  if (!userId) return redirect("/404");
  const user = userId ? await getUserById({ clerkId: userId }) : undefined;

  return (
    <div className="text-primary w-full pt-3">
      <ProfileForm user={JSON.stringify(user)} />
    </div>
  );
};

export default EditProfile;
