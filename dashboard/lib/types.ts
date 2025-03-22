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

export interface User {
  id: string
  username: string
  email: string
  role: "admin" | "user"
}

export interface Settings {
  siteName: string
  siteDescription: string
  contactEmail: string
  contactPhone: string
  address: string
  socialLinks: {
    facebook: string
    instagram: string
    twitter: string
    youtube: string
  }
  logo: string
}

