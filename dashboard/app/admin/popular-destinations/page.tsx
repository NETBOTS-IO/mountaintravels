"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getPopularDestinations, deletePopularDestination } from "@/lib/data-utils";
import { toast } from "react-hot-toast";
import { Eye, Pencil, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PopularDestinationsPage() {
  const [destinations, setDestinations] = useState<any[]>([]);

  useEffect(() => {
    async function loadData() {
      const data = await getPopularDestinations();
      if (data) setDestinations(data);
    }
    loadData();
  }, []);

  const handleDelete = async (id: string) => {
    const res = await deletePopularDestination(id);
    if (res) {
      toast.success("Destination deleted");
      setDestinations(destinations.filter((d) => d._id !== id));
    } else {
      toast.error("Failed to delete");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Popular Destinations</h1>
        <Link href="/admin/popular-destinations/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Destination
          </Button>
        </Link>
      </div>

      {destinations.length === 0 ? (
        <p>No destinations found</p>
      ) : (
        <ul className="space-y-4">
          {destinations.map((d) => (
            <li
              key={d._id}
              className="border p-4 rounded flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{d.name}</p>
                <p className="text-sm text-gray-500">{d.description}</p>
              </div>
              <div className="flex space-x-3">
                {/* View */}
                <Link href={`/admin/popular-destinations/view/${d._id}`}>
                  <Eye className="w-5 h-5 text-blue-600 hover:text-blue-800 cursor-pointer" />
                </Link>

                {/* Edit */}
                <Link href={`/admin/popular-destinations/${d._id}`}>
                  <Pencil className="w-5 h-5 text-green-600 hover:text-green-800 cursor-pointer" />
                </Link>

                {/* Delete */}
                <Trash2
                  className="w-5 h-5 text-red-600 hover:text-red-800 cursor-pointer"
                  onClick={() => handleDelete(d._id)}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
