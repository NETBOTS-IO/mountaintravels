"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { Calendar, Users, Map, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BASE_URL } from "@/app/Var";

const categories = [
  "Trekking",
  "Expeditions",
  "Mountain Biking",
  "Cultural Tours",
  "Safari",
  "Hunting",
  "Tour",
  "Trips",
];

export default function ToursPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState("all");
  const [tours, setTours] = useState<Tour[]>([]);
  const [filteredTours, setFilteredTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Read category from URL on first load
  useEffect(() => {
    const category = searchParams.get("category");
    if (category) {
      setActiveCategory(category);
    } else {
      setActiveCategory("all");
    }
  }, [searchParams]);

  // ✅ Fetch tours (only featured ones)
  useEffect(() => {
    async function fetchTours() {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(`${BASE_URL}/api/tours`);

        // ✅ Filter only featured tours
        const featuredTours = response.data.data.filter(
          (tour: any) => tour.featured === true
        );
  

        setTours(featuredTours);
      } catch (error) {
        console.error("Failed to fetch tours:", error);
        setError("Failed to load tours. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchTours();
  }, []);

  // ✅ Filter tours by category (from URL)
  useEffect(() => {
    if (activeCategory === "all") {
      setFilteredTours(tours);
    } else {
      setFilteredTours(
        tours.filter(
          (tour) =>
            tour.category?.toLowerCase() === activeCategory.toLowerCase()
        )
      );
    }
  }, [activeCategory, tours]);

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    router.push(`/tours?category=${categoryId}`, { scroll: false });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">
        {activeCategory === "all" ? "Our Tours" : `${activeCategory} Tours`}
      </h1>

      {/* Category Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <Button
          onClick={() => handleCategoryChange("all")}
          variant={activeCategory === "all" ? "default" : "outline"}
          className="text-lg"
        >
          All Tours
        </Button>
        {categories.map((category) => (
          <Button
            key={category}
            onClick={() => handleCategoryChange(category)}
            variant={activeCategory === category ? "default" : "outline"}
            className="text-lg"
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center py-12">
          <p className="text-2xl text-gray-600">Loading tours...</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="text-center py-12 text-red-500">
          <p className="text-2xl">{error}</p>
        </div>
      )}

      {/* Tour List */}
      {!loading && filteredTours.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTours.map((tour) => (
            <Link key={tour._id} href={`/tours/detail/${tour._id}`}>
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full">
                {/* Image */}
                <div className="relative h-56">
                  <Image
                    src={`${BASE_URL}${tour.images[0]}` || "/placeholder.svg"}
                    alt={tour.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge
                      variant="secondary"
                      className="text-lg font-semibold px-3 py-1"
                    >
                      ${tour.price}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <Badge variant="secondary" className="text-base px-2 py-1">
                      {tour.difficulty}
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-bold text-xl mb-1 text-primary line-clamp-2">
                    {tour.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {tour.description}
                  </p>

                  {/* Details */}
                  <div className="grid grid-cols-2 gap-2 mb-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Map className="w-4 h-4 mr-2 text-primary" />
                      {tour.country}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-primary" />
                      {tour.days} Days
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2 text-primary" />
                      {tour.groupSize}
                    </div>
                    <div className="flex items-center">
                      <Sun className="w-4 h-4 mr-2 text-primary" />
                      {tour.bestTime}
                    </div>
                  </div>

                  {/* Button */}
                  <Button className="w-full text-base mt-auto">
                    View Details
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        !loading && (
          <div className="text-center py-12">
            <p className="text-2xl text-gray-600">
              No tours available for the selected category.
            </p>
          </div>
        )
      )}
    </div>
  );
}
