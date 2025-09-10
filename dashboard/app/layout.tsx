import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Toaster } from "react-hot-toast"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Mountain Travel Pakistan - Adventure Tours & Trekking",
    template: "%s |Mountain Travel Pakistan",
  },
  description:
    "TourMaker Pakistan offers adventure tours, trekking expeditions, and cultural experiences in Pakistan's most beautiful regions.",
  keywords: [
    "Pakistan tours",
    "adventure travel",
    "Hunza Valley",
    "K2 Base Camp",
    "mountain expeditions",
  ],
  authors: [{ name: "Mountain Travel Pakistan" }],
  creator: "Mountain Travel Pakistan",
  publisher: "Mountain Travel Pakistan",
  formatDetection: {
    email: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.SITE_URL || "https://mountaintravel.site"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Mountain Travel Pakistan - Adventure Tours & Trekking",
    description:
      "Mountain Travel Pakistan offers adventure tours, trekking expeditions, and cultural experiences in Pakistan's most beautiful regions.",
    siteName: "Mountain Travel Pakistan",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Mountain Travel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mountain Travel Pakistan - Adventure Tours",
    description:
      "Mountain Travel Pakistan offers adventure tours, trekking expeditions, and cultural experiences in Pakistan's most beautiful regions.",
    images: ["/og-image.jpg"],
    creator: "@tourmakerpakistan",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/web-app-manifest-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/web-app-manifest-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
    ],
    other: [
      { url: "/favicon.svg", type: "image/svg+xml" }
    ]
  },
  manifest: "/manifest.json",
}
export const viewport = {
  themeColor: "#1e293b",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#1e293b" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="Mountaintravel" />
        <link rel="canonical" href={process.env.SITE_URL || "https://mountaintravel.site"} />
      </head>
      <body className={inter.className}>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  )
}