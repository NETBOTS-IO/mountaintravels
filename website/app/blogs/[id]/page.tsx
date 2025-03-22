import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { blogPosts } from "@/data/blogContent"

export default function BlogDetailPage({ params }) {
  const post = blogPosts.find((post) => post.id === params.id)

  if (!post) {
    notFound()
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[50vh]">
        <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-center max-w-4xl px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{post.title}</h1>
            <p className="text-xl mb-4">
              By {post.author} |{" "}
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="prose prose-lg" dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
        </div>
      </section>

      {/* Back to Blogs */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <Link href="/blogs">
            <Button className="inline-flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blogs
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

