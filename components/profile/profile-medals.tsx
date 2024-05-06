import { RiAwardLine } from "@remixicon/react";

import { THEME_MENU_ICON_SIZE } from "@/constants/constants";

const ProfileMedals = ({ reputation }: { reputation: number }) => {
  return (
    <div className="text-secondary flex-center w-full gap-4">
      <div className="flex-center gap-1">
        <RiAwardLine
          size={THEME_MENU_ICON_SIZE}
          className="text-yellow-600 dark:text-yellow-500"
        />
        <p className="font-geistMono text-sm">{reputation}</p>
      </div>
    </div>
  );
};

export default ProfileMedals;
