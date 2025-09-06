// dashboard/app/admin/partner-feedbacks/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { getPartnerFeedbackById } from "@/lib/data-utils";
import { PartnerFeedback } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Pencil, Star } from "lucide-react";
import { BASE_URL } from "@/Var";

export default function ViewPartnerFeedbackPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const [feedback, setFeedback] = useState<PartnerFeedback | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadFeedback() {
      if (!id) return;
      
      setIsLoading(true);
      try {
        const data = await getPartnerFeedbackById(id);
        setFeedback(data || null);

      } catch (error) {
        console.error("Error loading partner feedback:", error);
      } finally {
        setIsLoading(false);
      }
    }
    
    loadFeedback();
  }, [id]);

  if (isLoading) {
    return <div className="flex justify-center py-10">Loading...</div>;
  }

  if (!feedback) {
    return <div className="text-center py-10">Feedback not found</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Partner Feedback Details</h1>
        <Button variant="outline" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center gap-4">
            {feedback.logo && (
              <div className="relative h-16 w-16 overflow-hidden rounded-md border bg-muted">
                <Image
                  src={`${BASE_URL}${feedback.logo}`}
                  alt={`${feedback.company} logo`}
                  fill
                  className="object-contain p-1"
                />
              </div>
            )}
            <div className="flex-1">
              <CardTitle className="text-xl">{feedback.partnerName}</CardTitle>
              <div className="text-sm text-muted-foreground mt-1">
                {feedback.company}
                {feedback.designation && ` — ${feedback.designation}`}
              </div>
              <div className="flex items-center gap-1 mt-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < feedback.rating ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"}`}
                  />
                ))}
                <span className="text-sm ml-1">{feedback.rating}/5</span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push(`/admin/partner-feedbacks/edit/${feedback.id}`)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-medium mb-2">Feedback</h3>
            <div className="rounded-md border p-4 bg-muted/50">
              <p>{feedback.feedback}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium mb-2">Dates</h3>
              <div className="rounded-md border p-4 space-y-3">
                <div>
                  <div className="text-sm text-muted-foreground">Created</div>
                  <div>
                    {feedback.createdAt
                      ? new Date(feedback.createdAt).toLocaleDateString()
                      : "—"}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Last Updated</div>
                  <div>
                    {feedback.updatedAt
                      ? new Date(feedback.updatedAt).toLocaleDateString()
                      : "—"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
