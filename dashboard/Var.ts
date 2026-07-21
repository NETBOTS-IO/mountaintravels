const isProd = process.env.NODE_ENV === "production";
export const BASE_URL = isProd
  ? "https://api.mountaintravels.com"
  : "http://localhost:5000";
