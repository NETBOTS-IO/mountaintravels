"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Star, Calendar, MapPin, Briefcase, CheckCircle, XCircle, Pencil } from "lucide-react";
import { getTestimonialById, toggleTestimonialVerification } from "@/lib/data-utils";
import { Testimonial } from "@/lib/types";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { BASE_URL } from "@/Var";

export default function ViewTestimonialPage() {
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

  const handleToggleVerification = async () => {
    if (!testimonial) return;
    
    try {
      const updatedTestimonial = await toggleTestimonialVerification(testimonial.id);
      if (updatedTestimonial) {
        setTestimonial(updatedTestimonial);
        toast.success(
          `Testimonial ${updatedTestimonial.verified ? "verified" : "unverified"} successfully`
        );
      } else {
        throw new Error("Failed to update verification status");
      }
    } catch (error) {
      console.error("Error updating verification status:", error);
      toast.error("Failed to update verification status");
    }
  };

  const formatDate = (dateString?: Date) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

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
          <h1 className="text-2xl font-bold">View Testimonial</h1>
          <p className="text-sm text-muted-foreground">
            Review the testimonial details and content.
          </p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={handleToggleVerification}
            disabled={isLoading || !testimonial}
          >
            {testimonial?.verified ? (
              <>
                <XCircle className="mr-2 h-4 w-4" /> Unverify
              </>
            ) : (
              <>
                <CheckCircle className="mr-2 h-4 w-4" /> Verify
              </>
            )}
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push(`/admin/testimonials/edit/${params.id}`)}
            disabled={isLoading || !testimonial}
          >
            <Pencil className="mr-2 h-4 w-4" /> Edit
          </Button>
        </div>
      </div>
      <Separator />
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p>Loading testimonial...</p>
        </div>
      ) : testimonial ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column - Customer Info */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-center mb-4">
                <div className="h-32 w-32 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                  {testimonial.image ? (
                    <Image
                      src={`${BASE_URL}${testimonial.image}` || "/placeholder-user.jpg"}
                      alt={testimonial.name}
                      width={128}
                      height={128}
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full w-full text-gray-500">
                      <span className="text-4xl">👤</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="text-center mb-4">
                <h3 className="text-xl font-semibold">{testimonial.name}</h3>
                <p className="text-gray-500 flex items-center justify-center">
                  <Briefcase className="h-4 w-4 mr-1" />
                  {testimonial.designation}
                </p>
                <p className="text-gray-500 flex items-center justify-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {testimonial.location}
                </p>
                <div className="mt-2">
                  <Badge variant={testimonial.verified ? "default" : "secondary"}>
                    {testimonial.verified ? "Verified" : "Unverified"}
                  </Badge>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <div>
                  <span className="text-sm font-medium">Rating:</span>
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={`${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                    <span className="ml-2">{testimonial.rating}/5</span>
                  </div>
                </div>
                
                {testimonial.tripName && (
                  <div>
                    <span className="text-sm font-medium">Trip:</span>
                    <p>{testimonial.tripName}</p>
                  </div>
                )}
                
                {testimonial.tripDate && (
                  <div>
                    <span className="text-sm font-medium">Trip Date:</span>
                    <p className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {formatDate(testimonial.tripDate)}
                    </p>
                  </div>
                )}
                
                <div>
                  <span className="text-sm font-medium">Submitted On:</span>
                  <p>{formatDate(testimonial.createdAt)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Right Column - Testimonial Content */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Testimonial Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-2">Feedback</h3>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
                  <p className="whitespace-pre-line">{testimonial.feedback}</p>
                </div>
              </div>
              
              {testimonial.highlights && testimonial.highlights.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium mb-2">Highlights</h3>
                  <div className="flex flex-wrap gap-2">
                    {testimonial.highlights.map((highlight, index) => (
                      <div
                        key={index}
                        className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full"
                      >
                        <span className="text-sm">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="flex justify-center items-center h-64">
          <p className="text-red-500">Testimonial not found</p>
        </div>
      )}
    </div>
  );
}