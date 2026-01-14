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
  });
  const [loading, setLoading] = useState(false);

  // handle text input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (tipId) {
        await updateTravelTip(tipId, formData);
        toast.success("Travel Tip updated");
      } else {
        await createTravelTip(formData);
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
    <div className="space-y-6 max-w-xl">
      {/* Back button */}
      <Button
        type="button"
        variant="outline"
        onClick={() => router.push("/admin/travel-tips")}
        className="flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to  List
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
          <label className="block font-medium">Description</label>
          <textarea
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            rows={4}
            required
          />
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? (tipId ? "Updating..." : "Creating...") : tipId ? "Update Travel Approach" : "Create Travel Approach"}
        </Button>
      </form>
    </div>
  );
}
