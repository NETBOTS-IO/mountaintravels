"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { ChevronLeft, Calendar, User, Tag, Edit } from "lucide-react"
import { getBlogById, type Blog } from "@/lib/data-utils"
import Link from "next/link"

export default function ViewBlogPage() {
  const { id } = useParams()
  const router = useRouter()
  const [blog, setBlog] = useState<Blog | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      const fetchedBlog = getBlogById(id as string)
      setBlog(fetchedBlog || null)
      setLoading(false)
    }
  }, [id])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  if (!blog) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Link href="/admin/blogs">
          <Button variant="outline" className="mb-4">
            <ChevronLeft className="mr-2 h-4 w-4" /> Back to Blogs
          </Button>
        </Link>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <h2 className="text-2xl font-bold text-gray-700">Blog not found</h2>
              <p className="text-gray-500 mt-2">The blog post you're looking for doesn't exist or has been removed.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/admin/blogs">
        <Button variant="outline" className="mb-4">
          <ChevronLeft className="mr-2 h-4 w-4" /> Back to Blogs
        </Button>
      </Link>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl">{blog.title}</CardTitle>
          <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {blog.date}
            </div>
            <div className="flex items-center">
              <User className="h-4 w-4 mr-1" />
              {blog.author}
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {blog.image && (
            <div className="mb-6">
              <img
                src={blog.image || "/placeholder.svg?height=400&width=800"}
                alt={blog.title}
                className="w-full max-h-96 object-cover rounded-md"
              />
            </div>
          )}

          <div className="prose max-w-none">
            <div className="whitespace-pre-line">{blog.content}</div>
          </div>

          {blog.tags && blog.tags.length > 0 && (
            <div className="mt-6 flex items-center">
              <Tag className="h-4 w-4 mr-2 text-gray-500" />
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag, index) => (
                  <span key={index} className="bg-primary/10 text-primary px-2 py-1 rounded-md text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-between border-t pt-6">
          <Button variant="outline" onClick={() => router.push("/admin/blogs")}>
            Back to List
          </Button>
          <Button
            onClick={() => router.push(`/admin/blogs/edit/${blog.id}`)}
            className="bg-primary hover:bg-primary/90"
          >
            <Edit className="mr-2 h-4 w-4" /> Edit Blog
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

