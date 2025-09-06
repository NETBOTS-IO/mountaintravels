"use client";

import { JSX, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { ChevronLeft, Calendar, User, Tag, Edit, Clock, File } from "lucide-react";
import { getBlogById } from "@/lib/data-utils";
import { type Blog } from "@/lib/types";
import Link from "next/link";
import { BASE_URL } from "@/Var";
import Image from "next/image";
import React from "react";
import { OutputData } from "@editorjs/editorjs";

// Types for EditorJS content
interface EditorJSBlock {
  id: string;
  type: string;
  data: any;
}

interface HeaderData {
  text: string;
  level: number;
}

interface ParagraphData {
  text: string;
}

interface ImageData {
  file: {
    url: string;
  };
  caption?: string;
}

interface ListItem {
  content: string;
  meta?: {
    checked: boolean;
  };
}

interface ListData {
  style: "unordered" | "ordered" | "checklist";
  items: ListItem[];
}

// Utility function to render EditorJS content
const renderEditorJSContent = (content: OutputData | null): JSX.Element[] => {
  if (!content?.blocks) return [];

  const elements: JSX.Element[] = [];

  content.blocks.forEach((block, index) => {
    switch (block.type) {
      case "header": {
        const headerData = block.data as HeaderData;
        const level = Math.min(Math.max(headerData.level, 1), 6); // Ensure level is between 1-6
        const HeadingTag = `h${level}` as
          | "h1"
          | "h2"
          | "h3"
          | "h4"
          | "h5"
          | "h6";
        const headingClasses: Record<number, string> = {
          1: "text-3xl font-bold mb-6",
          2: "text-2xl font-bold mb-5",
          3: "text-xl font-bold mb-4",
          4: "text-lg font-bold mb-3",
          5: "text-base font-bold mb-3",
          6: "text-sm font-bold mb-2",
        };

        elements.push(
          React.createElement(
            HeadingTag,
            {
              key: index,
              className: headingClasses[level] || headingClasses[2],
            },
            headerData.text
          )
        );
        break;
      }

      case "paragraph": {
        const paragraphData = block.data as ParagraphData;
        elements.push(
          <p
            key={index}
            className="text-base text-gray-900 mb-4 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: paragraphData.text }}
          />
        );
        break;
      }

      case "image": {
        const imageData = block.data as ImageData;
        elements.push(
          <div
            key={index}
            className="flex flex-col items-center justify-center mb-6"
          >
            <Image
              src={imageData.file.url}
              alt={imageData.caption || "Blog image"}
              width={600}
              height={400}
              className="w-full max-w-2xl object-cover rounded-md"
            />
            {imageData.caption && (
              <span className="text-sm text-gray-600 mt-2 italic text-center">
                {imageData.caption}
              </span>
            )}
          </div>
        );
        break;
      }

      case "list": {
        const listData = block.data as ListData;
        if (listData.style === "unordered") {
          elements.push(
            <ul key={index} className="list-disc ml-6 mb-4 space-y-1">
              {listData.items.map((item: ListItem, i: number) => (
                <li key={i} className="text-base text-gray-900">
                  {item.content}
                </li>
              ))}
            </ul>
          );
        } else if (listData.style === "ordered") {
          elements.push(
            <ol key={index} className="list-decimal ml-6 mb-4 space-y-1">
              {listData.items.map((item: ListItem, i: number) => (
                <li key={i} className="text-base text-gray-900">
                  {item.content}
                </li>
              ))}
            </ol>
          );
        } else if (listData.style === "checklist") {
          elements.push(
            <div key={index} className="mb-4 space-y-2">
              {listData.items.map((item: ListItem, i: number) => (
                <div key={i} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={item.meta?.checked || false}
                    readOnly
                    className="mr-3 h-4 w-4"
                  />
                  <span className="text-base text-gray-900">
                    {item.content}
                  </span>
                </div>
              ))}
            </div>
          );
        }
        break;
      }

      default:
        break;
    }
  });

  return elements;
};

export default function ViewBlogPage() {
  const { id } = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fettchBlog = async () => {
      try {
        const fetchedBlog = await getBlogById(id as string);
        setBlog(fetchedBlog);
      } catch (error) {
        console.error("Failed to fetch blog:", error);
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };
    fettchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
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
              <h2 className="text-2xl font-bold text-gray-700">
                Blog not found
              </h2>
              <p className="text-gray-500 mt-2">
                The blog post you're looking for doesn't exist or has been
                removed.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
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
          {blog.coverImage && (
            <div className="w-full mb-6">
              <Image
                src={
                  blog.coverImage
                    ? `${BASE_URL}${blog.coverImage}`
                    : "/placeholder.svg?height=400&width=600"
                }
                alt={blog.title}
                width={600}
                height={400}
                className="w-full object-cover rounded-md"
              />
            </div>
          )}
          <CardTitle className="text-2xl md:text-3xl">{blog.title}</CardTitle>
          <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500 mb-4">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {new Date(blog.createdAt).toLocaleDateString()} |{" "}
              {new Date(blog.createdAt).toLocaleTimeString()}
            </div>
            <div className="flex items-center">
              <User className="h-4 w-4 mr-1" />
              {blog.author.name}
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {blog.readTime} min(s) read
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {/* Render EditorJS Content */}
          <div className="prose max-w-none">
            {renderEditorJSContent(blog.content)}
          </div>

          {/* Blog Summary */}
          {blog.summary && (
            <div className="mt-8 pt-4 border-t flex flex-col">
              <div className="flex items-center">
                <File className="h-4 w-4 mr-2" />
                <span className="text-sm text-gray-500">Summary</span>
              </div>
              <div className="mt-2 p-4 bg-gray-50 rounded-md">
                <p className="text-gray-700">{blog.summary}</p>
              </div>
            </div>
          )}

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="mt-8 pt-4 border-t flex items-center">
              <Tag className="h-4 w-4 mr-2 text-gray-500" />
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Blog Metadata */}
          <div className="mt-6 pt-4 border-t grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
            <div>
              <strong>Category:</strong> {blog.category}
            </div>
            <div>
              <strong>Status:</strong>
              <span
                className={`ml-2 px-2 py-1 rounded-full text-xs ${
                  blog.status === "published"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {blog.status}
              </span>
            </div>
            <div>
              <strong>Featured:</strong> {blog.isFeatured ? "Yes" : "No"}
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between border-t pt-6">
          <Button variant="outline" onClick={() => router.push("/admin/blogs")}>
            Back to List
          </Button>
          <Button
            onClick={() => router.push(`/admin/blogs/edit/${blog._id}`)}
            className="bg-primary hover:bg-primary/90"
          >
            <Edit className="mr-2 h-4 w-4" /> Edit Blog
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
