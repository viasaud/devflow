import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatAndDivideNumber = (num: number[]): string => {
  const length = num ? num.length : 0;
  if (length >= 1000000) {
    const formattedNum = (length / 1000000).toFixed(1);
    return `${formattedNum}M`;
  } else if (length >= 1000) {
    const formattedNum = (length / 1000).toFixed(1);
    return `${formattedNum}K`;
  } else {
    return length.toString();
  }
};

export function getTimeAgo(date: string) {
  const currentDate = new Date();
  currentDate.setHours(currentDate.getHours());
  const createdAt = new Date(date);
  const timeDiff = currentDate.getTime() - createdAt.getTime();
  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const years = Math.floor(days / 365);

  if (years > 0) {
    return `${years} year${years > 1 ? "s" : ""} ago`;
  } else if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else {
    return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
  }
}
