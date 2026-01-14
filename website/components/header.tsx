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
  return (
    <div className="bg-primary text-white py-1 md:py-2">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center space-x-2 md:space-x-4 mb-2 md:mb-0">
          <a
            href={`tel:${siteConfig.contact.phone}`}
            className="flex items-center text-xs md:text-sm hover:text-secondary transition-colors"
          >
            <Phone className="h-3 w-3 md:h-4 md:w-4 mr-1" />
            <span>{siteConfig.contact.phone}</span>
          </a>
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="flex items-center text-xs md:text-sm hover:text-secondary transition-colors"
          >
            <Mail className="h-3 w-3 md:h-4 md:w-4 mr-1" />
            <span>{siteConfig.contact.email}</span>
          </a>
          <div className="flex items-center text-xs md:text-sm">
  <span>Mountain Travels Pakistan Govt. of Pakistan License No. ID-302</span>
</div>

        </div>
        <div className="flex items-center space-x-2 md:space-x-3">
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
    <div className="bg-transparent container mx-auto px-4 py-2 md:py-4">
      <div className="flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image
            src="/assets/logo/logo.png"
            alt={siteConfig.name}
            width={120}
            height={60}
            className="h-12 w-auto md:h-16"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
          {mainMenu.map((item) =>
            item.children ? (
              <div key={item.name} className="relative">
                <button
                  onClick={() => toggleDesktopDropdown(item.name)}
                  className="text-sm lg:text-base font-medium hover:text-primary transition-colors flex items-center"
                >
                  {item.name}
                  <ChevronDown
                    className={`ml-1 h-4 w-4 transition-transform ${
                      openDesktopDropdown === item.name ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openDesktopDropdown === item.name && (
                  <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg">
                    <ul className="py-2">
                      {item.children.map((child) => (
                        <li key={child.name}>
                          <Link
                            href={child.path}
                            className="block px-4 py-2 text-sm hover:bg-gray-100"
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
                className="text-sm lg:text-base font-medium hover:text-primary transition-colors"
              >
                {item.name}
              </Link>
            )
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden flex items-center" onClick={toggleMenu}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "md:hidden fixed inset-0 bg-white z-50 transition-transform transform",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <Link href="/" className="flex items-center" onClick={() => setIsMenuOpen(false)}>
            <Image
              src="/assets/logo/logo.png"
              alt={siteConfig.name}
              width={40}
              height={40}
              className="h-8 w-auto"
            />
            <span className="ml-2 font-bold text-lg text-primary">{siteConfig.shortName}</span>
          </Link>
          <button className="flex items-center" onClick={toggleMenu}>
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
