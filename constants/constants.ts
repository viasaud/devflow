import {
  RiHome6Line,
  RiGroupLine,
  RiSunLine,
  RiMoonLine,
  RiComputerLine,
  RiHome6Fill,
  RiGroupFill,
  RiSunFill,
  RiMoonFill,
  RiComputerFill,
  RiBookmarkLine,
  RiBookmarkFill,
  RiUser3Fill,
  RiUser3Line,
} from "@remixicon/react";

import { SidebarLink } from "@/types";

export const THEME_OPTIONS = [
  { value: "light", label: "Light", icon: RiSunLine, iconFilled: RiSunFill },
  { value: "dark", label: "Dark", icon: RiMoonLine, iconFilled: RiMoonFill },
  {
    value: "system",
    label: "System",
    icon: RiComputerLine,
    iconFilled: RiComputerFill,
  },
];
export const THEME_MENU_ICON_SIZE = 22;
export const QUESTION_ICON_SIZE = 18;
export const SMALL_ICON_SIZE = 16;

export const sidebarLinks: SidebarLink[] = [
  {
    route: "/",
    label: "Home",
    icon: RiHome6Line,
    iconFilled: RiHome6Fill,
  },
  {
    route: "/community",
    label: "Community",
    icon: RiGroupLine,
    iconFilled: RiGroupFill,
  },
  {
    route: "/bookmarks",
    label: "Bookmarks",
    icon: RiBookmarkLine,
    iconFilled: RiBookmarkFill,
  },
  // {
  //   route: "/jobs",
  //   label: "Find Jobs",
  //   icon: RiMenuSearchLine,
  //   iconFilled: RiMenuSearchFill,
  // },
  {
    route: "/profile",
    label: "Profile",
    icon: RiUser3Line,
    iconFilled: RiUser3Fill,
  },
];

export const BADGE_CRITERIA = {
  QUESTION_COUNT: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  ANSWER_COUNT: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  QUESTION_UPVOTES: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  ANSWER_UPVOTES: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  TOTAL_VIEWS: {
    BRONZE: 1000,
    SILVER: 10000,
    GOLD: 100000,
  },
};

export const getSortOptions = (type: string) => {
  let sortOptions;
  let defaultSortOption;
  switch (type) {
    case "bookmarks":
      sortOptions = ["Hot", "Latest", "Open"]; // "popular" has been removed
      defaultSortOption = sortOptions[2];
      break;
    case "community":
      sortOptions = ["Top Contributors", "Latest", "Oldest"];
      defaultSortOption = sortOptions[0];
      break;
    case "tags":
      sortOptions = ["Name", "Latest", "Oldest"]; // "popular" has been removed
      defaultSortOption = sortOptions[0];
      break;
    case "home":
      sortOptions = ["Hot", "Latest", "Open"]; // "popular" has been removed
      defaultSortOption = sortOptions[2];
      break;
  }

  return { sortOptions, defaultSortOption };
};
