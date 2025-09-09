"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { createTestimonial, updateTestimonial } from "@/lib/data-utils";
import { type Testimonial } from "@/lib/types";
import { toast } from "react-hot-toast";
import { Star, X, Plus, User, MapPin, Briefcase, Calendar } from "lucide-react";
import Image from "next/image";
import { BASE_URL } from "@/Var";

interface TestimonialFormProps {
  testimonialId?: string;
  initialData?: Testimonial;
}

interface TestimonialFormState {
  name: string;
  designation: string;
  location: string;
  rating: number;
  feedback: string;
  image: File | string | null;
  tripName: string;
  tripDate: string;
  highlights: string[];
}

export default function TestimonialForm({ testimonialId, initialData }: TestimonialFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [highlightInput, setHighlightInput] = useState("");
  const router = useRouter();

  const [testimonial, setTestimonial] = useState<TestimonialFormState>({
    name: "",
    designation: "",
    location: "",
    rating: 1,
    feedback: "",
    image: null,
    tripName: "",
    tripDate: "",
    highlights: [],
  });

  // Set initial data if present
  useEffect(() => {
    if (initialData) {
      setTestimonial({
        name: initialData.name || "",
        designation: initialData.designation || "",
        location: initialData.location || "",
        rating: initialData.rating || 5,
        feedback: initialData.feedback || "",
        image: initialData.image || null,
        tripName: initialData.tripName || "",
        tripDate: initialData.tripDate ? new Date(initialData.tripDate).toISOString().split('T')[0] : "",
        highlights: initialData.highlights || [],
      });

      if (typeof initialData.image === "string" && initialData.image) {
        setImagePreview(`${BASE_URL}${initialData.image}`);
      }
    }
  }, [initialData]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTestimonial((prev) => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (newRating: number) => {
    setTestimonial((prev) => ({ ...prev, rating: newRating }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setTestimonial((prev) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const addHighlight = () => {
    if (highlightInput.trim() && testimonial.highlights.length < 10) {
      setTestimonial((prev) => ({
        ...prev,
        highlights: [...prev.highlights, highlightInput.trim()],
      }));
      setHighlightInput("");
    }
  };

  const removeHighlight = (index: number) => {
    setTestimonial((prev) => ({
      ...prev,
      highlights: prev.highlights.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("name", testimonial.name);
      formData.append("designation", testimonial.designation);
      formData.append("location", testimonial.location);
      formData.append("rating", testimonial.rating.toString());
      formData.append("feedback", testimonial.feedback);
      
      if (testimonial.tripName) {
        formData.append("tripName", testimonial.tripName);
      }
      
      if (testimonial.tripDate) {
        formData.append("tripDate", testimonial.tripDate);
      }
      
      // Don't send highlights if the array is empty
      if (testimonial.highlights.length > 0) {
        // Send highlights as an array by appending each highlight with the same field name
        // Express will collect these as an array on the server side
        testimonial.highlights.forEach(highlight => {
          formData.append("highlights", highlight);
        });
      }
      
      if (testimonial.image instanceof File) {
        formData.append("image", testimonial.image);
      }

      let result;
      if (testimonialId) {
        result = await updateTestimonial(testimonialId, formData);
        if (result) {
          toast.success("Testimonial updated successfully");
        }
      } else {
        result = await createTestimonial(formData);
        if (result) {
          toast.success("Testimonial created successfully");
        }
      }

      if (result) {
        router.push("/admin/testimonials");
      } else {
        throw new Error("Failed to save testimonial");
      }
    } catch (error) {
      console.error("Error saving testimonial:", error);
      toast.error("Failed to save testimonial");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Name <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                  <User size={16} />
                </div>
                <Input
                  id="name"
                  name="name"
                  value={testimonial.name}
                  onChange={handleInputChange}
                  className="pl-10"
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>

            {/* Designation */}
            <div className="space-y-2">
              <Label htmlFor="designation" className="text-sm font-medium">
                Designation <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                  <Briefcase size={16} />
                </div>
                <Input
                  id="designation"
                  name="designation"
                  value={testimonial.designation}
                  onChange={handleInputChange}
                  className="pl-10"
                  placeholder="Software Engineer"
                  required
                />
              </div>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location" className="text-sm font-medium">
                Location <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                  <MapPin size={16} />
                </div>
                <Input
                  id="location"
                  name="location"
                  value={testimonial.location}
                  onChange={handleInputChange}
                  className="pl-10"
                  placeholder="New York, USA"
                  required
                />
              </div>
            </div>

            {/* Trip Name */}
            <div className="space-y-2">
              <Label htmlFor="tripName" className="text-sm font-medium">
                Trip Name
              </Label>
              <Input
                id="tripName"
                name="tripName"
                value={testimonial.tripName}
                onChange={handleInputChange}
                placeholder="K2 Base Camp Trek"
              />
            </div>

            {/* Trip Date */}
            <div className="space-y-2">
              <Label htmlFor="tripDate" className="text-sm font-medium">
                Trip Date
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                  <Calendar size={16} />
                </div>
                <Input
                  id="tripDate"
                  name="tripDate"
                  type="date"
                  value={testimonial.tripDate}
                  onChange={handleInputChange}
                  className="pl-10"
                  max={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>

            {/* Rating */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Rating <span className="text-red-500">*</span>
              </Label>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleRatingChange(star)}
                    className="focus:outline-none"
                  >
                    <Star
                      size={20}
                      className={`${
                        star <= testimonial.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Feedback */}
          <div className="space-y-2">
            <Label htmlFor="feedback" className="text-sm font-medium">
              Feedback <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="feedback"
              name="feedback"
              value={testimonial.feedback}
              onChange={handleInputChange}
              placeholder="Share your experience...it should contain more then 10 words"
              rows={5}
              required
              className="resize-none"
            />
          </div>

          {/* Highlights */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Highlights</Label>
            <div className="flex items-center space-x-2">
              <Input
                value={highlightInput}
                onChange={(e) => setHighlightInput(e.target.value)}
                placeholder="Add a highlight point"
                maxLength={100}
              />
              <Button
                type="button"
                onClick={addHighlight}
                variant="outline"
                size="icon"
                disabled={testimonial.highlights.length >= 10}
              >
                <Plus size={16} />
              </Button>
            </div>
            {testimonial.highlights.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {testimonial.highlights.map((highlight, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full flex items-center gap-2"
                  >
                    <span className="text-sm">{highlight}</span>
                    <button
                      type="button"
                      onClick={() => removeHighlight(index)}
                      className="text-gray-500 hover:text-red-500"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
            {testimonial.highlights.length >= 10 && (
              <p className="text-amber-500 text-xs mt-1">
                Maximum 10 highlights allowed
              </p>
            )}
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label htmlFor="image" className="text-sm font-medium">
              Profile Image
            </Label>
            <Input
              id="image"
              type="file"
              onChange={handleImageChange}
              accept="image/jpeg,image/png,image/gif,image/webp"
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

          <div className="flex justify-end space-x-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/admin/testimonials")}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? "Saving..."
                : testimonialId
                ? "Update Testimonial"
                : "Create Testimonial"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}