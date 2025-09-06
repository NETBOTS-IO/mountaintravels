"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";

import { BASE_URL } from "@/app/Var";

export default function TravelTipDetailsPage() {
  const { id } = useParams();
  const [tip, setTip] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    async function fetchTip() {
      try {
        const res = await fetch(`${BASE_URL}/api/tips/getby/${id}`);
        const result = await res.json();

        if (result.success) {
          setTip(result.data); // ✅ only store the "data" object
        } else {
          setTip(null);
        }
      } catch (err) {
        console.error("Failed to fetch tip:", err);
        setTip(null);
      } finally {
        setLoading(false);
      }
    }
    fetchTip();
  }, [id]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!tip) return <p className="p-6">Tip not found.</p>;

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="bg-white shadow-md rounded-xl p-6">
          {/* Image */}
          <img
            src={`${BASE_URL}${tip.image}`}
            alt={tip.title}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />

          {/* Title */}
          <h1 className="text-3xl font-bold mb-4">{tip.title}</h1>

          {/* Excerpt */}
          <p className="text-gray-700 mb-4">{tip.excerpt}</p>

          {/* Dates */}
          <p className="text-sm text-gray-500 mb-2">
            <span className="font-semibold">Slug:</span> {tip.slug}
          </p>
          <p className="text-sm text-gray-500 mb-2">
            <span className="font-semibold">Publish Date:</span>{" "}
            {new Date(tip.date).toLocaleDateString()}
          </p>
          <div className="mt-6">
            <Button
              variant="outline"
              className="text-primary border-primary hover:bg-primary hover:text-white transition-colors"
              onClick={() => history.back()}
            >
              ← Back
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
