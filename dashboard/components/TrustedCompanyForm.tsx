"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  createTrustedCompany,
  updateTrustedCompany,
} from "@/lib/data-utils";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import { ArrowLeft, Images } from "lucide-react";

interface TrustedCompanyFormProps {
  companyId?: string;
  initialData?: any;
}

export default function TrustedCompanyForm({
  companyId,
  initialData,
}: TrustedCompanyFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
  });
  const [Image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // text input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // file input
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  // submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const dataToSend = new FormData();
      dataToSend.append("name", formData.name);
      if (Image) {
        dataToSend.append("image", Image);
      }

      if (companyId) {
        await updateTrustedCompany(companyId, dataToSend);
        toast.success("Trusted Company updated");
      } else {
        await createTrustedCompany(dataToSend);
        toast.success("Trusted Company created");
      }

      router.push("/admin/trusted-companies");
    } catch (error) {
      console.error(error);
      toast.error("Failed to save company");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      {/* back button */}
      <Button
        type="button"
        variant="outline"
        onClick={() => router.push("/admin/trusted-companies")}
        className="flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Companies List
      </Button>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Company Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Upload Logo</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
          />
          {initialData?.logo && (
            <p className="text-sm text-gray-500 mt-1">
              Current: <span className="italic">{initialData.logo}</span>
            </p>
          )}
        </div>

        <Button type="submit" disabled={loading}>
          {loading
            ? "Saving..."
            : companyId
            ? "Update Company"
            : "Create Company"}
        </Button>
      </form>
    </div>
  );
}
