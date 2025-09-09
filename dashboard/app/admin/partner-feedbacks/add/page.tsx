// dashboard/app/admin/partner-feedbacks/add/page.tsx
"use client";

import PartnerFeedbackForm from "@/components/PartnerFeedbackForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AddPartnerFeedbackPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Add Partner Feedback</h1>
      <Card>
        <CardHeader>
          <CardTitle>New Partner Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          <PartnerFeedbackForm />
        </CardContent>
      </Card>
    </div>
  );
}
