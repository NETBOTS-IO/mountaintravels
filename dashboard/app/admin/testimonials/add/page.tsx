"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import TestimonialForm from "@/components/TestimonialForm";

export default function AddTestimonialPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Add Testimonial</h1>
        <p className="text-sm text-muted-foreground">
          Create a new customer testimonial to showcase on your website.
        </p>
      </div>
      <Separator />
      <Card>
        <CardHeader>
          <CardTitle>Testimonial Details</CardTitle>
        </CardHeader>
        <CardContent>
          <TestimonialForm />
        </CardContent>
      </Card>
    </div>
  );
}