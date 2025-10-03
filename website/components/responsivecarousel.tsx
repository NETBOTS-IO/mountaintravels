"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {useMobile} from "@/hooks/use-mobile";

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

  const perPage = isMobile ? 1 : 3;
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
            <Button
              variant="outline"
              size="icon"
              onClick={prev}
              className="rounded-full"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={next}
              className="rounded-full"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Cards */}
        <div className="overflow-hidden">
          {isMobile ? (
            items[currentIndex] && (
              <div className="w-full flex justify-center">
                <div className="bg-white text-black rounded-xl shadow-sm hover:shadow-md border border-gray-200">
                  {renderCard(items[currentIndex])}
                </div>
              </div>
            )
          ) : (
            <div className="flex pb-6 -mx-4 px-4">
              {items
                .slice(currentIndex * perPage, (currentIndex + 1) * perPage)
                .map((item, idx) => (
                  <div
                    key={idx}
                    className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 pr-4"
                  >
                    <div className="bg-white text-black rounded-xl shadow-sm hover:shadow-md border border-gray-200">
                      {renderCard(item)}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
