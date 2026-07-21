"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getPopularDestinationById } from "@/lib/data-utils";
import PopularDestinationForm from "@/components/Populardestination";

export default function EditDestinationPage() {
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
      <h1 className="text-2xl font-bold mb-6">Edit Destination</h1>
      <PopularDestinationForm destinationId={id} initialData={destination} />
    </div>
  );
}
