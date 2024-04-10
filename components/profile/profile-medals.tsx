import { RiMedalLine } from "@remixicon/react";

import { THEME_MENU_ICON_SIZE } from "@/constants/constants";

const ProfileMedals = () => {
  return (
    <div className="text-secondary flex-center w-full gap-4">
      <div className="flex-center gap-1">
        <RiMedalLine size={THEME_MENU_ICON_SIZE} className="text-orange-600" />
        <p className="font-geistMono text-sm">0</p>
      </div>
      <div className="flex-center gap-1">
        <RiMedalLine
          size={THEME_MENU_ICON_SIZE}
          className=" dark:text-zinc-200"
        />
        <p className="font-geistMono text-sm">0</p>
      </div>
      <div className="flex-center gap-1">
        <RiMedalLine size={THEME_MENU_ICON_SIZE} className="text-yellow-500" />
        <p className="font-geistMono text-sm">0</p>
      </div>
    </div>
  );
};

export default ProfileMedals;
