"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createTravelTip, updateTravelTip } from "@/lib/data-utils";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import { ArrowLeft } from "lucide-react";

interface TravelTipFormProps {
  tipId?: string;
  initialData?: any;
}

export default function TravelTipForm({ tipId, initialData }: TravelTipFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    excerpt: initialData?.excerpt || "",
    date: initialData?.date ? initialData.date.split("T")[0] : "",
    slug: initialData?.slug || "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // handle text input
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // handle file input
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  // submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("excerpt", formData.excerpt);
      formDataToSend.append("date", formData.date);
      formDataToSend.append("slug", formData.slug);
      if (imageFile) {
        formDataToSend.append("image", imageFile); // ✅ file upload
      }

      if (tipId) {
        await updateTravelTip(tipId, formDataToSend);
        toast.success("Travel Tip updated");
      } else {
        await createTravelTip(formDataToSend);
        toast.success("Travel Tip created");
      }

      router.push("/admin/travel-tips");
    } catch (error) {
      console.error(error);
      toast.error("Failed to save Travel Tip");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      {/* 🔙 Back button at top */}
      <Button
        type="button"
        variant="outline"
        onClick={() => router.push("/admin/travel-tips")}
        className="flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Travel Tips List
      </Button>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Excerpt</label>
          <textarea
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            rows={3}
            required
          />
        </div>

        <div>
          <label className="block font-medium">Upload Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
          />
          {initialData?.image && (
            <p className="text-sm text-gray-500 mt-1">
              Current: <span className="italic">{initialData.image}</span>
            </p>
          )}
        </div>

        <div>
          <label className="block font-medium">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium">Slug</label>
          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="best-time-to-trek-pakistan"
            required
          />
        </div>

        <Button type="submit" disabled={loading}>
          {loading
            ? "Saving..."
            : tipId
            ? "Update Travel Tip"
            : "Create Travel Tip"}
        </Button>
      </form>
    </div>
  );
}
