import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { BASE_URL } from "@/Var";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getImageUrl(url: string | null | undefined): string {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  if (url.startsWith("/uploads")) return `${BASE_URL}${url}`;
  return url;
}
