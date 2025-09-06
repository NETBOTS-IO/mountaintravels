// dashboard/app/admin/partner-feedbacks/edit/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getPartnerFeedbackById } from "@/lib/data-utils";
import { PartnerFeedback } from "@/lib/types";
import PartnerFeedbackForm from "@/components/PartnerFeedbackForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "react-hot-toast";

export default function EditPartnerFeedbackPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const [initial, setInitial] = useState<PartnerFeedback | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadFeedback() {
      if (!id) return;

      try {
        const feedback = await getPartnerFeedbackById(id);
        setInitial(feedback || null);
      } catch (error) {
        console.error("Error loading partner feedback:", error);
        toast.error("Failed to load partner feedback");
        router.push("/admin/partner-feedbacks");
      } finally {
        setIsLoading(false);
      }
    }

    loadFeedback();
  }, [id, router]);

  if (isLoading) {
    return <div className="flex justify-center py-10">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Edit Partner Feedback</h1>
      <Card>
        <CardHeader>
          <CardTitle>Edit Partner Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          <PartnerFeedbackForm initial={initial} feedbackId={id} />
        </CardContent>
      </Card>
    </div>
  );
}
