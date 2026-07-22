import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://mountaintravels.com";

  // Fetch dynamic routes
  let tours = [];
  let destinations = [];
  let blogs = [];

  try {
    const isProd = process.env.NODE_ENV === "production";
    const apiBase =
      process.env.NEXT_PUBLIC_API_BASE_URL ||
      (isProd ? "https://api.mountaintravels.com" : "http://localhost:5000");

    // Fetch all tours
    const toursRes = await fetch(`${apiBase}/api/tours`, {
      next: { revalidate: 3600 },
    });
    if (toursRes.ok) {
      const parsed = await toursRes.json();
      const possibleData = parsed.data || parsed;
      tours = Array.isArray(possibleData) ? possibleData : [];
    }

    // Fetch all destinations
    const destRes = await fetch(`${apiBase}/api/popular`, {
      next: { revalidate: 3600 },
    });
    if (destRes.ok) {
      const parsed = await destRes.json();
      const possibleData = parsed.data || parsed;
      destinations = Array.isArray(possibleData) ? possibleData : [];
    }

    // Fetch all blogs
    const blogsRes = await fetch(`${apiBase}/api/blogs`, {
      next: { revalidate: 3600 },
    });
    if (blogsRes.ok) {
      const parsed = await blogsRes.json();
      const possibleData = parsed.data || parsed;
      blogs = Array.isArray(possibleData) ? possibleData : [];
    }
  } catch (error) {
    console.error("Error fetching sitemap data:", error);
  }

  const tourUrls = tours.map((tour: any) => ({
    url: `${baseUrl}/tours/detail/${tour.id}`, // using id as slug based on current routes
    lastModified: tour.updatedAt || new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const destUrls = destinations.map((dest: any) => ({
    url: `${baseUrl}/destinations/${dest.id}`,
    lastModified: dest.updatedAt || new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const blogUrls = blogs.map((blog: any) => ({
    url: `${baseUrl}/blogs/${blog.id}`,
    lastModified: blog.updatedAt || new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tours`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...tourUrls,
    ...destUrls,
    ...blogUrls,
  ];
}
