"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getPopularDestinationById } from "@/lib/data-utils";
import { Button } from "@/components/ui/button";
export const BASE_URL = "http://localhost:5000"; 

export default function ViewDestinationPage() {
  const params = useParams();
  const id = params?.id as string;
  const [destination, setDestination] = useState<any | null>(null);

  useEffect(() => {
    async function loadData() {
      if (id) {
        const data = await getPopularDestinationById(id);
        setDestination(data);
      }
    }
    loadData();
  }, [id]);

  if (!destination) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      {/* Back Button */}
      <div className="mb-6">
        <Link href="/admin/popular-destinations">
          <Button variant="outline">← Back to Popular Destinations</Button>
        </Link>
      </div>

      {/* Destination Details */}
      <h1 className="text-2xl font-bold mb-4">{destination.name}</h1>

      {destination.image && (
  <img
    src={`${BASE_URL}${destination.image}`}
    alt={destination.name}
    className="w-full max-w-md rounded shadow mb-4"
  />
)}

      <p className="text-gray-700 mb-2">
        <span className="font-semibold">Description:</span> {destination.description}
      </p>

      <p className="text-gray-700 mb-2">
        <span className="font-semibold">Tours:</span> {destination.tours}
      </p>

      <p className="text-gray-700 mb-2">
        <span className="font-semibold">Status:</span>{" "}
        {destination.isActive ? "Active ✅" : "Inactive ❌"}
      </p>

      <p className="text-sm text-gray-500">
        Created at: {new Date(destination.createdAt).toLocaleString()}
      </p>
    </div>
  );
}
