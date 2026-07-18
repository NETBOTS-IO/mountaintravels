import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getPostBySlug, getAllPosts } from "@/lib/markdown";
import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const post = getPostBySlug(params.slug);
  if (!post) {
    return { title: "Not Found" };
  }
  return {
    title: `${post.title} | Mountain Travels Pakistan`,
    description: `Read more about ${post.title}`,
  };
}

export default function DynamicMarkdownPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const isTour = post.slug.includes("tour") || post.slug.includes("adventure");
  const isTrek = post.slug.includes("trek");
  const isExpedition =
    post.slug.includes("expedition") ||
    post.slug.includes("peak") ||
    post.slug.includes("mountaineer");

  let backLink = "/";
  let backText = "Back to Home";

  if (isTour) {
    backLink = "/pakistan-tours";
    backText = "Back to Pakistan Tours";
  }
  if (isTrek) {
    backLink = "/trekking-in-pakistan";
    backText = "Back to Trekking";
  }
  if (isExpedition) {
    backLink = "/mountaineering-in-pakistan";
    backText = "Back to Expeditions";
  }
  if (post.slug.includes("guide")) {
    backLink = "/pakistan-travel-guide";
    backText = "Back to Travel Guides";
  }

  return (
    <article className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground pt-32 pb-24">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Navigation Breadcrumb */}
        <div className="mb-8 animate-fade-in">
          <Link
            href={backLink}
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary font-medium transition-colors gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            {backText}
          </Link>
        </div>

        {/* Article Container */}
        <div className="bg-card border border-border p-8 md:p-16 shadow-2xl relative overflow-hidden animate-slide-up">
          {/* Subtle Decorative Background Element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(circle_at_top_right,rgba(var(--primary-rgb),0.03),transparent)] pointer-events-none" />

          <header className="mb-12 border-b border-border pb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-6">
              <Compass className="w-3.5 h-3.5" />
              {isTour
                ? "Tour Package"
                : isTrek
                  ? "Trekking Route"
                  : isExpedition
                    ? "Mountaineering Expedition"
                    : "Travel Guide"}
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight tracking-tighter">
              {post.title}
            </h1>
          </header>

          {/* Enhanced Prose styling to perfectly reflect premium typography guidelines */}
          <div
            className="prose prose-lg dark:prose-invert max-w-none 
            prose-headings:font-display prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground
            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-3 prose-h2:border-b prose-h2:border-border
            prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
            prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:font-light prose-p:mb-6
            prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-6 prose-ul:text-muted-foreground prose-ul:font-light
            prose-ol:list-decimal prose-ol:pl-6 prose-ol:mb-6 prose-ol:text-muted-foreground prose-ol:font-light
            prose-li:mb-2
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-a:transition-all
            prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-foreground prose-blockquote:font-light
            prose-strong:font-bold prose-strong:text-foreground
            prose-table:w-full prose-table:border-collapse prose-table:my-8
            prose-th:border-b prose-th:border-border prose-th:p-4 prose-th:text-left prose-th:font-semibold prose-th:text-foreground
            prose-td:border-b prose-td:border-border prose-td:p-4 prose-td:text-muted-foreground prose-td:font-light"
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </article>
  );
}
