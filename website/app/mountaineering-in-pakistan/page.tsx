import { getAllPosts } from "@/lib/markdown";
import Link from "next/link";
import { ArrowRight, Mountain } from "lucide-react";

export const metadata = {
  title: "Mountaineering & Expeditions | Mountain Travels Pakistan",
  description:
    "Expedition services, peak guides, and mountaineering logistics in Pakistan.",
};

export default function MountaineeringHub() {
  const posts = getAllPosts();

  const mountaineeringPosts = posts.filter(
    (post) =>
      post.slug.includes("expedition") ||
      post.slug.includes("peak") ||
      post.slug.includes("climb") ||
      post.slug.includes("mountaineering") ||
      post.slug.includes("logistics") ||
      post.slug.includes("porter") ||
      post.slug.includes("base-camp"),
  );

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground pt-32 pb-24">
      {/* Hero Section */}
      <section className="relative pb-20 bg-background overflow-hidden">
        <div className="container mx-auto px-4 z-10 relative">
          <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tighter text-foreground max-w-4xl leading-tight">
            Mountaineering & Expeditions
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed max-w-3xl mt-6">
            Conquer the giants. Comprehensive guides and logistics for climbing
            the 8000m, 7000m, and 6000m peaks of Pakistan.
          </p>
        </div>
      </section>

      {/* Expeditions Listing */}
      <section className="py-16 border-t border-border bg-muted/10">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mountaineeringPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/${post.slug}`}
                className="group h-full flex"
              >
                <div className="bg-card border border-border p-8 hover:shadow-xl transition-all duration-300 h-full flex flex-col w-full">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform shrink-0">
                    <Mountain className="w-5 h-5" />
                  </div>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-muted-foreground font-light text-base leading-relaxed line-clamp-3 mb-8 flex-grow">
                    {post.content
                      .split("\n")
                      .find((line) => line.length > 50) ||
                      "View expedition and logistics details."}
                  </p>
                  <div className="pt-4 border-t border-border flex items-center text-primary font-medium text-base">
                    View Details{" "}
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
