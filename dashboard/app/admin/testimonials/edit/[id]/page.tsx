"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import TestimonialForm from "@/components/TestimonialForm";
import { getTestimonialById } from "@/lib/data-utils";
import { Testimonial } from "@/lib/types";
import { toast } from "react-hot-toast";

export default function EditTestimonialPage() {
  const params = useParams();
  const router = useRouter();
  const [testimonial, setTestimonial] = useState<Testimonial | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonial = async () => {
      if (!params.id) return;
      
      try {
        const data = await getTestimonialById(params.id as string);
        setTestimonial(data || null);
      } catch (error) {
        console.error("Error fetching testimonial:", error);
        toast.error("Failed to load testimonial");
        router.push("/admin/testimonials");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestimonial();
  }, [params.id, router]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Button
            variant="ghost"
            className="mb-2"
            onClick={() => router.push("/admin/testimonials")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Testimonials
          </Button>
          <h1 className="text-2xl font-bold">Edit Testimonial</h1>
          <p className="text-sm text-muted-foreground">
            Update the testimonial details and content.
          </p>
        </div>
      </div>
      <Separator />
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p>Loading testimonial...</p>
        </div>
      ) : testimonial ? (
        <Card>
          <CardHeader>
            <CardTitle>Testimonial Details</CardTitle>
          </CardHeader>
          <CardContent>
            <TestimonialForm testimonialId={params.id as string} initialData={testimonial} />
          </CardContent>
        </Card>
      ) : (
        <div className="flex justify-center items-center h-64">
          <p className="text-red-500">Testimonial not found</p>
        </div>
      )}
    </div>
  );
}