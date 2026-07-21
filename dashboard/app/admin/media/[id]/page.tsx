"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Film,
  Image as ImageIcon,
  MapPin,
  Calendar,
  User,
  FileText,
} from "lucide-react";
import { getGalleryPhotoById } from "@/lib/data-utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BASE_URL } from "@/Var";

export default function ViewMediaItem() {
  const { id } = useParams();
  const router = useRouter();
  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getGalleryPhotoById(id as string).then((data) => {
        if (data) {
          setItem(data);
        }
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) {
    return (
      <div className="container py-8 text-center">Loading media details...</div>
    );
  }

  if (!item) {
    return (
      <div className="container py-8 text-center text-red-500">
        Media item not found
      </div>
    );
  }

  return (
    <div className="container">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-3xl font-bold">View Media Item</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side: Media Preview */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="overflow-hidden bg-black flex items-center justify-center min-h-[300px] md:min-h-[450px]">
            {item.src && item.src.length > 0 ? (
              item.type === "video" ? (
                <video
                  src={`${BASE_URL}/api/media/stream/${item.src[0].split("/").pop()}`}
                  className="max-h-[500px] w-full object-contain"
                  controls
                  autoPlay
                />
              ) : (
                <img
                  src={
                    item.src[0]?.startsWith("http")
                      ? item.src[0]
                      : `${BASE_URL}${item.src[0]}`
                  }
                  alt={item.title}
                  className="max-h-[500px] w-full object-contain"
                />
              )
            ) : (
              <span className="text-gray-400">No content available</span>
            )}
          </Card>
        </div>

        {/* Right Side: Media Details */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                {item.type === "video" ? (
                  <Film className="w-5 h-5 text-purple-600" />
                ) : (
                  <ImageIcon className="w-5 h-5 text-blue-600" />
                )}
                Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <span className="text-xs text-gray-400 block uppercase font-bold">
                  Title
                </span>
                <span className="text-base font-semibold text-gray-800">
                  {item.title}
                </span>
              </div>

              <div>
                <span className="text-xs text-gray-400 block uppercase font-bold">
                  Type
                </span>
                <span className="text-sm font-semibold capitalize text-gray-800">
                  {item.type || "image"}
                </span>
              </div>

              <div>
                <span className="text-xs text-gray-400 block uppercase font-bold">
                  Category
                </span>
                <span className="text-sm font-semibold text-gray-800">
                  {item.category}
                </span>
              </div>

              {item.location && (
                <div>
                  <span className="text-xs text-gray-400 block uppercase font-bold flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-orange-500" /> Location
                  </span>
                  <span className="text-sm text-gray-700">{item.location}</span>
                </div>
              )}

              {item.date && (
                <div>
                  <span className="text-xs text-gray-400 block uppercase font-bold flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-blue-500" /> Date
                  </span>
                  <span className="text-sm text-gray-700">{item.date}</span>
                </div>
              )}

              {item.photographer && (
                <div>
                  <span className="text-xs text-gray-400 block uppercase font-bold flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-green-500" /> Creator /
                    Photographer
                  </span>
                  <span className="text-sm text-gray-700">
                    {item.photographer}
                  </span>
                </div>
              )}

              {item.description && (
                <div className="pt-2 border-t">
                  <span className="text-xs text-gray-400 block uppercase font-bold flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5 text-gray-500" />{" "}
                    Description
                  </span>
                  <p className="text-sm text-gray-600 leading-relaxed mt-1">
                    {item.description}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
