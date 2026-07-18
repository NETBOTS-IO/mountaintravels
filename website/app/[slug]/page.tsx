import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getPostBySlug, getAllPosts } from "@/lib/markdown";
import Link from "next/link";
import { ArrowLeft, Compass, Home, ChevronRight } from "lucide-react";

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
  let breadcrumbCategory = "Guide";

  if (isTour) {
    backLink = "/pakistan-tours";
    backText = "Back to Pakistan Tours";
    breadcrumbCategory = "Tours";
  }
  if (isTrek) {
    backLink = "/trekking-in-pakistan";
    backText = "Back to Trekking";
    breadcrumbCategory = "Trekking";
  }
  if (isExpedition) {
    backLink = "/mountaineering-in-pakistan";
    backText = "Back to Expeditions";
    breadcrumbCategory = "Expeditions";
  }
  if (post.slug.includes("guide")) {
    backLink = "/pakistan-travel-guide";
    backText = "Back to Travel Guides";
    breadcrumbCategory = "Travel Guide";
  }

  return (
    <article className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Breadcrumbs */}
        <div className="py-4 mb-4">
          <nav className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <Link
              href="/"
              className="hover:text-primary flex items-center gap-1 transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              Home
            </Link>
            <ChevronRight className="w-3 h-3 shrink-0" />
            <Link
              href={backLink}
              className="hover:text-primary transition-colors"
            >
              {breadcrumbCategory}
            </Link>
            <ChevronRight className="w-3 h-3 shrink-0" />
            <span className="text-foreground font-semibold truncate max-w-[200px]">
              {post.title}
            </span>
          </nav>
        </div>

        {/* Back Link */}
        <div className="mb-6">
          <Link
            href={backLink}
            className="inline-flex items-center text-xs text-muted-foreground hover:text-primary font-semibold transition-colors gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            {backText}
          </Link>
        </div>

        {/* Article Container */}
        <div className="bg-card border border-border p-6 md:p-10 shadow-md relative overflow-hidden rounded-lg">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(circle_at_top_right,rgba(var(--primary-rgb),0.02),transparent)] pointer-events-none" />

          <header className="mb-8 border-b border-border pb-6">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
              <Compass className="w-3.5 h-3.5" />
              {isTour
                ? "Tour Package"
                : isTrek
                  ? "Trekking Route"
                  : isExpedition
                    ? "Mountaineering Expedition"
                    : "Travel Guide"}
            </div>

            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground leading-tight tracking-tight">
              {post.title}
            </h1>
          </header>

          <div
            className="prose prose-sm dark:prose-invert max-w-none 
            prose-headings:font-display prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground
            prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h2:border-border
            prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
            prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:font-light prose-p:mb-4
            prose-ul:list-disc prose-ul:pl-5 prose-ul:mb-4 prose-ul:text-muted-foreground prose-ul:font-light
            prose-ol:list-decimal prose-ol:pl-5 prose-ol:mb-4 prose-ol:text-muted-foreground prose-ol:font-light
            prose-li:mb-1.5
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-a:transition-all
            prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-foreground prose-blockquote:font-light
            prose-strong:font-bold prose-strong:text-foreground
            prose-table:w-full prose-table:border-collapse prose-table:my-6
            prose-th:border-b prose-th:border-border prose-th:p-3 prose-th:text-left prose-th:font-semibold prose-th:text-foreground text-xs uppercase tracking-wider
            prose-td:border-b prose-td:border-border prose-td:p-3 prose-td:text-muted-foreground prose-td:font-light text-sm"
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
