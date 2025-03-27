"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import {
  Calendar,
  Users,
  Map,
  Sun,
  Mountain,
  Compass,
  Bike,
  Snowflake,
  Landmark,
  Tent,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BASE_URL } from "@/app/Var";

const categories = [
  "Trekking",
  "Expedition",
  "Mountain Biking",
  "Cultural Tours",
  "Safari",
  "Hunting",
];

export default function ToursPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState("all");
  const [tours, setTours] = useState<Tour[]>([]);
  const [filteredTours, setFilteredTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const category = searchParams.get("category");
    if (category) {
      setActiveCategory(category);
    }
  }, [searchParams]);

  useEffect(() => {
    async function fetchTours() {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(`${BASE_URL}/api/tours`);
        console.log("Fetched tours:", response.data.data);
        setTours(response.data.data);
      } catch (error) {
        console.error("Failed to fetch tours:", error);
        setError("Failed to load tours. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchTours();
  }, []);

  useEffect(() => {
    if (activeCategory === "all") {
      setFilteredTours(tours);
    } else {
      setFilteredTours(
        tours.filter((tour) => tour.category === activeCategory)
      );
    }
  }, [activeCategory, tours]);

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    router.push(`/tours?category=${categoryId}`, { scroll: false });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Our Tours</h1>

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

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <p className="text-2xl text-gray-600">Loading tours...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center py-12 text-red-500">
          <p className="text-2xl">{error}</p>
        </div>
      )}

      {/* Tour List */}
      {!loading && filteredTours.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTours.map((tour) => (
            <Link key={tour._id} href={`/tours/detail/${tour._id}`}>
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-64">
                  <Image
                    src={`${BASE_URL}${tour.images[0]}` || "/placeholder.svg"}
                    alt={tour.title}
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
                <div className="p-6">
                  <h3 className="font-bold text-2xl mb-2 text-primary line-clamp-2">
                    {tour.title}
                  </h3>

                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {tour.description}
                  </p>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Map className="w-10 h-10 mr-2 text-primary" />
                      {tour.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-5 h-5 mr-2 text-primary" />
                      {tour.days} Days
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="w-5 h-5 mr-2 text-primary" />
                      {tour.groupSize}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Sun className="w-5 h-5 mr-2 text-primary" />
                      {tour.bestSeason}
                    </div>
                  </div>
                  <Button className="w-full text-lg">View Details</Button>
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
