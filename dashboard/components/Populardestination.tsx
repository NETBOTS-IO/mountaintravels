"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { MapPin, FileText, Hash, ImageIcon, X } from "lucide-react";
import { BASE_URL } from "@/Var";
import { createPopularDestination, updatePopularDestination } from "@/lib/data-utils";
import { type PopularDestination } from "@/lib/types";
import { ArrowLeft } from "lucide-react";

interface PopularDestinationFormProps {
  destinationId?: string;
  initialData?: PopularDestination;
}

interface DestinationFormState {
  name: string;
  description: string;
  tours: number;
  image: File | string | null;
}

export default function PopularDestinationForm({ destinationId, initialData }: PopularDestinationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const router = useRouter();

  const [destination, setDestination] = useState<DestinationFormState>({
    name: "",
    description: "",
    tours: 0,
    image: null,
  });

  // Populate initial data for editing
  useEffect(() => {
    if (initialData) {
      setDestination({
        name: initialData.name || "",
        description: initialData.description || "",
        tours: initialData.tours || 0,
        image: initialData.image || null,
      });

      if (typeof initialData.image === "string" && initialData.image) {
        setImagePreview(`${BASE_URL}${initialData.image}`);
      }
    }
  }, [initialData]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDestination((prev) => ({
      ...prev,
      [name]: name === "tours" ? Number(value) : value,
    }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setDestination((prev) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("name", destination.name);
      formData.append("description", destination.description);
      formData.append("tours", destination.tours.toString());

      if (destination.image instanceof File) {
        formData.append("image", destination.image);
      }

      let result;
      if (destinationId) {
        result = await updatePopularDestination(destinationId, formData);
        if (result) toast.success("Destination updated successfully");
      } else {
        result = await createPopularDestination(formData);
        if (result) toast.success("Destination created successfully");
      }

      if (result) {
        router.push("/admin/popular-destinations");
      } else {
        throw new Error("Failed to save destination");
      }
    } catch (error) {
      console.error("Error saving destination:", error);
      toast.error("Failed to save destination");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
         <Button
        type="button"
        variant="outline"
        onClick={() => router.push("/admin/popular-destinations/")}
        className="flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Travel Tips List
      </Button>
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
                  <MapPin size={16} />
                </div>
                <Input
                  id="name"
                  name="name"
                  value={destination.name}
                  onChange={handleInputChange}
                  className="pl-10"
                  placeholder="Hunza Valley"
                  required
                />
              </div>
            </div>

            {/* Tours */}
            <div className="space-y-2">
              <Label htmlFor="tours" className="text-sm font-medium">
                Number of Tours <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                  <Hash size={16} />
                </div>
                <Input
                  id="tours"
                  name="tours"
                  type="number"
                  min={0}
                  value={destination.tours}
                  onChange={handleInputChange}
                  className="pl-10"
                  placeholder="12"
                  required
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              Description <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <div className="absolute top-3 left-3 text-gray-400">
                <FileText size={16} />
              </div>
              <Textarea
                id="description"
                name="description"
                value={destination.description}
                onChange={handleInputChange}
                placeholder="Known for its stunning landscapes and ancient forts"
                rows={4}
                required
                className="pl-8 resize-none"
              />
            </div>
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label htmlFor="image" className="text-sm font-medium">
              Destination Image
            </Label>
            <Input
              id="image"
              type="file"
              onChange={handleImageChange}
              accept="image/jpeg,image/png,image/gif,image/webp"
              className="cursor-pointer"
            />
            {imagePreview && (
              <div className="mt-2 relative w-32 h-20">
                <Image
                  src={imagePreview}
                  alt="Preview"
                  fill
                  className="rounded-md object-cover"
                />
                <button
                  type="button"
                  onClick={() => {
                    setDestination((prev) => ({ ...prev, image: null }));
                    setImagePreview("");
                  }}
                  className="absolute top-1 right-1 bg-black bg-opacity-50 rounded-full p-1 text-white hover:bg-opacity-75"
                >
                  <X size={14} />
                </button>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/admin/popular-destinations")}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? "Saving..."
                : destinationId
                ? "Update Destination"
                : "Create Destination"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
