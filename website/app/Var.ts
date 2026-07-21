// Environment-aware BASE_URL
const isProd = process.env.NODE_ENV === "production";
export const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  (isProd ? "https://api.mountaintravels.site" : "http://localhost:5000");
