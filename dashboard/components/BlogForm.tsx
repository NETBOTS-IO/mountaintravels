"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { createBlog, updateBlog, type Blog } from "@/lib/data-utils"
import { toast } from "react-hot-toast"
import { FileText, User, Tag, ImageIcon } from "lucide-react"

interface BlogFormProps {
  blogId?: string
  initialData?: Blog
}

export default function BlogForm({ blogId, initialData }: BlogFormProps) {
  const [blog, setBlog] = useState<Omit<Blog, "id" | "date">>({
    title: "",
    author: "",
    content: "",
    image: "",
    tags: [],
  })
  const [tagInput, setTagInput] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (initialData) {
      setBlog(initialData)
    }
  }, [initialData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setBlog((prevBlog) => ({ ...prevBlog, [name]: value }))
  }

  const handleTagAdd = () => {
    if (tagInput.trim()) {
      setBlog((prevBlog) => ({
        ...prevBlog,
        tags: [...prevBlog.tags, tagInput.trim()],
      }))
      setTagInput("")
    }
  }

  const handleTagRemove = (tagToRemove: string) => {
    setBlog((prevBlog) => ({
      ...prevBlog,
      tags: prevBlog.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // In a real app, we would upload the file to a server
    // For this demo, we'll just use the file name
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const imageUrl = URL.createObjectURL(file)
      setBlog((prevBlog) => ({ ...prevBlog, image: imageUrl }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      if (blogId) {
        updateBlog(blogId, blog)
        toast.success("Blog updated successfully")
      } else {
        createBlog({
          ...blog,
          date: new Date().toISOString().split("T")[0],
        })
        toast.success("Blog added successfully")
      }
      router.push("/admin/blogs")
    } catch (error) {
      console.error("Error saving blog:", error)
      toast.error("Failed to save blog")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="title" className="flex items-center">
              <FileText className="mr-2 h-4 w-4" /> Title
            </Label>
            <Input
              id="title"
              name="title"
              value={blog.title}
              onChange={handleChange}
              required
              placeholder="Enter blog title"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="author" className="flex items-center">
              <User className="mr-2 h-4 w-4" /> Author
            </Label>
            <Input
              id="author"
              name="author"
              value={blog.author}
              onChange={handleChange}
              required
              placeholder="Enter author name"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="content" className="flex items-center">
              <FileText className="mr-2 h-4 w-4" /> Content
            </Label>
            <Textarea
              id="content"
              name="content"
              value={blog.content}
              onChange={handleChange}
              required
              rows={10}
              placeholder="Write your blog content here..."
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="image" className="flex items-center">
              <ImageIcon className="mr-2 h-4 w-4" /> Featured Image
            </Label>
            {blog.image && (
              <div className="mt-2 mb-4">
                <img
                  src={blog.image || "/placeholder.svg?height=300&width=600"}
                  alt="Blog featured image"
                  className="w-full max-h-48 object-cover rounded-md"
                />
              </div>
            )}
            <Input id="image" type="file" accept="image/*" onChange={handleImageUpload} className="mt-1" />
          </div>

          <div>
            <Label htmlFor="tags" className="flex items-center">
              <Tag className="mr-2 h-4 w-4" /> Tags
            </Label>
            <div className="flex flex-wrap gap-2 mt-2 mb-2">
              {blog.tags.map((tag, index) => (
                <div key={index} className="bg-primary/10 text-primary px-2 py-1 rounded-md flex items-center">
                  {tag}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-5 w-5 p-0 ml-1"
                    onClick={() => handleTagRemove(tag)}
                  >
                    ×
                  </Button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                id="tags"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Add a tag"
                className="flex-grow"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    handleTagAdd()
                  }
                }}
              />
              <Button type="button" onClick={handleTagAdd}>
                Add
              </Button>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => router.push("/admin/blogs")} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="bg-primary hover:bg-primary/90">
              {isSubmitting ? "Saving..." : blogId ? "Update Blog" : "Add Blog"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

