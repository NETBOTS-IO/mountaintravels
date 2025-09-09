"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getTravelTipById } from "@/lib/data-utils";
import { Button } from "@/components/ui/button";

export default function TravelTipViewPage() {
  const params = useParams();
  const id = params?.id as string;
  const [tip, setTip] = useState<any | null>(null);

  useEffect(() => {
    async function loadData() {
      if (id) {
        const res = await getTravelTipById(id);
        if (res?.success) {
          setTip(res.data);
        }
      }
    }
    loadData();
  }, [id]);

  if (!tip) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      {/* Back button */}
      <div className="mb-6">
        <Link href="/admin/travel-tips">
          <Button variant="outline">← Back to Travel Tips</Button>
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-4">{tip.title}</h1>

      {tip.image && (
        <img
          src={`http://localhost:5000${tip.image}`}
          alt={tip.title}
          className="w-full max-w-2xl rounded mb-4"
        />
      )}

      <p className="text-gray-600 mb-2">
        <strong>Excerpt:</strong> {tip.excerpt}
      </p>

      <p className="text-gray-600 mb-2">
        <strong>Date:</strong>{" "}
        {new Date(tip.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>

      <p className="text-gray-600 mb-2">
        <strong>Slug:</strong> {tip.slug}
      </p>

      <p className="text-gray-600 mb-2">
        <strong>Created At:</strong>{" "}
        {new Date(tip.createdAt).toLocaleString()}
      </p>

      <p className="text-gray-600">
        <strong>Updated At:</strong>{" "}
        {new Date(tip.updatedAt).toLocaleString()}
      </p>
    </div>
  );
}
