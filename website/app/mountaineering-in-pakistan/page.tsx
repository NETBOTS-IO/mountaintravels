import { getAllPosts } from "@/lib/markdown";
import Link from "next/link";
import { ArrowRight, Mountain } from "lucide-react";

export const metadata = {
  title: "Mountaineering in Pakistan | Mountain Travels Pakistan",
  description: "Expedition services, peak guides, and mountaineering logistics in Pakistan.",
};

export default function MountaineeringHub() {
  const posts = getAllPosts();
  
  const mountaineeringPosts = posts.filter(post => 
    post.slug.includes("expedition") || 
    post.slug.includes("peak") || 
    post.slug.includes("climb") || 
    post.slug.includes("mountaineering") || 
    post.slug.includes("logistics") || 
    post.slug.includes("porter") || 
    post.slug.includes("base-camp")
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-primary text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/images/pattern.svg')]"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Mountaineering & Expeditions</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Conquer the giants. Comprehensive guides and logistics for climbing the 8000m, 7000m, and 6000m peaks of Pakistan.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mountaineeringPosts.map((post) => (
              <Link key={post.slug} href={`/${post.slug}`}>
                <div className="bg-white rounded-2xl shadow-sm border overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col group">
                  <div className="p-6 md:p-8 flex-grow">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                      <Mountain className="w-6 h-6" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 line-clamp-3">
                      {post.content.split('\n').find(line => line.length > 50) || "View expedition and logistics details."}
                    </p>
                  </div>
                  <div className="px-6 py-4 bg-gray-50 border-t flex items-center text-primary font-medium">
                    View Details <ArrowRight className="w-4 h-4 ml-2" />
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
