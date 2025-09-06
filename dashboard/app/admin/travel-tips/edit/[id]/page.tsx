"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getTravelTipById } from "@/lib/data-utils";
import TravelTipForm from "@/components/TravelTipsForm";
import { toast } from "react-hot-toast";
import type { TravelTip } from "@/lib/types";

export default function EditTravelTipPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [tip, setTip] = useState<TravelTip | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTip() {
      try {
        const data = await getTravelTipById(id);
        if (data?.success && data.data) {
          setTip(data.data);
        } else {
          toast.error("Travel Tip not found");
          router.push("/admin/travel-tips");
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to load Travel Tip");
      } finally {
        setLoading(false);
      }
    }
    if (id) loadTip();
  }, [id, router]);

  if (loading) return <p className="p-6">Loading...</p>;

  if (!tip) return <p className="p-6">Travel Tip not found.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Travel Tip</h1>
      <TravelTipForm tipId={tip._id} initialData={tip} />
    </div>
  );
}
