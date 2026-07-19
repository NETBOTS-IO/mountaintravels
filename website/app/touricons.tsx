"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Mountain,
  Compass,
  Landmark,
  Binoculars,
  Bike,
  Snowflake,
} from "lucide-react";

// Define your categories
const categories = [
  {
    id: "trekking",
    name: "Trekking",
    icon: Mountain,
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
  },
  {
    id: "expeditions",
    name: "Expeditions",
    icon: Compass,
    color: "from-red-500 to-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
  },
  {
    id: "cultural-tour",
    name: "Cultural Tour",
    icon: Landmark,
    color: "from-indigo-500 to-indigo-600",
    bgColor: "bg-indigo-50",
    borderColor: "border-indigo-200",
  },
  {
    id: "safari",
    name: "Safari",
    icon: Binoculars,
    color: "from-yellow-500 to-yellow-600",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
  },
  {
    id: "mountain-biking",
    name: "Mountain Biking",
    icon: Bike,
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
  },
  {
    id: "skiing",
    name: "Skiing",
    icon: Snowflake,
    color: "from-teal-500 to-teal-600",
    bgColor: "bg-teal-50",
    borderColor: "border-teal-200",
  },
];

export default function TourIcons() {
  return (
    <div className="w-full">
      {/* Section Header */}
      <h3 className="text-sm font-bold uppercase tracking-wider text-center text-muted-foreground mb-8">
        Explore Adventure Categories
      </h3>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <Link
              key={cat.id}
              href={`/tours?category=${cat.id}`}
              className="group"
            >
              <div
                className={`relative bg-background border border-border rounded-2xl p-5 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-lg hover:border-[#45919c]/40 hover:-translate-y-1.5 transition-all duration-300`}
              >
                {/* Colored Icon Wrapper */}
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} text-white shadow-md group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 mb-3`}
                >
                  <Icon className="w-5 h-5" />
                </div>

                {/* Title */}
                <h4 className="text-xs font-bold text-foreground group-hover:text-[#ff9800] transition-colors duration-300">
                  {cat.name}
                </h4>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
