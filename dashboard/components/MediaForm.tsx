"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "react-hot-toast";
import {
  ImageIcon,
  FileText,
  User,
  Calendar,
  MapPin,
  X,
  Film,
  Loader2,
} from "lucide-react";
import { createGalleryPhoto, updateGalleryPhoto } from "@/lib/data-utils";
import { BASE_URL } from "@/Var";

interface MediaFormProps {
  initialData?: any;
  onSuccess?: () => void;
}

const categories = [
  "Expeditions",
  "Safari",
  "Skiing",
  "Trekkings",
  "Culture",
  "Mountains",
  "Wildlife",
  "Landscapes",
  "Adventure",
  "People",
];

const isVideoUrl = (url: string) => {
  if (!url) return false;
  const ext = url.split(".").pop()?.split("?")[0].toLowerCase();
  return ext
    ? ["mp4", "webm", "ogg", "mov", "avi", "mkv"].includes(ext)
    : false;
};

const getVideoFilename = (url: string) => {
  if (!url) return "";
  return url.split("/").pop() || "";
};

export default function MediaForm({ initialData, onSuccess }: MediaFormProps) {
  const [form, setForm] = useState({
    title: "",
    category: "",
    location: "",
    date: "",
    description: "",
    photographer: "",
    type: "image",
    images: [] as File[],
    previews: [] as { src: string; isVideo: boolean }[],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (initialData) {
      const srcList = initialData.src || [];
      const itemPreviews = srcList.map((src: string) => ({
        src,
        isVideo: isVideoUrl(src) || initialData.type === "video",
      }));

      setForm((prev) => ({
        ...prev,
        ...initialData,
        images: [],
        previews: itemPreviews,
      }));
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, category: e.target.value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const newPreviews = files.map((file) => ({
        src: URL.createObjectURL(file),
        isVideo: file.type.startsWith("video/"),
      }));

      setForm((prev) => ({
        ...prev,
        images: [...prev.images, ...files],
        previews: [...prev.previews, ...newPreviews],
        type: newPreviews.some((p) => p.isVideo) ? "video" : prev.type,
      }));
    }
  };

  const handleRemoveMedia = (idx: number) => {
    setForm((prev) => {
      const isExisting =
        prev.previews[idx] &&
        typeof prev.previews[idx].src === "string" &&
        prev.previews[idx].src.startsWith("/uploads/");
      let newPreviews = [...prev.previews];
      newPreviews.splice(idx, 1);
      let newImages = [...prev.images];

      if (!isExisting) {
        newImages.splice(idx - (prev.previews.length - prev.images.length), 1);
      }
      return {
        ...prev,
        previews: newPreviews,
        images: newImages,
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setUploadProgress(0);
    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("category", form.category);
      formData.append("location", form.location || "");
      formData.append("date", form.date || "");
      formData.append("description", form.description || "");
      formData.append("photographer", form.photographer || "");

      // Append files
      form.images.forEach((file) => formData.append("src", file));

      // Append existing URLs
      const existingUrls = form.previews
        .filter(
          (p) => typeof p.src === "string" && p.src.startsWith("/uploads/"),
        )
        .map((p) => p.src);

      existingUrls.forEach((src) => {
        formData.append("src", src);
      });

      const handleProgress = (progressEvent: any) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total,
        );
        setUploadProgress(percentCompleted);
      };

      if (initialData && initialData.id) {
        await updateGalleryPhoto(initialData.id, formData, handleProgress);
        toast.success("Media item updated successfully");
      } else {
        await createGalleryPhoto(formData, handleProgress);
        toast.success("Media item saved successfully");
      }
      if (onSuccess) onSuccess();
      router.push("/admin/media");
    } catch (error: any) {
      toast.error(error?.message || "Failed to save media item");
    } finally {
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  };

  return (
    <Card className="relative overflow-hidden">
      {/* Premium Loader Overlay */}
      {isSubmitting && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center p-6 transition-all duration-300">
          <div className="bg-white border rounded-2xl p-8 shadow-2xl flex flex-col items-center w-full max-w-sm text-center">
            <Loader2 className="h-10 w-10 text-orange-500 animate-spin mb-4" />
            <h3 className="font-bold text-lg text-slate-800 mb-1">
              Uploading Media
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Processing & optimizing your files...
            </p>

            {/* Progress Bar Container */}
            <div className="w-full bg-slate-100 rounded-full h-3 mb-2 overflow-hidden border">
              <div
                className="bg-orange-500 h-full rounded-full transition-all duration-200"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <span className="text-sm font-bold text-orange-600">
              {uploadProgress}% Complete
            </span>
          </div>
        </div>
      )}

      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="title" className="flex items-center">
              <FileText className="mr-2 h-4 w-4" /> Title
            </Label>
            <Input
              id="title"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter title (optional)"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="category" className="flex items-center">
              <ImageIcon className="mr-2 h-4 w-4" /> Category
            </Label>
            <select
              id="category"
              name="category"
              value={form.category}
              onChange={handleCategoryChange}
              className="mt-1 w-full border rounded-md p-2"
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label htmlFor="location" className="flex items-center">
              <MapPin className="mr-2 h-4 w-4" /> Location
            </Label>
            <Input
              id="location"
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Enter location"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="date" className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" /> Date
            </Label>
            <Input
              id="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="mt-1"
              type="date"
            />
          </div>

          <div>
            <Label htmlFor="photographer" className="flex items-center">
              <User className="mr-2 h-4 w-4" /> Photographer / Creator
            </Label>
            <Input
              id="photographer"
              name="photographer"
              value={form.photographer}
              onChange={handleChange}
              placeholder="Enter creator name"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="description" className="flex items-center">
              <FileText className="mr-2 h-4 w-4" /> Description
            </Label>
            <Textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Enter description"
              className="mt-1"
              rows={4}
            />
          </div>

          <div>
            <Label htmlFor="mediaFiles" className="flex items-center">
              <Film className="mr-2 h-4 w-4" /> Media Files (Images / Videos)
            </Label>
            <Input
              id="mediaFiles"
              name="mediaFiles"
              type="file"
              accept="image/*,video/*"
              multiple
              onChange={handleFileUpload}
              className="mt-1"
            />
            <div className="flex gap-4 mt-4 flex-wrap">
              {form.previews.map((preview, idx) => {
                // If it is an existing video, use the stream endpoint
                const isExisting = preview.src.startsWith("/uploads/");
                const previewSrc =
                  isExisting && preview.isVideo
                    ? `${BASE_URL}/api/media/stream/${getVideoFilename(preview.src)}`
                    : isExisting
                      ? `${BASE_URL}${preview.src}`
                      : preview.src;

                return (
                  <div
                    key={idx}
                    className="relative group w-24 h-24 border rounded-md overflow-hidden bg-gray-50 flex items-center justify-center"
                  >
                    {preview.isVideo ? (
                      <video
                        src={previewSrc}
                        className="w-full h-full object-cover"
                        muted
                        controls={false}
                      />
                    ) : (
                      <img
                        src={previewSrc}
                        alt={`Preview ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    )}
                    <button
                      type="button"
                      className="absolute top-1 right-1 bg-white bg-opacity-80 rounded-full p-1 text-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-100 hover:scale-110"
                      onClick={() => handleRemoveMedia(idx)}
                      title="Remove item"
                      style={{ zIndex: 2 }}
                    >
                      <X className="w-4 h-4" />
                    </button>
                    {preview.isVideo && (
                      <div className="absolute bottom-1 left-1 bg-black/60 text-white rounded px-1 py-0.5 text-[9px] font-semibold flex items-center gap-0.5">
                        <Film className="w-2.5 h-2.5" />
                        VIDEO
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Uploading..." : "Save Media Item"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
