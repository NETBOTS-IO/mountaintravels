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
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-4 py-4 md:py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="space-y-3">
            <div className="flex items-center mb-1">
              <Image
                src="/assets/logo/logo.png"
                alt={siteConfig.name}
                width={120}
                height={60}
                className="h-12 w-auto md:h-16"
              />
            </div>
            <p className="text-xs md:text-sm text-white/80 font-light leading-relaxed">
              Official Tourism Specialist Since 1990. Supporting trekking,
              mountaineering, and cultural expeditions across Karakoram, Hindu
              Kush, and Himalaya ranges.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg md:text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm md:text-base">
              <li>
                <Link
                  href="/booking-info"
                  className="hover:text-secondary flex items-center"
                >
                  <ArrowRight className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                  Booking Information
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-secondary flex items-center"
                >
                  <ArrowRight className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                  Blogs
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-service"
                  className="hover:text-secondary flex items-center"
                >
                  <ArrowRight className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="hover:text-secondary flex items-center"
                >
                  <ArrowRight className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/sitemap-page"
                  className="hover:text-secondary flex items-center"
                >
                  <ArrowRight className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>

          {/* Tour Categories */}
          <div>
            <h3 className="text-lg md:text-xl font-bold mb-4">
              Tour Categories
            </h3>
            <ul className="space-y-2 text-sm md:text-base">
              {tourCategories
                .filter((category) => category.id !== "all")
                .map((category) => (
                  <li key={category.id}>
                    <Link
                      href={`/tours?category=${category.id}`}
                      className="hover:text-secondary flex items-center"
                    >
                      <ArrowRight className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                      {category.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          {/* Contact Details & Offices */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-lg md:text-xl font-bold mb-3 pb-1 border-b border-white/10">
              Our Locations & Contacts
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs md:text-sm">
              <div className="space-y-2">
                <p className="font-semibold text-white/95 flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-[#ff9800] shrink-0" />
                  Skardu Head Office
                </p>
                <p className="text-white/75 font-light leading-relaxed pl-5">
                  Ghangchan House, Aliabad Satellite Town,
                  <br />
                  Skardu City, Gilgit-Baltistan, Pakistan
                </p>
                <p className="text-white/75 font-light pl-5 flex items-center gap-1">
                  <Phone className="h-3 w-3 shrink-0" />
                  +92 346 8486900
                </p>
              </div>

              <div className="space-y-2">
                <p className="font-semibold text-white/95 flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-[#ff9800] shrink-0" />
                  Islamabad Liaison Office
                </p>
                <p className="text-white/75 font-light leading-relaxed pl-5">
                  Ghangchan House H#1280, St#29, Block A,
                  <br />
                  FMC Sector B-17, Pakistan
                </p>
                <p className="text-white/75 font-light pl-5 flex items-center gap-1">
                  <Phone className="h-3 w-3 shrink-0" />
                  +92 346 8486900
                </p>
              </div>

              <div className="space-y-2">
                <p className="font-semibold text-white/95 flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-[#ff9800] shrink-0" />
                  USA Liaison Office
                </p>
                <p className="text-white/75 font-light leading-relaxed pl-5">
                  412 S 325th Pl Apt S3,
                  <br />
                  Federal Way, Washington 98003, USA
                </p>
                <p className="text-white/75 font-light pl-5 flex items-center gap-1">
                  <Phone className="h-3 w-3 shrink-0" />
                  +1 (206) 335-4272
                </p>
              </div>

              <div className="space-y-2.5">
                <p className="font-semibold text-white/95 flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5 text-[#ff9800] shrink-0" />
                  Direct Channels
                </p>
                <div className="pl-5 space-y-1.5 text-white/80 font-light">
                  <p>
                    Email:{" "}
                    <a
                      href="mailto:info@mountaintravels.com"
                      className="hover:underline hover:text-[#ff9800]"
                    >
                      info@mountaintravels.com
                    </a>
                  </p>
                  <p className="flex items-center gap-1">
                    WhatsApp:{" "}
                    <a
                      href="https://wa.me/923468486900"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline hover:text-[#ff9800] inline-flex items-center font-medium"
                    >
                      +92 346 8486900
                    </a>
                  </p>
                </div>

                <div className="pl-5 pt-1.5">
                  <p className="font-semibold text-xs text-white/90 mb-1.5">
                    Follow Us
                  </p>
                  <div className="flex space-x-3">
                    {siteConfig.social.map((item) => (
                      <a
                        key={item.name}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[#ff9800] text-white/80 transition-colors"
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
        </div>

        <div className="border-t border-white/20 mt-3 pt-2 text-center text-xs">
          <p>
            &copy; {new Date().getFullYear()} Mountain Travels Pakistan. All
            rights reserved.
          </p>
          <p className="mt-1">
            Designed and developed by{" "}
            <a
              href="https://netbots.io"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-secondary"
            >
              Net-bots (SMC-Private) Limited
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
