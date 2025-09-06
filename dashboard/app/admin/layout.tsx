"use client";

import type React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  PackageSearch,
  FileText,
  MessageSquare,
  LogOut,
  Menu,
  ChevronLeft,
  ChevronRight,
  Camera,
  Quote,
  Handshake,
  User,
   MapPin,      // for Popular Destinations
  Lightbulb,
  Backpack,
    Mail,
    ShieldCheck,  // ✅ for Trusted Companies

} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/authStore";
import Image from "next/image";
const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: PackageSearch, label: "Tour Packages", href: "/admin/tours" },
  { icon: Camera, label: "Gallery", href: "/admin/gallery" },
  { icon: FileText, label: "Blogs", href: "/admin/blogs" },
  { icon: Quote, label: "Testimonials", href: "/admin/testimonials" },
  { icon: MapPin, label: "Popular Destinations", href: "/admin/popular-destinations" },
  { icon: Lightbulb, label: "Travel Tips & Insights", href: "/admin/travel-tips" },
  { icon: Backpack, label: "Bookings", href: "/admin/bookings" },
  { icon: ShieldCheck, label: "Trusted-Company", href: "/admin/trusted-companies" },
    { icon: Mail, label: "Contact", href: "/admin/contact" },



  {  

    icon: Handshake,
    label: "Partner Feedbacks",
    href: "/admin/partner-feedbacks",
  },
  { icon: MessageSquare, label: "Inquiries", href: "/admin/inquiries" },
  { icon: User, label: "Users", href: "/admin/users" },
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  
  const { isAuthenticated, user, logout: logoutUser } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  const handleLogout = () => {
    logoutUser();
    router.push("/login");
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Admin Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 bg-white border-r border-gray-200 transition-all duration-300",
          sidebarOpen ? "w-64" : "w-16"
        )}
      >
        {/* Sidebar content */}
        <div className="flex items-center justify-between h-16 px-4 border-b">
        <Link
  href="/admin"
  className={cn(
    "flex items-center gap-2 transition-opacity",
    sidebarOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
  )}
>
  <Image
    src="/logo.png"
    alt="Mountain Travel Logo"
    width={90}
    height={20}
    className="object-contain"
  />
  <span className="text-xl font-bold">
    <span className="text-orange-500">Admin</span>{" "}
    <span className="text-green-600">Panel</span>
  </span>
</Link>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="flex-shrink-0"
          >
            {sidebarOpen ? (
              <ChevronLeft className="h-5 w-5" />
            ) : (
              <ChevronRight className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex flex-col h-[calc(100vh-4rem)] justify-between">
          <div className="flex-1 py-4 overflow-y-auto">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center px-4 py-3 mx-2 rounded-lg transition-colors",
                  "hover:text-orange-600 transition-colors duration-300 ease-in-out",
                  pathname === item.href && "bg-orange-100 text-orange-600",
                  !sidebarOpen && "justify-center px-2 mx-1"
                )}
              >
                <item.icon className={cn("h-5 w-5", sidebarOpen && "mr-3")} />
                {sidebarOpen && <span>{item.label}</span>}
              </Link>
            ))}
          </div>

          {/* Logout Button */}
          <div className="p-4 border-t">
            <Button
              variant="outline"
              className={cn("w-full justify-center", !sidebarOpen && "p-2")}
              onClick={handleLogout}
            >
              <LogOut className={cn("h-5 w-5", sidebarOpen && "mr-2")} />
              {sidebarOpen && "Logout"}
            </Button>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div
        className={cn(
          "flex flex-col flex-1 transition-all duration-300",
          sidebarOpen ? "ml-64" : "ml-16"
        )}
      >
        <header className="sticky top-0 z-40 h-16 bg-white border-b flex items-center px-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="mr-4 md:hidden"
          >
            <Menu className="h-6 w-6" />
          </Button>
          <div className="flex items-center justify-between w-full">
            <h1 className="text-xl font-semibold text-gray-800">
              Admin Dashboard
            </h1>
            {user && (
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span>Welcome, {user.fullName}</span>
                <span className="text-gray-400">|</span>
                <span className="capitalize">{user.role}</span>
                <Button className="rounded-full" variant="ghost" size="icon" onClick={() => router.push(`/admin/users/${user.id}`)}>
                  <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                    <User className="h-4 w-4" />
                  </span>
                </Button>
              </div>
            )}
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
        <footer className="sticky bottom-0 z-40 px-6 h-16 bg-white border-t flex items-center justify-around">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} MountainTravel Pakistan. All rights
            reserved.
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Design and developed by{" "}
            <a
              href="https://netbots.io"
              target="_blank"
              className="text-primary hover:underline"
            >
              Netbots (SMC-Private) Limited
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default AdminLayout;
