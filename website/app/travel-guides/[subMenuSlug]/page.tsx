import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Compass, Calendar, Clock } from "lucide-react";
import { BASE_URL } from "@/app/Var";

// Function to unslugify for display purposes
function unslugify(slug: string) {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subMenuSlug: string }>;
}) {
  const { subMenuSlug } = await params;
  const title = unslugify(subMenuSlug);
  return {
    title: `${title} | Mountain Travels Pakistan`,
    description: `Comprehensive travel guides and blogs for ${title} in Pakistan.`,
  };
}

async function getTravelGuides(subMenuSlug: string) {
  try {
    const res = await fetch(
      `${BASE_URL}/api/blogs?category=Travel Guide&subMenuSlug=${subMenuSlug}`,
      {
        cache: "no-store",
      },
    );
    const data = await res.json();
    if (data.success && data.data?.blogs) {
      return data.data.blogs;
    }
    return [];
  } catch (err) {
    console.error("Failed to fetch travel guides:", err);
    return [];
  }
}

export default async function DynamicTravelGuideHub({
  params,
}: {
  params: Promise<{ subMenuSlug: string }>;
}) {
  const { subMenuSlug } = await params;
  const guidePosts = await getTravelGuides(subMenuSlug);
  const displayName = unslugify(subMenuSlug);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground pt-32 pb-24">
      {/* Hero Section */}
      <section className="relative pb-20 bg-background overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

        <div className="container mx-auto px-4 z-10 relative text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold uppercase tracking-wider mb-6">
            <Compass className="w-4 h-4" /> Discover Pakistan
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tighter text-foreground max-w-4xl mx-auto leading-tight">
            {displayName}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed max-w-3xl mx-auto mt-6">
            Explore our comprehensive guides specifically curated for{" "}
            {displayName}.
          </p>
        </div>
      </section>

      {/* Guides Listing */}
      <section className="py-20 border-t border-border bg-muted/30">
        <div className="container mx-auto px-4 max-w-7xl">
          {guidePosts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground">
                No guides found in this category at the moment. Please check
                back later.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {guidePosts.map((post: any) => (
                <Link
                  key={post._id}
                  href={`/blogs/${post._id}`}
                  className="group flex flex-col bg-card rounded-xl border border-border overflow-hidden hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 transform hover:-translate-y-1"
                >
                  {/* Image Container */}
                  <div className="relative w-full h-32 md:h-40 overflow-hidden bg-muted shrink-0">
                    <Image
                      src={
                        post.coverImage?.startsWith("http")
                          ? post.coverImage
                          : `${BASE_URL}${post.coverImage}`
                      }
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-4 left-4 flex gap-2">
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-semibold uppercase tracking-wider rounded-full">
                        Guide
                      </span>
                      {post.readTime && (
                        <span className="flex items-center gap-1 px-3 py-1 bg-black/40 backdrop-blur-md text-white text-xs font-medium rounded-full">
                          <Clock className="w-3 h-3" /> {post.readTime} min read
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Content Container */}
                  <div className="p-4 md:p-5 flex flex-col flex-grow relative">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>
                        {new Date(post.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>

                    <h2 className="font-display text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                      {post.title}
                    </h2>

                    <p className="text-muted-foreground font-light text-sm leading-relaxed line-clamp-2 mb-6 flex-grow">
                      {post.summary}
                    </p>

                    <div className="pt-4 border-t border-border flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs uppercase">
                          {post.author?.name?.charAt(0) || "M"}
                        </div>
                        <span className="text-sm font-medium text-foreground">
                          {post.author?.name || "Travel Expert"}
                        </span>
                      </div>

                      <div className="flex items-center text-primary font-medium text-sm group-hover:bg-primary/5 px-3 py-1.5 rounded-full transition-colors">
                        Read Guide
                        <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
