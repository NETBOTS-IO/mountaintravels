// app/blogs/[id]/page.tsx
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BASE_URL } from "@/app/Var"

// const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

async function getBlog(id: string) {
  try {
    const res = await fetch(`${BASE_URL}/api/blogs/${id}`, { cache: "no-store" })
    const data = await res.json()

    if (data.success && data.data) {
      return data.data
    }
  } catch (err) {
    console.error(err)
  }
  return null
}

export default async function BlogDetailPage({ params }: { params: { id: string } }) {
  const post = await getBlog(params.id)

  if (!post) {
    notFound()
  }

  return (
    <div className="flex flex-col">
<section className="relative h-[40vh] md:h-[50vh]">
  <Image
    src={`${BASE_URL}${post.coverImage}`}
    alt={post.title}
    fill
    priority
    className="object-cover"
  />
  {/* Lighter Overlay */}
  <div className="absolute inset-0 bg-black/20" />

  {/* Content */}
  <div className="absolute inset-x-0 bottom-6 flex justify-center">
    <div className="text-white text-center max-w-4xl px-4">
      <h1 className="text-2xl md:text-5xl font-bold mb-3 drop-shadow-md">
        {post.title}
      </h1>
      <p className="text-sm md:text-lg drop-shadow-sm">
        By {post.author?.name || "Unknown"} |{" "}
        {new Date(post.createdAt).toLocaleDateString("en-US", {
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
          <div className="max-w-3xl mx-auto prose prose-lg">
            {/* Render your editorJS content here instead of summary */}
            <p>{post.summary}</p>
          </div>
        </div>
      </section>

      {/* Back to Blogs */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <Link href="/blogs">
            <Button className="inline-flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog lists
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
