const isProd = process.env.NODE_ENV === "production";
export const BASE_URL = isProd 
  ? "https://api.mountaintravels.site" 
  : "http://localhost:5000";
