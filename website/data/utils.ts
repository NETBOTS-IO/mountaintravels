// lib/data-utils.ts
import { BASE_URL } from "@/app/Var";

export async function getPublicTravelTips() {
    try {
      const res = await fetch(`${BASE_URL}/api/tips/` , {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store", // make sure it's always fresh
      });
  
      if (!res.ok) throw new Error("Failed to fetch travel tips");
  
      const data = await res.json();
      return data.data; // ✅ because your response has { success, data }
    } catch (error) {
      console.error("Error fetching travel tips:", error);
      return [];
    }
  }
  export async function getPopularDestinations() {
    try {
      const res = await fetch(`${BASE_URL}/api/popular/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store", // make sure it's always fresh
      });
  
      if (!res.ok) throw new Error("Failed to fetch travel tips");
  
      const data = await res.json();
      return data.data; // ✅ because your response has { success, data }
    } catch (error) {
      console.error("Error fetching travel tips:", error);
      return [];
    }
  }
  export async function getTrustedCompaniesPublic() {
    try {
      const res = await fetch(`${BASE_URL}/api/trusted/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });
  
      if (!res.ok) throw new Error("Failed to fetch trusted companies");
  
      const data = await res.json();
      return data.data; // ✅ { success, data }
    } catch (error) {
      console.error("Error fetching trusted companies:", error);
      return [];
    }
  }
  