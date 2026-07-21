"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import MediaForm from "@/components/MediaForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { getGalleryPhotoById } from "@/lib/data-utils";

export default function EditMediaItem() {
  const { id } = useParams();
  const router = useRouter();
  const [initialData, setInitialData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getGalleryPhotoById(id as string).then((data) => {
        if (data) {
          setInitialData(data);
        }
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) {
    return (
      <div className="container py-8 text-center">
        Loading media item details...
      </div>
    );
  }

  return (
    <div className="container">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-3xl font-bold">Edit Media Item</h1>
      </div>

      {initialData ? (
        <MediaForm initialData={initialData} />
      ) : (
        <div className="text-center py-8 text-red-500">
          Media item not found
        </div>
      )}
    </div>
  );
}
