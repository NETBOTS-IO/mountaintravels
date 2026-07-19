"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { siteConfig, mainMenu } from "@/data/siteConfig";
import { tourCategories } from "@/data/tourPackages";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/app/Var";

export function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [message, setMessage] = useState("");

  const getIcon = (icon: string) => {
    switch (icon) {
      case "facebook":
        return <Facebook className="h-4 w-4 md:h-5 md:w-5" />;
      case "instagram":
        return <Instagram className="h-4 w-4 md:h-5 md:w-5" />;
      case "twitter":
        return <Twitter className="h-4 w-4 md:h-5 md:w-5" />;
      case "linkedin":
        return <Linkedin className="h-4 w-4 md:h-5 md:w-5" />;
      default:
        return null;
    }
  };

  // Newsletter submit
  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      await axios.post(`${BASE_URL}/api/contacts/add`, {
        source: "NEWSLETTER",
        name: newsletterEmail, // use email as name
        email: newsletterEmail,
        phone: newsletterEmail, // fallback
        subject: "General Query",
        interests: "newsletter",
        message: "Newsletter Subscription",
      });

      setMessage(
        "🎉 You have successfully subscribed to our newsletter! We will be in touch with you for any updates ",
      );
      setNewsletterEmail("");
    } catch (error) {
      console.error("Newsletter subscription failed:", error);
      setMessage("❌ Subscription failed. Please try again.");
    }
  };

  return (
    <footer className="relative bg-[#112a30] text-gray-200 border-t border-[#45919c]/20 pt-10 pb-4 overflow-hidden">
      {/* Decorative Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#112a30] via-[#163a43] to-[#1c4b57] opacity-95 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Top Centered Logo & Brief Intro */}
        <div className="flex flex-col items-center text-center pb-8 border-b border-white/5 mb-8">
          <Link href="/" className="mb-3 hover:scale-105 transition-transform">
            <Image
              src="/assets/logo/logo.png"
              alt={siteConfig.name}
              width={160}
              height={80}
              className="h-16 w-auto brightness-110 drop-shadow-[0_2px_10px_rgba(255,255,255,0.1)]"
            />
          </Link>
          <p className="text-xs md:text-sm text-gray-300 max-w-2xl font-light leading-relaxed">
            Official Tourism Specialist Since 1990. Guiding trekking,
            mountaineering, and cultural expeditions across Karakoram, Hindu
            Kush, and Himalaya ranges.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white border-l-2 border-[#ff9800] pl-2">
              Quick Links
            </h4>
            <ul className="grid grid-cols-1 gap-2 text-xs md:text-sm text-gray-300">
              <li>
                <Link
                  href="/booking-info"
                  className="hover:text-[#ff9800] flex items-center transition-colors"
                >
                  <ArrowRight className="h-3 w-3 mr-1.5 text-[#ff9800]/70" />
                  Booking Information
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#ff9800] flex items-center transition-colors"
                >
                  <ArrowRight className="h-3 w-3 mr-1.5 text-[#ff9800]/70" />
                  Blogs
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-service"
                  className="hover:text-[#ff9800] flex items-center transition-colors"
                >
                  <ArrowRight className="h-3 w-3 mr-1.5 text-[#ff9800]/70" />
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="hover:text-[#ff9800] flex items-center transition-colors"
                >
                  <ArrowRight className="h-3 w-3 mr-1.5 text-[#ff9800]/70" />
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/sitemap-page"
                  className="hover:text-[#ff9800] flex items-center transition-colors"
                >
                  <ArrowRight className="h-3 w-3 mr-1.5 text-[#ff9800]/70" />
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>

          {/* Tour Categories */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white border-l-2 border-[#ff9800] pl-2">
              Tour Categories
            </h4>
            <ul className="grid grid-cols-1 gap-2 text-xs md:text-sm text-gray-300">
              {tourCategories
                .filter((category) => category.id !== "all")
                .map((category) => (
                  <li key={category.id}>
                    <Link
                      href={`/tours?category=${category.id}`}
                      className="hover:text-[#ff9800] flex items-center transition-colors"
                    >
                      <ArrowRight className="h-3 w-3 mr-1.5 text-[#ff9800]/70" />
                      {category.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          {/* Offices Contact Details Column 1 */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white border-l-2 border-[#ff9800] pl-2">
              Offices In Pakistan
            </h4>
            <div className="space-y-3 text-xs md:text-sm text-gray-300">
              <div className="p-3 bg-white/5 rounded-xl border border-white/5 space-y-1">
                <p className="font-semibold text-white flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-[#ff9800]" />
                  Skardu Head Office
                </p>
                <p className="font-light text-gray-400 leading-tight">
                  Ghangchan House, Aliabad Satellite Town, Skardu City, GB,
                  Pakistan
                </p>
                <p className="text-gray-300 flex items-center gap-1 pt-1 font-light">
                  <Phone className="h-3 w-3 text-gray-400" />
                  +92 346 8486900
                </p>
              </div>

              <div className="p-3 bg-white/5 rounded-xl border border-white/5 space-y-1">
                <p className="font-semibold text-white flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-[#ff9800]" />
                  Islamabad Office
                </p>
                <p className="font-light text-gray-400 leading-tight">
                  Ghangchan House H#1280, St#29, Block A, FMC Sector B-17,
                  Pakistan
                </p>
                <p className="text-gray-300 flex items-center gap-1 pt-1 font-light">
                  <Phone className="h-3 w-3 text-gray-400" />
                  +92 346 8486900
                </p>
              </div>
            </div>
          </div>

          {/* Offices Contact Details Column 2 */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white border-l-2 border-[#ff9800] pl-2">
              Global Support
            </h4>
            <div className="space-y-3 text-xs md:text-sm text-gray-300">
              <div className="p-3 bg-white/5 rounded-xl border border-white/5 space-y-1">
                <p className="font-semibold text-white flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-[#ff9800]" />
                  USA Liaison Office
                </p>
                <p className="font-light text-gray-400 leading-tight">
                  412 S 325th Pl Apt S3, Federal Way, Washington 98003, USA
                </p>
                <p className="text-gray-300 flex items-center gap-1 pt-1 font-light">
                  <Phone className="h-3 w-3 text-gray-400" />
                  +1 (206) 335-4272
                </p>
              </div>

              <div className="p-3 bg-white/5 rounded-xl border border-white/5 space-y-2">
                <div className="text-xs">
                  <span className="text-gray-400 block font-light">
                    Direct Email
                  </span>
                  <a
                    href="mailto:info@mountaintravels.com"
                    className="hover:underline hover:text-[#ff9800] text-white"
                  >
                    info@mountaintravels.com
                  </a>
                </div>
                <div className="text-xs">
                  <span className="text-gray-400 block font-light">
                    WhatsApp Support
                  </span>
                  <a
                    href="https://wa.me/923468486900"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline hover:text-[#ff9800] text-white font-medium"
                  >
                    +92 346 8486900
                  </a>
                </div>
                <div className="flex space-x-3 pt-1 border-t border-white/5">
                  {siteConfig.social.map((item) => (
                    <a
                      key={item.name}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#ff9800] text-gray-400 transition-colors"
                      aria-label={item.name}
                    >
                      {getIcon(item.icon)}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright section */}
        <div className="border-t border-white/5 pt-4 mt-6 text-center text-[10px] md:text-xs text-gray-500 font-light flex flex-col md:flex-row justify-between items-center gap-2">
          <p>
            &copy; {new Date().getFullYear()} Mountain Travels Pakistan. All
            rights reserved.
          </p>
          <p>
            Designed and developed by{" "}
            <a
              href="https://netbots.io"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-[#ff9800] transition-colors"
            >
              Net-bots (SMC-Private) Limited
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
