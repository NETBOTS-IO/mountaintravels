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
  Film,
  Quote,
  User,
  MapPin,
  Backpack,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/authStore";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: PackageSearch, label: "Tour Packages", href: "/admin/tours" },
  { icon: Film, label: "Media", href: "/admin/media" },
  { icon: FileText, label: "Blogs", href: "/admin/blogs" },
  { icon: Quote, label: "Testimonials", href: "/admin/testimonials" },
  { icon: MapPin, label: "Destinations", href: "/admin/popular-destinations" },
  { icon: Backpack, label: "Bookings", href: "/admin/bookings" },
  { icon: MessageSquare, label: "Queries", href: "/admin/inquiries" },
  { icon: User, label: "Users", href: "/admin/users" },
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const { isAuthenticated, user, logout: logoutUser } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
        setSidebarOpen(false);
      } else {
        setIsMobile(false);
        setSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    logoutUser();
    router.push("/login");
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Mobile Overlay */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Admin Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 bg-white border-r border-gray-200 transition-all duration-300 flex flex-col shadow-sm",
          sidebarOpen
            ? "translate-x-0 w-64"
            : isMobile
              ? "-translate-x-full w-64"
              : "translate-x-0 w-20",
        )}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b shrink-0">
          <Link
            href="/admin"
            className={cn(
              "flex items-center gap-2 overflow-hidden",
              !sidebarOpen && !isMobile ? "hidden" : "flex",
            )}
          >
            <span className="text-xl font-bold whitespace-nowrap pl-2">
              <span className="text-orange-500">Admin</span>{" "}
              <span className="text-green-600">Panel</span>
            </span>
          </Link>

          {/* Toggle Button for Desktop - Inside Sidebar */}
          {!isMobile && sidebarOpen && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(false)}
              className="shrink-0"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          )}

          {/* Toggle Button for Desktop (when closed) - Inside Sidebar */}
          {!isMobile && !sidebarOpen && (
            <div className="w-full flex justify-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(true)}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          )}

          {/* Close button for Mobile inside sidebar */}
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(false)}
              className="shrink-0"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          )}
        </div>

        {/* Navigation Menu */}
        <nav className="flex flex-col flex-1 overflow-hidden">
          <div className="flex-1 py-4 overflow-y-auto overflow-x-hidden space-y-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center py-3 rounded-lg transition-all duration-200 whitespace-nowrap group",
                    sidebarOpen ? "px-4 mx-3" : "justify-center mx-2 px-0",
                    isActive
                      ? "bg-orange-100 text-orange-600"
                      : "text-gray-600 hover:text-orange-600 hover:bg-orange-50",
                  )}
                  onClick={() => {
                    if (isMobile) setSidebarOpen(false);
                  }}
                  title={!sidebarOpen ? item.label : undefined}
                >
                  <item.icon
                    className={cn(
                      "h-5 w-5 shrink-0 transition-colors",
                      sidebarOpen ? "mr-4" : "mr-0",
                      isActive
                        ? "text-orange-600"
                        : "text-gray-500 group-hover:text-orange-600",
                    )}
                  />
                  {sidebarOpen && (
                    <span className="font-medium text-[15px]">
                      {item.label}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Logout Button */}
          <div className="p-4 border-t shrink-0">
            <Button
              variant="outline"
              className={cn(
                "w-full transition-all text-gray-600 hover:text-red-600 hover:bg-red-50 hover:border-red-200",
                sidebarOpen ? "justify-start px-4" : "justify-center px-0",
              )}
              onClick={handleLogout}
              title={!sidebarOpen ? "Logout" : undefined}
            >
              <LogOut
                className={cn(
                  "h-5 w-5 shrink-0 transition-colors",
                  sidebarOpen ? "mr-3" : "mr-0",
                )}
              />
              {sidebarOpen && <span className="font-medium">Logout</span>}
            </Button>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div
        className={cn(
          "flex flex-col flex-1 min-w-0 transition-all duration-300",
          !isMobile && sidebarOpen
            ? "ml-64"
            : !isMobile && !sidebarOpen
              ? "ml-20"
              : "ml-0",
        )}
      >
        <header className="sticky top-0 z-30 h-16 bg-white border-b flex items-center px-4 shrink-0 shadow-sm">
          {/* Mobile Hamburger Menu */}
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(true)}
              className="mr-3 shrink-0"
            >
              <Menu className="h-6 w-6" />
            </Button>
          )}

          <div className="flex items-center justify-between w-full overflow-hidden">
            <h1 className="text-xl font-semibold text-gray-800 truncate pr-4">
              Admin Dashboard
            </h1>
            {user && (
              <div className="flex items-center space-x-2 text-sm text-gray-600 shrink-0">
                <span className="hidden sm:inline">
                  Welcome, {user.fullName}
                </span>
                <span className="text-gray-300 hidden sm:inline">|</span>
                <span className="capitalize hidden sm:inline font-medium text-orange-600">
                  {user.role}
                </span>
                <Button
                  className="rounded-full shrink-0 ml-2 h-9 w-9 p-0"
                  variant="ghost"
                  onClick={() => router.push(`/admin/users/${user.id}`)}
                >
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 border border-orange-200">
                    <User className="h-4 w-4 shrink-0" />
                  </div>
                </Button>
              </div>
            )}
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
          {children}
        </main>

        <footer className="shrink-0 px-4 md:px-6 py-4 bg-white border-t flex flex-col md:flex-row items-center justify-between text-center shadow-inner">
          <p className="text-xs md:text-sm text-gray-500 font-medium">
            © {new Date().getFullYear()} MountainTravel Pakistan. All rights
            reserved.
          </p>
          <p className="text-xs text-gray-400 mt-2 md:mt-0 font-medium">
            Design and developed by{" "}
            <a
              href="https://netbots.io"
              target="_blank"
              className="text-orange-500 hover:text-orange-600 hover:underline transition-colors"
            >
              Net Bots (SMC-Private) Limited
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default AdminLayout;
