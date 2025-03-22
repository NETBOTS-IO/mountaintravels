"use client"
import axios from "axios"
import { BASE_URL } from "@/Var"
// Types
export interface Tour {
  id: string
  title: string
  category: string
  location: string
  days: number
  groupSize: string
  difficulty: "easy" | "moderate" | "challenging"
  price: number
  bestSeason: string
  description: string
  images: string[]
  itineraries: {
    day: number
    title: string
    description: string
    activities: string
    accommodation: string
    meals: string
    distance: string
    hours: string
    images: string[]
  }[]
  inclusions: string[]
  exclusions: string[]
  faqs: {
    question: string
    answer: string
  }[]
  termsAndConditions: string[]
  policies: string[]
  map: {
    latitude: number
    longitude: number
  }
}

export interface Blog {
  id: string
  title: string
  author: string
  content: string
  image: string
  tags: string[]
  date: string
}

export interface Inquiry {
  id: string
  name: string
  email: string
  subject: string
  message: string
  date: string
  status: "new" | "in-progress" | "resolved"
}

// Sample data
const toursData: Tour[] = [
  {
    id: "1",
    title: "K2 Base Camp Trek",
    category: "Trekking",
    location: "Gilgit-Baltistan, Pakistan",
    days: 21,
    groupSize: "5-10",
    difficulty: "challenging",
    price: 3500,
    bestSeason: "June to August",
    description: "Experience the adventure of a lifetime with our K2 Base Camp Trek.",
    images: ["/placeholder.svg?height=400&width=600"],
    itineraries: [
      {
        day: 1,
        title: "Arrival in Islamabad",
        description: "Arrive in Islamabad and transfer to the hotel.",
        activities: "Rest and acclimatization",
        accommodation: "Hotel in Islamabad",
        meals: "Dinner",
        distance: "N/A",
        hours: "N/A",
        images: ["/placeholder.svg?height=400&width=600"],
      },
    ],
    inclusions: ["All ground transportation", "Experienced guide"],
    exclusions: ["International flights", "Personal expenses"],
    faqs: [
      {
        question: "How fit do I need to be for this trek?",
        answer: "This is a challenging trek that requires excellent physical fitness.",
      },
    ],
    termsAndConditions: ["Deposit required to secure booking"],
    policies: ["Responsible tourism practices"],
    map: { latitude: 35.88, longitude: 76.5144 },
  },
  {
    id: "2",
    title: "Hunza Valley Explorer",
    category: "Cultural",
    location: "Hunza, Pakistan",
    days: 10,
    groupSize: "4-12",
    difficulty: "moderate",
    price: 1800,
    bestSeason: "April to October",
    description: "Discover the beauty and culture of Hunza Valley.",
    images: ["/placeholder.svg?height=400&width=600"],
    itineraries: [
      {
        day: 1,
        title: "Arrival in Gilgit",
        description: "Fly to Gilgit and transfer to Karimabad, Hunza.",
        activities: "Town exploration",
        accommodation: "Hotel in Karimabad",
        meals: "Dinner",
        distance: "100 km",
        hours: "2-3 hours drive",
        images: ["/placeholder.svg?height=400&width=600"],
      },
    ],
    inclusions: ["Domestic flights", "All accommodations"],
    exclusions: ["International flights", "Optional activities"],
    faqs: [
      {
        question: "Is this tour suitable for families?",
        answer: "Yes, this tour is suitable for families with children aged 10 and above.",
      },
    ],
    termsAndConditions: ["Minimum 4 participants required"],
    policies: ["Eco-friendly accommodations"],
    map: { latitude: 36.3167, longitude: 74.65 },
  },
]

const blogsData: Blog[] = [
  {
    id: "1",
    title: "10 Must-Visit Places in Northern Pakistan",
    author: "Sarah Johnson",
    content: "Northern Pakistan is a treasure trove of natural beauty and rich culture.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["travel", "Pakistan", "adventure"],
    date: "2023-05-20",
  },
  {
    id: "2",
    title: "Preparing for Your First High-Altitude Trek",
    author: "Mike Wilson",
    content: "High-altitude trekking can be a life-changing experience, but it requires proper preparation.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["trekking", "preparation", "adventure"],
    date: "2023-06-05",
  },
]

const inquiriesData: Inquiry[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    subject: "K2 Base Camp Trek Inquiry",
    message: "I'm interested in the K2 Base Camp Trek. Can you provide more details?",
    date: "2023-06-15",
    status: "new",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    subject: "Hunza Valley Tour Question",
    message: "Hi, I'd like to know if the Hunza Valley Explorer tour is available in September.",
    date: "2023-06-16",
    status: "in-progress",
  },
]

// Simplified data access functions

export async function getTours(): Promise<Tour[]> {
  try {
    const response = await axios.get(`${BASE_URL}/api/tours`)
    console.log("Fetched tours:", response.data.data)
    return response.data.data
  } catch (error) {
    console.error("Failed to fetch tours:", error)
    return []
  }
}

export async function getTourById(id: string): Promise<Tour | undefined> {
  try {
    const response = await axios.get(`${BASE_URL}/api/tours/${id}`)
    return response.data.data // Adjust based on actual API response structure
  } catch (error) {
    console.error(`Failed to fetch tour with ID ${id}:`, error)
    return undefined
  }
}

export async function updateTourById(id: string): Promise<Tour | undefined> {
  try {
    const response = await axios.put(`${BASE_URL}/api/tours/${id}`)
    console.log("Updated tour:", response.data.data)
    return response.data.data // Adjust based on actual API response structure
  } catch (error) {
    console.error(`Failed to fetch tour with ID ${id}:`, error)
    return undefined
  }
}
export function createTour(tour: Omit<Tour, "id">): Tour {
  const newTour = {
    ...tour,
    id: (toursData.length + 1).toString(),
  }
  // In a real app, we would save this to a database
  console.log("Creating tour:", newTour)
  return newTour
}

export function updateTour(id: string, tourData: Partial<Tour>): Tour | undefined {
  const tour = getTourById(id)
  if (!tour) return undefined

  // In a real app, we would update this in a database
  console.log("Updating tour:", { ...tour, ...tourData })
  return { ...tour, ...tourData }
}

export async function deleteTour(id: string): Promise<boolean> {
  try {
    const response = await axios.delete(`${BASE_URL}/api/tours/${id}`);

    if (response.status >= 200 && response.status < 300) {
      console.log("Tour deleted successfully:", id);
      return true;
    } else {
      console.error("Failed to delete tour:", response.statusText);
      return false;
    }
  } catch (error: any) {
    console.error("Error deleting tour:", error.response?.data || error.message);
    return false;
  }
}

export function getBlogs(): Blog[] {
  return blogsData
}

export function getBlogById(id: string): Blog | undefined {
  return blogsData.find((blog) => blog.id === id)
}

export function createBlog(blog: Omit<Blog, "id" | "date">): Blog {
  const newBlog = {
    ...blog,
    id: (blogsData.length + 1).toString(),
    date: new Date().toISOString().split("T")[0],
  }
  // In a real app, we would save this to a database
  console.log("Creating blog:", newBlog)
  return newBlog as Blog
}

export function updateBlog(id: string, blogData: Partial<Blog>): Blog | undefined {
  const blog = getBlogById(id)
  if (!blog) return undefined

  // In a real app, we would update this in a database
  console.log("Updating blog:", { ...blog, ...blogData })
  return { ...blog, ...blogData }
}

export function deleteBlog(id: string): boolean {
  // In a real app, we would delete this from a database
  console.log("Deleting blog:", id)
  return true
}

export function getInquiries(): Inquiry[] {
  return inquiriesData
}

export function getInquiryById(id: string): Inquiry | undefined {
  return inquiriesData.find((inquiry) => inquiry.id === id)
}

export function updateInquiryStatus(id: string, status: "new" | "in-progress" | "resolved"): Inquiry | undefined {
  const inquiry = getInquiryById(id)
  if (!inquiry) return undefined

  // In a real app, we would update this in a database
  console.log("Updating inquiry status:", { ...inquiry, status })
  return { ...inquiry, status }
}

export function deleteInquiry(id: string): boolean {
  // In a real app, we would delete this from a database
  console.log("Deleting inquiry:", id)
  return true
}

