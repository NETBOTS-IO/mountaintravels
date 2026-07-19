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
import { motion, AnimatePresence } from "framer-motion";

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
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);

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

  const handleMouseEnter = (name: string) => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    setOpenDesktopDropdown(name);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setOpenDesktopDropdown(null);
    }, 150);
    setHoverTimeout(timeout);
  };

  return (
    <header
      className="sticky top-0 z-50 w-full shadow-sm"
      id="main-site-header"
    >
      {/* Top Bar - Locked to primary teal background */}
      <div className="bg-[#45919c] text-white py-1.5" id="top-bar-header">
        <div className="container mx-auto px-4 flex flex-row justify-between items-center text-[11px] md:text-xs">
          <div className="flex items-center space-x-3">
            <a
              href={`tel:${siteConfig.contact.phone}`}
              className="flex items-center transition-colors hover:text-[#ff9800] text-white"
            >
              <Phone className="h-3 w-3 mr-1" />
              <span>{siteConfig.contact.phone}</span>
            </a>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="flex items-center transition-colors hover:text-[#ff9800] text-white"
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
                className="transition-colors hover:text-[#ff9800] text-white"
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

      {/* Main Navigation - Locked to solid white background */}
      <div
        className="w-full bg-white text-gray-900 border-b border-gray-100 relative"
        id="navbar-main-container"
      >
        <div className="container mx-auto px-4 py-1.5 md:py-2 flex justify-between items-center">
          <Link href="/" className="flex items-center relative z-20">
            <Image
              src="/assets/logo/logo.webp"
              alt={siteConfig.name}
              width={100}
              height={50}
              className="h-9 w-auto md:h-12"
            />
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex items-center transition-colors text-gray-800 relative z-20"
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
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-3">
            {mainMenu.map((item) =>
              item.children ? (
                <div
                  key={item.name}
                  className="relative group"
                  onMouseEnter={() => handleMouseEnter(item.name)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    href={item.children[0]?.path || "#"}
                    className="text-sm lg:text-[15px] font-semibold hover:text-[#ff9800] hover:bg-slate-50 px-3 py-2 rounded-full transition-all duration-300 flex items-center text-gray-800"
                  >
                    {item.name}
                    <ChevronDown
                      className={`ml-1 h-3.5 w-3.5 transition-transform duration-300 ${
                        openDesktopDropdown === item.name
                          ? "rotate-180 text-[#ff9800]"
                          : "text-gray-400"
                      }`}
                    />
                  </Link>
                  <AnimatePresence>
                    {openDesktopDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 5, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute left-0 mt-2 w-64 bg-white/95 backdrop-blur-md text-gray-900 shadow-2xl rounded-2xl border border-gray-100/50 overflow-hidden"
                      >
                        <div className="p-2">
                          <ul className="flex flex-col space-y-1">
                            {item.children.map((child) => (
                              <li key={child.name}>
                                <Link
                                  href={child.path}
                                  className="block px-4 py-2.5 text-sm font-medium rounded-xl hover:bg-[#ff9800]/10 hover:text-[#ff9800] transition-colors relative group"
                                  onClick={() => setOpenDesktopDropdown(null)}
                                >
                                  <span className="relative z-10">
                                    {child.name}
                                  </span>
                                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-[#ff9800] rounded-r-md group-hover:h-1/2 transition-all duration-300"></div>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.path}
                  className="text-sm lg:text-[15px] font-semibold hover:text-[#ff9800] hover:bg-slate-50 px-3 py-2 rounded-full transition-all duration-300 text-gray-800"
                >
                  {item.name}
                </Link>
              ),
            )}
          </nav>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-xl overflow-hidden z-40"
            >
              <nav className="p-4 max-h-[80vh] overflow-y-auto">
                <ul className="space-y-2">
                  {mainMenu.map((item) => (
                    <li key={item.name}>
                      {item.children ? (
                        <div className="bg-slate-50/50 rounded-xl overflow-hidden">
                          <button
                            onClick={() => toggleMobileDropdown(item.name)}
                            className="flex items-center justify-between w-full px-4 py-3 text-[15px] font-semibold hover:text-[#ff9800] transition-colors"
                          >
                            {item.name}
                            <ChevronDown
                              className={`h-4 w-4 transition-transform duration-300 ${
                                openMobileDropdown === item.name
                                  ? "rotate-180 text-[#ff9800]"
                                  : "text-gray-400"
                              }`}
                            />
                          </button>
                          <AnimatePresence>
                            {openMobileDropdown === item.name && (
                              <motion.ul
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="bg-white/50 px-4 pb-3 space-y-1"
                              >
                                {item.children.map((child) => (
                                  <li key={child.name}>
                                    <Link
                                      href={child.path}
                                      className="block text-sm font-medium py-2 px-3 rounded-lg hover:bg-[#ff9800]/10 hover:text-[#ff9800] transition-colors"
                                      onClick={() => setIsMenuOpen(false)}
                                    >
                                      {child.name}
                                    </Link>
                                  </li>
                                ))}
                              </motion.ul>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Link
                          href={item.path}
                          className="block px-4 py-3 text-[15px] font-semibold hover:text-[#ff9800] hover:bg-slate-50 rounded-xl transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
