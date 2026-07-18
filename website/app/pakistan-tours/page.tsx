import { getAllPosts } from "@/lib/markdown";
import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";

export const metadata = {
  title: "Pakistan Tours | Mountain Travels Pakistan",
  description: "Explore our comprehensive Pakistan and Silk Road tour packages.",
};

export default function ToursHub() {
  const posts = getAllPosts();
  
  const tourPosts = posts.filter(post => 
    post.slug.includes("tour") || 
    post.slug.includes("adventure")
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-primary text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/images/pattern.svg')]"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Pakistan Tour Packages</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Discover the best of Pakistan, the Silk Road, and Central Asia with our expertly crafted tour itineraries.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tourPosts.map((post) => (
              <Link key={post.slug} href={`/${post.slug}`}>
                <div className="bg-white rounded-2xl shadow-sm border overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col group">
                  <div className="p-6 md:p-8 flex-grow">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                      <Compass className="w-6 h-6" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 line-clamp-3">
                      {post.content.split('\n').find(line => line.length > 50) || "View tour details and itinerary."}
                    </p>
                  </div>
                  <div className="px-6 py-4 bg-gray-50 border-t flex items-center text-primary font-medium">
                    View Tour <ArrowRight className="w-4 h-4 ml-2" />
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
