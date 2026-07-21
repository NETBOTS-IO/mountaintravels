"use client";

import MediaForm from "@/components/MediaForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AddMediaItem() {
  const router = useRouter();

  return (
    <div className="container">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-3xl font-bold">Add New Media</h1>
      </div>

      <MediaForm />
    </div>
  );
}
