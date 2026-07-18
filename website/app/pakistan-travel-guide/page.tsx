import { getAllPosts } from "@/lib/markdown";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";

export const metadata = {
  title: "Pakistan Travel Guide | Mountain Travels Pakistan",
  description:
    "Comprehensive travel guides for all major destinations and seasons in Pakistan.",
};

export default function TravelGuideHub() {
  const posts = getAllPosts();

  // Filter for travel guides
  const guidePosts = posts.filter(
    (post) =>
      post.slug.includes("guide") ||
      post.slug.includes("best-time") ||
      post.slug.includes("safe") ||
      post.slug.includes("heritage"),
  );

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground pt-32 pb-24">
      {/* Hero Section */}
      <section className="relative pb-20 bg-background overflow-hidden">
        <div className="container mx-auto px-4 z-10 relative">
          <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tighter text-foreground max-w-4xl leading-tight">
            Pakistan Travel Guide
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed max-w-3xl mt-6">
            Everything you need to know to plan your ultimate journey through
            Pakistan. Explore our comprehensive destination and seasonal guides.
          </p>
        </div>
      </section>

      {/* Guides Listing */}
      <section className="py-16 border-t border-border bg-muted/10">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {guidePosts.map((post) => (
              <Link
                key={post.slug}
                href={`/${post.slug}`}
                className="group h-full flex"
              >
                <div className="bg-card border border-border p-8 hover:shadow-xl transition-all duration-300 h-full flex flex-col w-full">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform shrink-0">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-muted-foreground font-light text-base leading-relaxed line-clamp-3 mb-8 flex-grow">
                    {post.content
                      .split("\n")
                      .find((line) => line.length > 50) ||
                      "Read our comprehensive guide to learn more."}
                  </p>
                  <div className="pt-4 border-t border-border flex items-center text-primary font-medium text-base">
                    Read Guide{" "}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
