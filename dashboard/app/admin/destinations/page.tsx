"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  getPopularDestinations,
  deletePopularDestination,
} from "@/lib/data-utils";
import { toast } from "react-hot-toast";
import { Eye, Pencil, Trash2, Plus, Loader2, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PopularDestinationsPage() {
  const [destinations, setDestinations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      setError("");
      try {
        const data = await getPopularDestinations();
        if (Array.isArray(data)) {
          setDestinations(data);
        } else {
          setDestinations([]);
        }
      } catch (err) {
        console.error("Failed to load destinations:", err);
        setError("Failed to load destinations. Please try again.");
        setDestinations([]);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this destination?")) return;
    try {
      const res = await deletePopularDestination(id);
      if (res) {
        toast.success("Destination deleted");
        setDestinations(destinations.filter((d) => d._id !== id));
      } else {
        toast.error("Failed to delete");
      }
    } catch {
      toast.error("Failed to delete destination");
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Destinations</h1>
          {!loading && (
            <p className="text-sm text-gray-500 mt-1">
              {destinations.length} destination
              {destinations.length !== 1 ? "s" : ""} total
            </p>
          )}
        </div>
        <Link href="/admin/destinations/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Destination
          </Button>
        </Link>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20 gap-3 text-gray-400">
          <Loader2 className="w-8 h-8 animate-spin" />
          <p className="text-sm">Loading destinations...</p>
        </div>
      )}

      {/* Error state */}
      {!loading && error && (
        <div className="text-center py-12 bg-red-50 rounded-xl border border-red-200">
          <p className="text-red-600 font-medium">{error}</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => window.location.reload()}
          >
            Retry
          </Button>
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && destinations.length === 0 && (
        <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-300">
          <MapPin className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 font-medium">No destinations found</p>
          <p className="text-gray-400 text-sm mt-1">
            Add your first destination to get started.
          </p>
          <Link href="/admin/destinations/new" className="mt-4 inline-block">
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Destination
            </Button>
          </Link>
        </div>
      )}

      {/* Destinations Grid */}
      {!loading && !error && destinations.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {destinations.map((d) => {
            const name = d?.name || d?.shortName || "Unnamed Destination";
            const shortName = d?.shortName || name.split("–")[0].trim();
            const description = d?.description || "No description available.";
            const image = d?.image || null;
            const region = d?.region || d?.country || "";
            const toursCount = d?.tours ?? 0;

            return (
              <div
                key={d._id}
                className="border rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Image */}
                <div className="relative h-40 bg-gray-100">
                  {image ? (
                    <Image
                      src={image}
                      alt={shortName}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-300">
                      <MapPin className="w-10 h-10" />
                    </div>
                  )}
                  {d?.featured && (
                    <span className="absolute top-2 left-2 bg-amber-400 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Featured
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 truncate">
                    {shortName}
                  </h3>
                  {region && (
                    <p className="text-xs text-gray-400 mt-0.5">{region}</p>
                  )}
                  <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                    {description}
                  </p>
                  <p className="text-xs text-primary font-semibold mt-2">
                    {toursCount} Tours
                  </p>
                </div>

                {/* Actions */}
                <div className="border-t px-4 py-3 flex items-center gap-2">
                  <Link
                    href={`/admin/destinations/view/${d._id}`}
                    className="flex-1"
                  >
                    <Button variant="outline" size="sm" className="w-full">
                      <Eye className="w-4 h-4 mr-1" /> View
                    </Button>
                  </Link>
                  <Link
                    href={`/admin/destinations/${d._id}`}
                    className="flex-1"
                  >
                    <Button variant="outline" size="sm" className="w-full">
                      <Pencil className="w-4 h-4 mr-1" /> Edit
                    </Button>
                  </Link>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(d._id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
