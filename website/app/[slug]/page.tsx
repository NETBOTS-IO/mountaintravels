import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getPostBySlug, getAllPosts } from "@/lib/markdown";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) {
    return { title: 'Not Found' };
  }
  return {
    title: `${post.title} | Mountain Travels Pakistan`,
    description: `Read more about ${post.title}`,
  };
}

export default function DynamicMarkdownPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  // Determine which hub this might belong to (simple heuristic or can be customized)
  const isTour = post.slug.includes("tour") || post.slug.includes("adventure");
  const isTrek = post.slug.includes("trek");
  const isExpedition = post.slug.includes("expedition") || post.slug.includes("peak") || post.slug.includes("mountaineer");
  
  let backLink = "/";
  let backText = "Back to Home";

  if (isTour) { backLink = "/tours"; backText = "Back to Tours"; }
  if (isTrek) { backLink = "/trekking-in-pakistan"; backText = "Back to Trekking"; }
  if (isExpedition) { backLink = "/mountaineering-in-pakistan"; backText = "Back to Expeditions"; }
  if (post.slug.includes("guide")) { backLink = "/pakistan-travel-guide"; backText = "Back to Travel Guides"; }

  return (
    <article className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link 
          href={backLink}
          className="inline-flex items-center text-primary hover:text-primary/80 font-medium mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {backText}
        </Link>
        
        <div className="bg-white rounded-2xl shadow-sm border p-8 md:p-12">
          <header className="mb-10 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              {post.title}
            </h1>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          </header>
          
          <div className="prose prose-lg prose-slate max-w-none prose-headings:text-gray-900 prose-a:text-primary hover:prose-a:text-primary/80">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </article>
  );
}
