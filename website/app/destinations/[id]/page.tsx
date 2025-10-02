"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
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
    <section className="flex flex-col">
      {/* Banner Image with Blur Background */}
      <div className="relative h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden">
        {/* Blurred Background */}
        <Image
          src={`${BASE_URL}${destination.image}`}
          alt={`${destination.name} background`}
          fill
          priority
          className="object-cover blur-lg scale-110"
        />

        {/* Main Image */}
        <div className="relative w-full h-full flex items-center justify-center">
          <Image
            src={`${BASE_URL}${destination.image}`}
            alt={destination.name}
            fill
            priority
            className="object-contain relative z-10"
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 mt-8">
        <div className="bg-white shadow-md rounded-xl p-6">
          {/* Title */}
          <h1 className="text-3xl font-bold mb-4">{destination.name}</h1>

          {/* Description */}
          <p className="text-gray-700 mb-4">{destination.description}</p>

          {/* Tours */}
          <p className="text-sm text-gray-500 mb-2">
            <span className="font-semibold">Tours Available:</span>{" "}
            {destination.tours}
          </p>

          {/* Back Button */}
          <Button
            variant="outline"
            className="text-primary border-primary hover:bg-primary hover:text-white transition-colors mt-4"
            onClick={() => history.back()}
          >
            ← Back to Lists
          </Button>
        </div>
      </div>
    </section>
  );
}
