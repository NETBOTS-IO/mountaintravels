"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, Menu, X, ChevronDown } from "lucide-react"
import { FiFileText } from "react-icons/fi"
import { siteConfig, mainMenu } from "@/data/siteConfig"
import { cn } from "@/lib/utils"

// ---------------- Top Bar ----------------
function TopBar() {
  const whatsappNumber = "03468486900"; // Your WhatsApp number
  const whatsappLink = `https://wa.me/92${whatsappNumber.slice(1)}`; 
  return (
    <div className="bg-primary text-white py-1 md:py-2">
    <div className="container mx-auto px-4 flex flex-col sm:flex-row flex-wrap justify-between items-center gap-2">
      {/* Contact & License */}
      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 md:gap-3 text-xs md:text-sm">
        <a
          href={`tel:${siteConfig.contact.phone}`}
          className="flex items-center hover:text-secondary transition-colors min-w-[120px]"
        >
          <Phone className="h-3 w-3 md:h-4 md:w-4 mr-1" />
          <span>{siteConfig.contact.phone}</span>
        </a>
  
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center hover:text-secondary transition-colors min-w-[120px]"
          aria-label="WhatsApp"
        >
          <img
            src="/assets/home/icon-1.avif"
            alt="WhatsApp"
            className="h-4 w-4 md:h-5 md:w-5 mr-1"
          />
          <span>{whatsappNumber}</span>
        </a>
  
        <a
          href={`mailto:${siteConfig.contact.email}`}
          className="flex items-center hover:text-secondary transition-colors min-w-[140px]"
        >
          <Mail className="h-3 w-3 md:h-4 md:w-4 mr-1" />
          <span>{siteConfig.contact.email}</span>
        </a>
  
        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start text-center sm:text-left gap-1 md:gap-2 px-1 sm:px-0 min-w-[180px]">
          <span>License: Govt. of Pakistan License No. ID-302</span>
        </div>
      </div>
  
      {/* Social Icons */}
      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 md:gap-3">
        {siteConfig.social.map((item) => (
          <a
            key={item.name}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-secondary transition-colors"
            aria-label={item.name}
          >
            {item.icon === "facebook" && <Facebook className="h-4 w-4 md:h-5 md:w-5" />}
            {item.icon === "instagram" && <Instagram className="h-4 w-4 md:h-5 md:w-5" />}
            {item.icon === "twitter" && <Twitter className="h-4 w-4 md:h-5 md:w-5" />}
            {item.icon === "linkedin" && <Linkedin className="h-4 w-4 md:h-5 md:w-5" />}
          </a>
        ))}
      </div>
    </div>
  </div>
  
  )
}

// ---------------- Main Menu ----------------
function MainMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null)
  const [openDesktopDropdown, setOpenDesktopDropdown] = useState<string | null>(null)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const toggleMobileDropdown = (name: string) =>
    setOpenMobileDropdown(openMobileDropdown === name ? null : name)
  const toggleDesktopDropdown = (name: string) =>
    setOpenDesktopDropdown(openDesktopDropdown === name ? null : name)

  return (
    <div className="sticky top-0 z-40 bg-white/30 backdrop-blur-xl border-b border-white/15 shadow-md">
    <div className="container mx-auto px-4 py-1 md:py-3">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <div className="bg-white/30 backdrop-blur-xl border border-white/20 rounded-2xl px-3 py-2 shadow-lg">
            <Image
              src="/assets/logo/logo.png"
              alt={siteConfig.name}
              width={120}
              height={60}
              className="h-12 w-auto md:h-16"
              priority
            />
          </div>
        </Link>
  
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
          {mainMenu.map((item) =>
            item.children ? (
              <div key={item.name} className="relative">
                <button
                  onClick={() => toggleDesktopDropdown(item.name)}
                  className="text-sm lg:text-base font-medium text-black hover:text-orange-500 transition-colors flex items-center"
                >
                  {item.name}
                  <ChevronDown
                    className={`ml-1 h-4 w-4 transition-transform ${
                      openDesktopDropdown === item.name ? "rotate-180" : ""
                    }`}
                  />
                </button>
  
                {openDesktopDropdown === item.name && (
                  <div className="absolute left-0 mt-2 w-48 bg-white/30 backdrop-blur-xl border border-white/20 shadow-xl rounded-xl">
                    <ul className="py-2">
                      {item.children.map((child) => (
                        <li key={child.name}>
                          <Link
                            href={child.path}
                            className="block px-4 py-2 text-sm text-black hover:bg-white/20 transition-colors"
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
                className="text-sm lg:text-base font-medium text-black hover:text-orange-500 transition-colors"
              >
                {item.name}
              </Link>
            )
          )}
        </nav>
  
        {/* Mobile Menu Button */}
        <button className="md:hidden text-black" onClick={toggleMenu}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
  
      {/* Mobile Navigation */}
      <div
  className={cn(
    "md:hidden fixed inset-0 z-50 bg-white transition-transform transform",
    isMenuOpen ? "translate-x-0" : "translate-x-full"
  )}
>
  <div className="flex justify-between items-center p-4 border-b border-gray-200">
    <Link href="/" className="flex items-center" onClick={() => setIsMenuOpen(false)}>
      <div className="bg-white border border-gray-200 rounded-xl px-2 py-1">
        <Image
          src="/assets/logo/logo.png"
          alt={siteConfig.name}
          width={40}
          height={40}
          className="h-8 w-auto"
        />
      </div>
      <span className="ml-3 font-bold text-lg text-black">
        {siteConfig.shortName}
      </span>
    </Link>

    <button className="text-black" onClick={toggleMenu}>
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
                className="flex items-center justify-between w-full text-lg font-medium text-black hover:text-orange-500 transition-colors"
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
                        className="block text-base text-black hover:text-orange-500 transition-colors"
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
              className="block text-lg font-medium text-black hover:text-orange-500 transition-colors"
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
  </div>
  
  
  )
}

// ---------------- Parent Header ----------------
export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full">
      <TopBar />     {/* Solid background with email, phone, license */}
      <MainMenu />   {/* Transparent background with logo + menu */}
    </header>
  )
}
