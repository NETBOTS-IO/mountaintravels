"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BASE_URL } from "@/app/Var";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

// const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

interface Blog {
  _id: string;
  title: string;
  coverImage: string;
  summary: string;
  category: string;
  createdAt: string;
  author: {
    name: string;
    designation: string;
    image: string;
  };
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${BASE_URL}/api/blogs`);
        const data = await res.json();

        if (data.success && data.data?.blogs) {
          setBlogs(data.data.blogs);
        } else {
          setError("Failed to fetch blogs");
        }
      } catch (err) {
        console.error(err);
        setError("Something went wrong while fetching blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return <p className="text-center py-12">Loading blogs...</p>;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center text-center min-h-[50vh]">
        <div className="bg-red-50 text-red-500 p-4 rounded-full mb-4">
          <AlertCircle className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">
          Blogs Unavailable
        </h2>
        <p className="text-slate-500 max-w-md mx-auto mb-6">
          We couldn't load the blogs at the moment. Please check your connection
          and try again later.
        </p>
        <Button
          onClick={() => window.location.reload()}
          variant="outline"
          className="rounded-full font-semibold px-6"
        >
          Refresh Page
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Our Blog</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((post) => (
          <Link key={post._id} href={`/blogs/${post._id}`}>
            <Card className="h-full hover:shadow-lg transition-shadow">
              <Image
                src={
                  post.coverImage?.startsWith("http")
                    ? post.coverImage
                    : `${BASE_URL}${post.coverImage || ""}`
                }
                alt={post.title || "Blog post"}
                width={400}
                height={200}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 mb-2">
                  By {post.author?.name || "Unknown"} |{" "}
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
                <p className="line-clamp-3">{post.summary}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
