import {
  RiHome6Line,
  RiGroupLine,
  RiFileList2Line,
  RiMenuSearchLine,
  RiSunLine,
  RiMoonLine,
  RiComputerLine,
  RiHome6Fill,
  RiGroupFill,
  RiFileList2Fill,
  RiMenuSearchFill,
  RiSunFill,
  RiMoonFill,
  RiComputerFill,
} from "@remixicon/react";

import { SidebarLink } from "@/types";

export const SORT_OPTIONS = ["Best", "Hot", "New", "Open"];
export const DEFAULT_SORT_OPTION = SORT_OPTIONS[2];

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
export const DEFAULT_THEME_MENU_ICON_SIZE = 22;

export const DEFAULT_POST_ICON_SIZE = 18;

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
    route: "/collection",
    label: "Collections",
    icon: RiFileList2Line,
    iconFilled: RiFileList2Fill,
  },
  {
    route: "/jobs",
    label: "Find Jobs",
    icon: RiMenuSearchLine,
    iconFilled: RiMenuSearchFill,
  },
  // {
  //   route: "/tags",
  //   label: "Tags",
  //   icon: RiHashtag,
  //   iconFilled: RiHashtag,
  // },
  // {
  //   route: "/profile",
  //   label: "Profile",
  //   icon: RiUser3Line,
  //   iconFilled: RiUser3Fill,
  // },
  // {
  //   route: "/ask-question",
  //   label: "Ask a question",
  //   icon: RiQuestionLine,
  //   iconFilled: RiQuestionFill,
  // },
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
