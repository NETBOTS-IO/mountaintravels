import { getAllPosts } from "@/lib/markdown";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

export const metadata = {
  title: "Trekking in Pakistan | Mountain Travels Pakistan",
  description: "Major treks and trekking information in Pakistan.",
};

export default function TrekkingHub() {
  const posts = getAllPosts();
  
  const trekkingPosts = posts.filter(post => 
    post.slug.includes("trek")
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-primary text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/images/pattern.svg')]"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Trekking in Pakistan</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Experience the world's most spectacular trekking routes through the Karakoram, Himalaya, and Hindu Kush ranges.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trekkingPosts.map((post) => (
              <Link key={post.slug} href={`/${post.slug}`}>
                <div className="bg-white rounded-2xl shadow-sm border overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col group">
                  <div className="p-6 md:p-8 flex-grow">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 line-clamp-3">
                      {post.content.split('\n').find(line => line.length > 50) || "View trekking details."}
                    </p>
                  </div>
                  <div className="px-6 py-4 bg-gray-50 border-t flex items-center text-primary font-medium">
                    Explore Trek <ArrowRight className="w-4 h-4 ml-2" />
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
