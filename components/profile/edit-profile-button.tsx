import { SignedIn } from "@clerk/nextjs";
import { RiPencilLine } from "@remixicon/react";
import Link from "next/link";
import React from "react";

import { SMALL_ICON_SIZE } from "@/constants/constants";
import { getMongoUser } from "@/lib/utils";

import { Button } from "../ui/button";

const EditProfileButton = async ({
  pathUsername,
}: {
  pathUsername: string;
}) => {
  const mongoUser = await getMongoUser();

  return (
    <SignedIn>
      {pathUsername === mongoUser?.username && (
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
