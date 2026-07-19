"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { siteConfig, mainMenu } from "@/data/siteConfig";
import { cn } from "@/lib/utils";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(
    null,
  );
  const [openDesktopDropdown, setOpenDesktopDropdown] = useState<string | null>(
    null,
  );
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      // Determine if page has been scrolled down past 20px
      setScrolled(currentScrollPos > 20);

      // Hide menu when scrolling down, show when scrolling up
      if (currentScrollPos < 10) {
        setVisible(true);
      } else {
        setVisible(prevScrollPos > currentScrollPos);
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleMobileDropdown = (name: string) =>
    setOpenMobileDropdown(openMobileDropdown === name ? null : name);
  const toggleDesktopDropdown = (name: string) =>
    setOpenDesktopDropdown(openDesktopDropdown === name ? null : name);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300 transform",
        visible ? "translate-y-0" : "-translate-y-full",
      )}
      id="main-site-header"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Bar */}
      <div
        className={cn(
          "transition-all duration-300 py-1 border-b text-white",
          scrolled || isHovered
            ? "bg-white text-gray-800 border-gray-100"
            : "bg-[#45919c]/90 backdrop-blur-md border-transparent",
        )}
        id="top-bar-header"
      >
        <div className="container mx-auto px-4 flex flex-row justify-between items-center text-[11px] md:text-xs">
          <div className="flex items-center space-x-3">
            <a
              href={`tel:${siteConfig.contact.phone}`}
              className={cn(
                "flex items-center transition-colors hover:text-[#ff9800]",
                scrolled || isHovered ? "text-gray-600" : "text-white",
              )}
            >
              <Phone className="h-3 w-3 mr-1" />
              <span>{siteConfig.contact.phone}</span>
            </a>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className={cn(
                "flex items-center transition-colors hover:text-[#ff9800]",
                scrolled || isHovered ? "text-gray-600" : "text-white",
              )}
            >
              <Mail className="h-3 w-3 mr-1" />
              <span>{siteConfig.contact.email}</span>
            </a>
          </div>
          <div className="flex items-center space-x-2.5">
            {siteConfig.social.map((item) => (
              <a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "transition-colors hover:text-[#ff9800]",
                  scrolled || isHovered ? "text-gray-500" : "text-white",
                )}
                aria-label={item.name}
              >
                {item.icon === "facebook" && (
                  <Facebook className="h-3.5 w-3.5" />
                )}
                {item.icon === "instagram" && (
                  <Instagram className="h-3.5 w-3.5" />
                )}
                {item.icon === "twitter" && <Twitter className="h-3.5 w-3.5" />}
                {item.icon === "linkedin" && (
                  <Linkedin className="h-3.5 w-3.5" />
                )}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div
        className={cn(
          "w-full transition-all duration-300 shadow-sm border-b",
          scrolled || isHovered
            ? "bg-white text-gray-900 border-gray-100"
            : "bg-black/35 backdrop-blur-md border-transparent",
        )}
        id="navbar-main-container"
      >
        <div className="container mx-auto px-4 py-1.5 md:py-2 flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/assets/logo/logo.png"
              alt={siteConfig.name}
              width={100}
              height={50}
              className="h-9 w-auto md:h-12"
            />
          </Link>

          {/* Mobile Menu Button */}
          <button
            className={cn(
              "md:hidden flex items-center transition-colors",
              scrolled || isHovered ? "text-gray-800" : "text-white",
            )}
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
            {mainMenu.map((item) =>
              item.children ? (
                <div key={item.name} className="relative">
                  <button
                    onClick={() => toggleDesktopDropdown(item.name)}
                    className={cn(
                      "text-sm lg:text-base font-medium hover:text-[#ff9800] transition-colors flex items-center",
                      scrolled || isHovered ? "text-gray-800" : "text-white",
                    )}
                  >
                    {item.name}
                    <ChevronDown
                      className={`ml-1 h-4 w-4 transition-transform ${
                        openDesktopDropdown === item.name ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openDesktopDropdown === item.name && (
                    <div className="absolute left-0 mt-2 w-48 bg-white text-gray-900 shadow-lg rounded-lg border border-gray-100">
                      <ul className="py-2">
                        {item.children.map((child) => (
                          <li key={child.name}>
                            <Link
                              href={child.path}
                              className="block px-4 py-2 text-sm hover:bg-[#ff9800] hover:text-white transition-colors"
                            >
                              {child.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.path}
                  className={cn(
                    "text-sm lg:text-base font-medium hover:text-[#ff9800] transition-colors",
                    scrolled || isHovered ? "text-gray-800" : "text-white",
                  )}
                >
                  {item.name}
                </Link>
              ),
            )}
          </nav>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "md:hidden fixed inset-0 bg-white z-50 transition-transform transform",
            isMenuOpen ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="flex justify-between items-center p-4 border-b">
            <Link
              href="/"
              className="flex items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              <Image
                src="/assets/logo/logo.png"
                alt={siteConfig.name}
                width={40}
                height={40}
                className="h-8 w-auto"
              />
              <span className="ml-2 font-bold text-lg text-primary">
                {siteConfig.shortName}
              </span>
            </Link>
            <button
              className="flex items-center"
              onClick={toggleMenu}
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="p-4">
            <ul className="space-y-4">
              {mainMenu.map((item) => (
                <li key={item.name}>
                  {item.children ? (
                    <div>
                      <button
                        onClick={() => toggleMobileDropdown(item.name)}
                        className="flex items-center justify-between w-full text-lg font-medium hover:text-primary transition-colors"
                      >
                        {item.name}
                        <ChevronDown
                          className={`h-5 w-5 transition-transform ${
                            openMobileDropdown === item.name ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {openMobileDropdown === item.name && (
                        <ul className="pl-4 mt-2 space-y-2">
                          {item.children.map((child) => (
                            <li key={child.name}>
                              <Link
                                href={child.path}
                                className="text-base hover:text-primary transition-colors block"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                {child.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.path}
                      className="text-lg font-medium hover:text-primary transition-colors block"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
