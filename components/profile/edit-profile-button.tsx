import { SignedIn } from "@clerk/nextjs";
import { RiPencilLine } from "@remixicon/react";
import Link from "next/link";

import { SMALL_ICON_SIZE } from "@/constants/constants";

import { Button } from "../ui/button";

const EditProfileButton = async ({
  isUserProfile,
}: {
  isUserProfile: boolean;
}) => {
  return (
    <SignedIn>
      {isUserProfile && (
        <Link href="/profile/edit" className="flex-center">
          <Button variant={"outline"}>
            <RiPencilLine size={SMALL_ICON_SIZE} />
            Edit Profile
          </Button>
        </Link>
      )}
    </SignedIn>
  );
};

export default EditProfileButton;
