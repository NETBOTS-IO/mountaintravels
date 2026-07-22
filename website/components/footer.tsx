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
    <footer className="relative bg-[#112a30] text-gray-200 border-t border-[#45919c]/20 pt-10 pb-6 overflow-hidden">
      {/* Decorative Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#112a30] via-[#163a43] to-[#1c4b57] opacity-95 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Main Grid in a single compact row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-4">
          {/* Logo & Intro Brand Card */}
          <div className="space-y-2">
            <Link
              href="/"
              className="inline-block hover:scale-105 transition-transform"
            >
              <Image
                src="/assets/logo/logo.webp"
                alt={siteConfig.name}
                width={120}
                height={60}
                className="h-11 w-auto brightness-110 rounded-md"
              />
            </Link>
            <p className="text-xs text-gray-400 font-light leading-relaxed">
              Official Tourism Specialist Since 1990. Supporting trekking,
              mountaineering, and expeditions in Pakistan.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white border-l-2 border-[#ff9800] pl-1.5">
              Quick Links
            </h4>
            <ul className="grid grid-cols-1 gap-1.5 text-xs text-gray-300">
              <li>
                <Link
                  href="/booking-info"
                  className="hover:text-[#ff9800] flex items-center transition-colors"
                >
                  <ArrowRight className="h-3 w-3 mr-1 text-[#ff9800]/70" />
                  Booking Info
                </Link>
              </li>

              <li>
                <Link
                  href="/terms-of-service"
                  className="hover:text-[#ff9800] flex items-center transition-colors"
                >
                  <ArrowRight className="h-3 w-3 mr-1 text-[#ff9800]/70" />
                  Terms
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="hover:text-[#ff9800] flex items-center transition-colors"
                >
                  <ArrowRight className="h-3 w-3 mr-1 text-[#ff9800]/70" />
                  Privacy
                </Link>
              </li>
            </ul>
          </div>

          {/* Tour Categories */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white border-l-2 border-[#ff9800] pl-1.5">
              Categories
            </h4>
            <ul className="grid grid-cols-1 gap-1.5 text-xs text-gray-300">
              {tourCategories
                .filter((category) => category.id !== "all")
                .slice(0, 5)
                .map((category) => (
                  <li key={category.id}>
                    <Link
                      href={`/tours?category=${category.id}`}
                      className="hover:text-[#ff9800] flex items-center transition-colors"
                    >
                      <ArrowRight className="h-3 w-3 mr-1 text-[#ff9800]/70" />
                      {category.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          {/* Pakistan Offices */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white border-l-2 border-[#ff9800] pl-1.5">
              Offices
            </h4>
            <div className="space-y-2 text-xs text-gray-400">
              <div className="leading-tight">
                <span className="font-semibold text-white block">
                  Skardu Head Office
                </span>
                Aliabad Satellite Town, Skardu, Pakistan
                <span className="block text-gray-300 mt-1">
                  +92 339 8486900
                </span>
              </div>
              <div className="leading-tight pt-1 border-t border-white/5">
                <span className="font-semibold text-white block">
                  Islamabad Office
                </span>
                H#1280, St#29, FMC B-17, Islamabad
                <span className="block text-gray-300 mt-1">
                  +92 339 8486900
                </span>
              </div>
            </div>
          </div>

          {/* USA Support & Channels */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white border-l-2 border-[#ff9800] pl-1.5">
              Global Support
            </h4>
            <div className="space-y-2 text-xs text-gray-400">
              <div className="leading-tight">
                <span className="font-semibold text-white block">
                  USA Office
                </span>
                Federal Way, Washington 98003, USA
                <span className="block text-gray-300">+1 (206) 335-4272</span>
              </div>
              <div className="pt-1 border-t border-white/5 space-y-0.5">
                <span className="block text-white">
                  info@mountaintravels.com
                </span>
                <span className="block text-white font-medium">
                  WhatsApp: +92 339 8486900
                </span>
              </div>
              <div className="flex space-x-2.5 pt-1">
                {siteConfig.social.map((item) => (
                  <a
                    key={item.name}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#ff9800] text-gray-400 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                    aria-label={item.name}
                  >
                    {getIcon(item.icon)}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright section */}
        <div className="border-t border-white/5 pt-4 mt-6 text-center text-xs text-gray-500 font-light flex flex-col md:flex-row justify-between items-center gap-1">
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
              Net Bots (SMC-Private) Limited
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
