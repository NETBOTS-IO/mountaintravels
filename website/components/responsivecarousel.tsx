"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMobile } from "@/hooks/use-mobile";

interface ResponsiveCarouselProps<T> {
  items: T[];
  renderCard: (item: T) => React.ReactNode;
  title: string;
}

export default function ResponsiveCarousel<T>({
  items,
  renderCard,
  title,
}: ResponsiveCarouselProps<T>) {
  const isMobile = useMobile();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Show 1 per page on mobile, otherwise show in pages of 3
  const perPage = isMobile ? 1 : 4;
  const totalPages = Math.ceil(items.length / perPage);

  const next = () => {
    if (items.length === 0) return;
    if (isMobile) {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    } else {
      setCurrentIndex((prev) => (prev + 1) % totalPages);
    }
  };

  const prev = () => {
    if (items.length === 0) return;
    if (isMobile) {
      setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    } else {
      setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
    }
  };

  return (
    <section className="py-8 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header with arrows */}
        <div className="flex justify-between items-center mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={prev} className="rounded-full">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={next} className="rounded-full">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Grid layout for cards */}
        <div className="overflow-hidden">
          {isMobile ? (
            items[currentIndex] && (
              <div className="w-full flex justify-center">
                <div className="bg-white text-black rounded-xl shadow-sm hover:shadow-md border border-gray-200 h-full w-full max-w-sm">
                  {renderCard(items[currentIndex])}
                </div>
              </div>
            )
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-6">
              {items
                .slice(currentIndex * perPage, (currentIndex + 1) * perPage)
                .map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white text-black rounded-xl shadow-sm hover:shadow-md border border-gray-200 h-full"
                  >
                    {renderCard(item)}
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
