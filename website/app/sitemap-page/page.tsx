import Link from "next/link"
import { Folder, FileText, ChevronRight } from "lucide-react"
import { tourCategories } from "@/data/tourPackages"
import { blogPosts } from "@/data/blogContent"

export default function SitemapPage() {
  // Define the site structure
  const siteStructure = [
    {
      name: "Main Pages",
      pages: [
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        { name: "Contact", path: "/contact" },
        { name: "Tours", path: "/tours" },
        { name: "Blogs", path: "/blogs" },
      ],
    },
    {
      name: "Tour Categories",
      pages: tourCategories.map((category) => ({
        name: category.name,
        path: `/tours?category=${category.id}`,
      })),
    },
    {
      name: "Blog Posts",
      pages: blogPosts.map((post) => ({
        name: post.title,
        path: `/blogs/${post.id}`,
      })),
    },
    {
      name: "Legal & Info",
      pages: [
        { name: "Terms of Service", path: "/terms-of-service" },
        { name: "Privacy Policy", path: "/privacy-policy" },
        { name: "Booking Information", path: "/booking-info" },
      ],
    },
  ]

  // Define the image structure for documentation
  const imageStructure = [
    {
      folder: "assets/logo",
      files: ["logo.png"],
      description: "Company logo used in header and footer",
    },
    {
      folder: "assets/home",
      files: ["hero-1.jpg", "hero-2.jpg", "hero-3.jpg"],
      description: "Hero slider images for homepage",
    },
    {
      folder: "assets/about/team",
      files: ["image1.jpg", "image2.jpg", "image3.jpg", "image4.jpg"],
      description: "Team member photos for about page",
    },
    {
      folder: "assets/tours",
      files: ["tour-1.jpg", "tour-2.jpg", "tour-3.jpg", "tour-4.jpg"],
      description: "Tour featured images",
    },
    {
      folder: "assets/contact",
      files: ["office.jpg"],
      description: "Office image for contact page",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Website Sitemap</h1>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {siteStructure.map((section, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-primary">{section.name}</h2>
            <ul className="space-y-2">
              {section.pages.map((page, pageIndex) => (
                <li key={pageIndex} className="border-b pb-2">
                  <Link href={page.path} className="flex items-center hover:text-primary transition-colors">
                    <FileText className="h-4 w-4 mr-2" />
                    <span>{page.name}</span>
                    <ChevronRight className="h-4 w-4 ml-auto" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      


    </div>
  )
}

