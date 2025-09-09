"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";

import { BASE_URL } from "@/app/Var";

export default function DestinationDetailsPage() {
  const { id } = useParams();
  const [destination, setDestination] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    async function fetchDestination() {
      try {
        const res = await fetch(`${BASE_URL}/api/popular/${id}`);
        const result = await res.json();

        if (result.success) {
          setDestination(result.data);
        } else {
          setDestination(null);
        }
      } catch (err) {
        console.error("Failed to fetch destination:", err);
        setDestination(null);
      } finally {
        setLoading(false);
      }
    }
    fetchDestination();
  }, [id]);

  if (loading) {
    return <p className="p-6">Loading...</p>;
  }

  if (!destination) {
    return <p className="p-6">Destination not found.</p>;
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="bg-white shadow-md rounded-xl p-6">
          {/* Image */}
          <img
            src={`${BASE_URL}${destination.image}`}
            alt={destination.name}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />

          {/* Title */}
          <h1 className="text-3xl font-bold mb-4">{destination.name}</h1>

          {/* Description */}
          <p className="text-gray-700 mb-4">{destination.description}</p>

          {/* Tours */}
          <p className="text-sm text-gray-500 mb-2">
            <span className="font-semibold">Tours Available:</span>{" "}
            {destination.tours}
          </p>
          {/* <p className="text-xs text-gray-400 mb-1">
            <span className="font-semibold">Created At:</span>{" "}
            {new Date(destination.createdAt).toLocaleString()}
          </p>
          <p className="text-xs text-gray-400 mb-6">
            <span className="font-semibold">Updated At:</span>{" "}
            {new Date(destination.updatedAt).toLocaleString()}
          </p> */}

          {/* Back Button */}
          <Button
            variant="outline"
            className="text-primary border-primary hover:bg-primary hover:text-white transition-colors"
            onClick={() => history.back()}
          >
            ← Back
          </Button>
        </div>
      </div>
    </section>
  );
}
