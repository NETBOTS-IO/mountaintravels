"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, MessageSquare, ExternalLink, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function RateUsPage() {
  const googleReviewLink = "https://g.page/r/CaPXR3GWsVSZEAI/review";
  // Generate QR code dynamically via qrserver API
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
    googleReviewLink,
  )}`;

  return (
    <div className="min-h-screen bg-background pt-24 pb-12 flex items-center justify-center relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[50%] h-[50%] bg-[#ff9800]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 max-w-3xl">
        <div className="bg-card border border-border shadow-2xl rounded-3xl overflow-hidden text-center p-8 md:p-12">
          {/* Icon Header */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center">
              <Star className="w-10 h-10 fill-[#ff9800] text-[#ff9800]" />
            </div>
          </div>

          <h1 className="text-3xl md:text-5xl font-display font-extrabold text-foreground mb-4">
            We Value Your <span className="text-primary">Feedback!</span>
          </h1>

          <p className="text-muted-foreground text-sm md:text-base max-w-lg mx-auto mb-10 leading-relaxed">
            Your feedback helps us improve our services and allows others to
            experience the majestic beauty of Pakistan with confidence. We would
            love to hear about your adventure with Mountain Travels Pakistan.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-muted/30 p-6 md:p-8 rounded-2xl border border-border/50">
            {/* Button Section */}
            <div className="space-y-6 flex flex-col items-center">
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="w-6 h-6 fill-[#ff9800] text-[#ff9800] animate-pulse"
                    style={{ animationDelay: `${star * 0.1}s` }}
                  />
                ))}
              </div>
              <h3 className="font-bold text-lg text-foreground">
                Rate us on Google Maps
              </h3>
              <a
                href={googleReviewLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button
                  size="lg"
                  className="w-full text-md font-bold py-6 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-lg hover:shadow-primary/30 transition-all hover:-translate-y-1 group"
                >
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Leave a Review
                  <ExternalLink className="w-4 h-4 ml-2 opacity-70 group-hover:opacity-100 transition-opacity" />
                </Button>
              </a>
            </div>

            {/* QR Code Section */}
            <div className="flex flex-col items-center space-y-4 border-t md:border-t-0 md:border-l border-border/50 pt-8 md:pt-0 md:pl-8">
              <div className="flex items-center text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-2">
                <QrCode className="w-4 h-4 mr-2" />
                Or Scan to Review
              </div>
              <div className="bg-white p-3 rounded-2xl shadow-sm border border-border inline-block">
                <Image
                  src={qrCodeUrl}
                  alt="Scan to Review Mountain Travels Pakistan"
                  width={180}
                  height={180}
                  className="rounded-xl"
                />
              </div>
              <p className="text-[11px] text-muted-foreground">
                Scan using your phone's camera
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-border">
            <Link
              href="/"
              className="text-sm font-medium text-primary hover:text-[#ff9800] transition-colors"
            >
              &larr; Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
