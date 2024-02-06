import { SidebarLink } from "@/types";
import {
  RiHome6Line,
  RiGroupLine,
  RiFileList2Line,
  RiMenuSearchLine,
  RiHashtag,
  RiUser3Line,
  RiQuestionLine,
  RiSunLine,
  RiMoonLine,
  RiComputerLine,
} from "@remixicon/react";

export const themes = [
  { value: "light", label: "Light", icon: RiSunLine },
  { value: "dark", label: "Dark", icon: RiMoonLine },
  { value: "system", label: "System", icon: RiComputerLine },
];

export const sidebarLinks: SidebarLink[] = [
  {
    route: "/",
    label: "Home",
    icon: RiHome6Line,
  },
  {
    route: "/community",
    label: "Community",
    icon: RiGroupLine,
  },
  {
    route: "/collection",
    label: "Collections",
    icon: RiFileList2Line,
  },
  {
    route: "/jobs",
    label: "Find Jobs",
    icon: RiMenuSearchLine,
  },
  {
    route: "/tags",
    label: "Tags",
    icon: RiHashtag,
  },
  {
    route: "/profile",
    label: "Profile",
    icon: RiUser3Line,
  },
  {
    route: "/ask-question",
    label: "Ask a question",
    icon: RiQuestionLine,
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
