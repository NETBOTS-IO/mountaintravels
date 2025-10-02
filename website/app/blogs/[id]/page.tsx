// app/blogs/[id]/page.tsx
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BASE_URL } from "@/app/Var"

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
      {/* Banner Image with Blur Background */}
      <section className="relative h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden">
        {/* Blurred Background */}
        <Image
          src={`${BASE_URL}${post.coverImage}`}
          alt={`${post.title} background`}
          fill
          priority
          className="object-cover blur-lg scale-110"
        />

        {/* Main Image */}
        <div className="relative w-full h-full flex items-center justify-center">
          <Image
            src={`${BASE_URL}${post.coverImage}`}
            alt={post.title}
            fill
            priority
            className="object-contain relative z-10"
          />
        </div>
      </section>

      {/* Title & Meta Info */}
      <section className="mt-6 mb-4">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-2xl md:text-4xl font-bold mb-2">{post.title}</h1>
            <p className="text-sm md:text-base text-gray-600">
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
      <section className="mb-10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto prose prose-lg">
            {post.content?.blocks?.map((block: any) => {
              if (block.type === "paragraph") {
                return <p key={block.id}>{block.data.text}</p>
              }

              if (block.type === "header") {
                const Tag = `h${block.data.level}` as keyof JSX.IntrinsicElements
                return <Tag key={block.id}>{block.data.text}</Tag>
              }

              if (block.type === "list") {
                return block.data.style === "unordered" ? (
                  <ul key={block.id}>
                    {block.data.items.map((item: string, i: number) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <ol key={block.id}>
                    {block.data.items.map((item: string, i: number) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ol>
                )
              }

              return null
            })}
          </div>
        </div>
      </section>

      {/* Author Info (if exists) */}
      {post.author && (
        <section className="mb-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto bg-gray-50 p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-2">About the Author</h2>
              <p className="font-medium">{post.author.name}</p>
              {post.author.designation && (
                <p className="text-sm text-gray-600">{post.author.designation}</p>
              )}
              {post.author.description && (
                <p className="mt-2 text-gray-700">{post.author.description}</p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Back to Blogs */}
      <section className="pb-8">
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
