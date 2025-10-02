"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import ImageTool from "@editorjs/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { createBlog, updateBlog } from "@/lib/data-utils";
import { type Blog } from "@/lib/types";
import { toast } from "react-hot-toast";
import {
  FileText,
  User,
  Tag,
  ImageIcon,
  X,
  ClipboardList,
  FileChartColumn,
} from "lucide-react";
import axios from "axios";
import { BASE_URL } from "@/Var";

interface BlogFormProps {
  blogId?: string;
  initialData?: Blog;
}

type BlogStatus = "draft" | "published";
type BlogCategory =
  | "Select a category"
  | "Destinations"
  | "Travel Tips"
  | "Cultural Guides"
  | "Adventure"
  | "Food & Places"
  | "Luxury"
  | "Trekking"
  | "Wildlife"
    "Culture"
    "Others" ;

interface BlogFormState {
  title: string;
  author: {
    name: string;
    designation: string;
    image: File | string;
    description: string;
  };
  content: OutputData;
  coverImage: File | string;
  tags: string[];
  category: BlogCategory;
  isFeatured: boolean;
  status: BlogStatus;
  summary: string;
  readTime: number;
}

export default function BlogForm({ blogId, initialData }: BlogFormProps) {
  const editorInstance = useRef<EditorJS | null>(null);
  const editorRef = useRef<HTMLDivElement | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [dataReady, setDataReady] = useState(false);
  const router = useRouter();

  const [blog, setBlog] = useState<BlogFormState>({
    title: "",
    author: {
      name: "",
      designation: "",
      image: "",
      description: "",
    },
    content: {
      time: Date.now(),
      blocks: [],
      version: "2.27.0",
    },
    coverImage: "",
    tags: [],
    category: "Select a category",
    isFeatured: false,
    status: "draft",
    summary: "",
    readTime: 0,
  });

  const BLOG_CATEGORIES: BlogCategory[] = [
    "Destinations",
    "Travel Tips",
    "Cultural Guides",
    "Adventure",
    "Food & Places",
    "Luxury",
    "Trekking",
    "Wildlife",
    "Culture",
    "Others" ,

  ];

  // Set initial data if present
  useEffect(() => {
    if (initialData) {
      setBlog({
        ...initialData,
        content: initialData.content ?? {
          time: Date.now(),
          blocks: [],
          version: "2.27.0",
        },
        coverImage: initialData.coverImage || "",
      });

      if (typeof initialData.coverImage === "string") {
        setImagePreview(`${BASE_URL}${initialData.coverImage}`);
      }
      setDataReady(true);
    } else if (!blogId) {
      setDataReady(true);
    }
  }, [initialData, blogId]);

  // Initialize Editor.js
  const initEditor = useCallback(() => {
    if (!editorRef.current || editorInstance.current) return;

    if (blogId && !initialData) return;

    const editor = new EditorJS({
      holder: editorRef.current,
      autofocus: true,
      tools: {
        header: {
          class: Header as any,
          config: {
            placeholder: "Enter a header",
            levels: [1, 2, 3, 4, 5, 6],
            defaultLevel: 2,
          },
        },
        list: {
          class: List as any,
          inlineToolbar: true,
        },
        image: {
          class: ImageTool as any,
          config: {
            uploader: {
              async uploadByFile(file: File) {
                const formData = new FormData();
                formData.append("image", file);

                try {
                  const res = await axios.post(
                    `${BASE_URL}/api/blogs/upload-editor-image`,
                    formData,
                    { headers: { "Content-Type": "multipart/form-data" } }
                  );

                  if (res.data.success && res.data.file?.url) {
                    return {
                      success: 1,
                      file: {
                        url: res.data.file.url.startsWith("http")
                          ? res.data.file.url
                          : `${BASE_URL}${res.data.file.url}`,
                      },
                    };
                  }
                  throw new Error(res.data.message || "Upload failed");
                } catch (err) {
                  console.error("Image upload failed:", err);
                  return { success: 0 };
                }
              },
            },
          },
        },
      },
      data: blog.content ?? {
        time: Date.now(),
        blocks: [],
        version: "2.27.0",
      },
      onReady: () => {
        console.log("Editor.js is ready");
      },
    });

    editorInstance.current = editor;

    return () => {
      editorInstance.current?.destroy?.();
      editorInstance.current = null;
    };
  }, [blog.content]);

  useEffect(() => {
    if (editorRef.current && dataReady) {
      initEditor();
    }
  }, [initEditor, dataReady]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const content = await editorInstance.current?.save();
      const hasValidContent = content?.blocks?.some((block) => {
        if (block.type === "paragraph") return block.data?.text?.trim();
        if (block.type === "header")
          return block.data?.text?.trim() || block.data?.level;
        if (block.type === "image") return block.data?.file?.url;
        return false;
      });

      if (!hasValidContent) {
        throw new Error("Please add some text or an image to your blog post");
      }

      const formData = new FormData();
      const blogPayload = {
        title: blog.title.trim(),
        author: {
          name: blog.author.name.trim(),
          designation: blog.author.designation.trim(),
          description: blog.author.description.trim(),
        },
        summary: blog.summary.trim(),
        category: blog.category,
        status: blog.status,
        isFeatured: blog.isFeatured,
        tags: blog.tags.filter((tag) => tag.trim()),
        content,
      };

      // Add blogData as a string
      formData.append("blogData", JSON.stringify(blogPayload));

      // Add cover image if it's a File
      if (blog.coverImage instanceof File) {
        if (blog.coverImage.size === 0) {
          throw new Error("Cover image file is empty");
        }
        formData.append("coverImage", blog.coverImage, blog.coverImage.name);
      }

      if (blog.author.image instanceof File) {
        formData.append("authorImage", blog.author.image, blog.author.image.name);
      }

      const response = blogId
        ? await updateBlog(blogId, formData)
        : await createBlog(formData);

      if (response.success) {
        toast.success(`Blog ${blogId ? "updated" : "created"} successfully`);
        router.push("/admin/blogs");
      } else {
        throw new Error(response.message || "Request failed");
      }
    } catch (error: any) {
      console.error("Submission error:", error);
      toast.error(error.message || "Failed to save blog");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setBlog((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagAdd = () => {
    if (tagInput.trim()) {
      setBlog((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  const handleTagRemove = (tagToRemove: string) => {
    setBlog((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      if (file.size === 0) {
        toast.error("Selected cover image is empty");
        return;
      }
      if (!/image\/(jpeg|jpg|png|gif)/.test(file.type)) {
        toast.error("Only JPEG, JPG, PNG, or GIF files are allowed");
        return;
      }
      setBlog((prev) => ({ ...prev, coverImage: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Field */}
          <div>
            <Label htmlFor="title" className="flex items-center ml-1 mb-2">
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

          {/* Author Field */}
          <div className="space-y-4">
            <Label className="flex items-center ml-1 mb-2">
              <User className="mr-2 h-4 w-4" /> Author
            </Label>

            {/* Author Name */}
            <Input
              id="author-name"
              name="author.name"
              value={blog.author.name}
              onChange={(e) =>
                setBlog((prev) => ({
                  ...prev,
                  author: { ...prev.author, name: e.target.value },
                }))
              }
              required
              placeholder="Enter author name"
              className="mt-1"
            />

            {/* Designation */}
            <Input
              id="author-designation"
              name="author.designation"
              value={blog.author.designation}
              onChange={(e) =>
                setBlog((prev) => ({
                  ...prev,
                  author: { ...prev.author, designation: e.target.value },
                }))
              }
              required
              placeholder="Enter author designation"
              className="mt-1"
            />

            {/* Author Image */}
            <Input
              id="author-image"
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  setBlog((prev) => ({
                    ...prev,
                    author: { ...prev.author, image: e.target.files![0] },
                  }));
                }
              }}
              className="mt-1"
            />

            {/* Description */}
            <textarea
              id="author-description"
              name="author.description"
              value={blog.author.description}
              onChange={(e) =>
                setBlog((prev) => ({
                  ...prev,
                  author: { ...prev.author, description: e.target.value },
                }))
              }
              rows={3}
              required
              placeholder="Enter author description"
              className="mt-1 w-full rounded-md border px-3 py-2"
            />
          </div>

          {/* Cover Image */}
          <div>
            <Label htmlFor="image" className="flex items-center ml-1 mb-2">
              <ImageIcon className="mr-2 h-4 w-4" /> Cover Image
            </Label>
            {imagePreview && (
              <div className="mt-2 mb-4">
                <img
                  src={imagePreview}
                  alt="Cover preview"
                  className="w-full max-h-48 object-cover rounded-md"
                  onLoad={() => URL.revokeObjectURL(imagePreview)}
                />
              </div>
            )}
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="mt-1"
            />
          </div>

          {/* Editor Content */}
          <div>
            <Label htmlFor="content" className="flex items-center ml-1 mb-2">
              <FileText className="mr-2 h-4 w-4" /> Content
            </Label>
            <div
              ref={editorRef}
              className="border p-4 rounded-md bg-white min-h-[300px]"
            />
          </div>

          {/* Summary */}
          <div>
            <Label htmlFor="summary" className="flex items-center ml-1 mb-2">
              <FileText className="mr-2 h-4 w-4" /> Summary
            </Label>
            <textarea
              id="summary"
              name="summary"
              value={blog.summary}
              onChange={handleChange}
              required
              rows={4}
              placeholder="Enter a short summary for this blog"
              className="mt-1 w-full rounded-md border px-3 py-2"
            />
          </div>

          {/* Category */}
          <div>
            <Label htmlFor="category" className="flex items-center ml-1 mb-2">
              <ClipboardList className="mr-2 h-4 w-4" /> Category
            </Label>
            <select
              id="category"
              name="category"
              value={blog.category}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border px-3 py-2"
            >
              <option value="Select a category" disabled>
                Select a category
              </option>
              {BLOG_CATEGORIES.map((category: any) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Status & Featured */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <Label className="flex items-center ml-1 mb-2">
                <FileChartColumn className="mr-2 h-4 w-4" /> Status
              </Label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="status"
                    value="draft"
                    checked={blog.status === "draft"}
                    onChange={handleChange}
                  />
                  Draft
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="status"
                    value="published"
                    checked={blog.status === "published"}
                    onChange={handleChange}
                  />
                  Published
                </label>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                id="isFeatured"
                type="checkbox"
                checked={blog.isFeatured}
                onChange={(e) =>
                  setBlog((prev) => ({ ...prev, isFeatured: e.target.checked }))
                }
              />
              <Label htmlFor="isFeatured">Feature this blog</Label>
            </div>
          </div>

          {/* Tags */}
          <div>
            <Label htmlFor="tags" className="flex items-center ml-1 mb-2">
              <Tag className="mr-2 h-4 w-4" /> Tags
            </Label>
            <div className="flex flex-wrap gap-2 mt-2 mb-2">
              {blog.tags.map((tag, index) => (
                <div
                  key={index}
                  className="bg-primary/10 text-primary px-2 py-1 rounded-md flex items-center"
                >
                  {tag}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-5 w-5 p-0 ml-1"
                    onClick={() => handleTagRemove(tag)}
                  >
                    <X className="h-4 w-4" />
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
                    e.preventDefault();
                    handleTagAdd();
                  }
                }}
              />
              <Button type="button" onClick={handleTagAdd}>
                Add
              </Button>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/admin/blogs")}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary hover:bg-primary/90"
            >
              {isSubmitting ? "Saving..." : blogId ? "Update Blog" : "Add Blog"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
