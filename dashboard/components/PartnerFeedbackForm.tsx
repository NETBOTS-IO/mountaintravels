// dashboard/components/PartnerFeedbackForm.tsx
"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createPartnerFeedback, updatePartnerFeedback } from "@/lib/data-utils";
import { PartnerFeedback } from "@/lib/types";
import { BASE_URL } from "@/Var";
import Image from "next/image";
import { toast } from "react-hot-toast";

interface FormProps {
  initial?: PartnerFeedback | null;
  feedbackId?: string;
}

interface PartnerFeedbackFormState {
  partnerName: string;
  designation: string;
  company: string;
  feedback: string;
  rating: number;
  logo: File | string | null;
}

export default function PartnerFeedbackForm({
  initial,
  feedbackId,
}: FormProps) {
  const router = useRouter();

  const [form, setForm] = useState<PartnerFeedbackFormState>({
    partnerName: "",
    company: "",
    designation: "",
    feedback: "",
    rating: 5,
    logo: null,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [imagePreview, setImagePreview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initial) {
      setForm({
        partnerName: initial.partnerName || "",
        company: initial.company || "",
        designation: initial.designation || "",
        feedback: initial.feedback || "",
        rating: initial.rating ?? 5,
        logo: initial.logo || null,
      });
      if (typeof initial.logo === "string" && initial.logo) {
        setImagePreview(`${BASE_URL}${initial.logo}`);
      }
    }
  }, [initial]);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.partnerName.trim()) e.partnerName = "Partner name is required";
    if (!form.company.trim()) e.company = "Company is required";
    if (!form.feedback.trim()) e.feedback = "Feedback is required";
    if (form.rating < 1 || form.rating > 5)
      e.rating = "Rating must be between 1 and 5";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setForm((prev) => ({ ...prev, logo: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Validation error. Please fix the form errors");
      return;
    }

    setIsSubmitting(true);
    try {
      const fd = new FormData();
      fd.append("partnerName", form.partnerName);
      fd.append("company", form.company);
      fd.append("designation", form.designation);
      fd.append("feedback", form.feedback);
      fd.append("rating", String(form.rating));
      if (form.logo instanceof File) {
        fd.append("logo", form.logo);
      }

      let result;
      if (feedbackId) {
        result = await updatePartnerFeedback(feedbackId, fd);
        if (result) {
          toast.success("Partner feedback updated successfully");
        }
      } else {
        result = await createPartnerFeedback(fd);
        if (result) {
          toast.success("Partner feedback created successfully");
        }
      }

      if (result) {
        router.push("/admin/partner-feedbacks");
      } else {
        throw new Error("Failed to save partner feedback");
      }
    } catch (err: any) {
      console.error("Error saving partner feedback:", err);
      toast.error("Unable to save");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="partnerName">Partner Name</Label>
          <Input
            id="partnerName"
            value={form.partnerName}
            onChange={(e) => setForm({ ...form, partnerName: e.target.value })}
          />
          {errors.partnerName && (
            <p className="text-sm text-destructive">{errors.partnerName}</p>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
            />
            {errors.company && (
              <p className="text-sm text-destructive">{errors.company}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="designation">Designation</Label>
            <Input
              id="designation"
              value={form.designation}
              onChange={(e) =>
                setForm({ ...form, designation: e.target.value })
              }
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="feedback">Feedback</Label>
          <Textarea
            id="feedback"
            value={form.feedback}
            onChange={(e) => setForm({ ...form, feedback: e.target.value })}
            rows={5}
          />
          {errors.feedback && (
            <p className="text-sm text-destructive">{errors.feedback}</p>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-start">
          <div className="space-y-2">
            <Label htmlFor="rating">Rating</Label>
            <Input
              id="rating"
              type="number"
              min={1}
              max={5}
              value={form.rating}
              onChange={(e) =>
                setForm({ ...form, rating: Number(e.target.value) })
              }
            />
            {errors.rating && (
              <p className="text-sm text-destructive">{errors.rating}</p>
            )}
          </div>

          <div className="md:col-span-3 space-y-2">
            <Label htmlFor="logo">Logo/Partner image</Label>

            <Input
              id="logo"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="cursor-pointer"
            />
            {imagePreview && (
              <div className="mt-2 relative w-24 h-24">
                <Image
                  src={imagePreview}
                  alt="Preview"
                  fill
                  className="rounded-full object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? "Saving..."
            : feedbackId
            ? "Update feedback"
            : "Create feedback"}
        </Button>
      </div>
    </form>
  );
}
