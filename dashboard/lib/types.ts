import { OutputData } from "@editorjs/editorjs";
export interface TravelTip {
  _id?: string;
  title: string;
  excerpt: string;
  image?: string;
  date: string;
  slug: string;
  createdAt?: string;
  updatedAt?: string;
}
export interface PopularDestination {
  _id?: string;
  name: string;
  image: string; // stored as AVIF file path
  description: string;
  tours: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

//==========Tour==========
export interface Tour {
  id: string;
  name: string;
  country: string;
  location: string;
  category: string;
  days: number;
  groupSize: string;
  difficulty: "Easy" | "Moderate" | "Challenging" | "Expert";
  rating: number;
  reviews: number;
  price: number;
  originalPrice: number;
  images: string[];
  availability: string;
  nextDeparture: string;
  features: string[];
  highlights: string[];
  included: string[];
  inclusions: string[];
  exclusions: string[];
  shortDescription: string;
  longDescription: string;
  overview: string;
  whyChoose: { title: string; description: string }[];
  physicalRequirements: string;
  distance: string;
  hours: string;
  bestTime: string;
  itineraries: {
    day: number;
    title: string;
    description: string;
    activities: string[];
    accommodation: string;
    meals: string[];
    location: string;
    duration: string;
    type: string;
    highlights: string[];
    images: string[];
  }[];
  featured: boolean;
  tags: string[];
  relatedTrips: string[];
  destination: string;
  faqs: { question: string; answer: string }[];
  termsAndConditions: string[];
  policies: string[];
  map: { latitude: number; longitude: number };
  // Booking-related fields (added from backend model)
  maxCapacity?: number;
  minimumBooking?: number;
  bookingDeadline?: number;
  bookingStatus?: 'OPEN' | 'CLOSED' | 'SUSPENDED';
  cancellationPolicy?: string;
  paymentTerms?: {
    deposit: number;
    fullPaymentDays: number;
  };
  createdAt?: string;
  updatedAt?: string;
}

//==========Gallery==========
export interface GalleryPhoto {
  id: string;
  title: string;
  src: string[];
  category: string;
  location?: string;
  date?: string;
  description?: string;
  photographer?: string;
  createdAt?: string;
  updatedAt?: string;
}

//==========Blogs==========
export interface BlogAPIResponse {
  success: boolean;
  message?: string;
  data?: Blog;
  error?: string;
  validationErrors?: Record<string, string>;
}

export interface Blog {
  _id: string;
  title: string;
  author: {
    name: string;
    designation: string;
    image: string;
    description: string;
  };
  coverImage: string;
  content: OutputData;
  category:
    | "Destinations"
    | "Travel Tips"
    | "Cultural Guides"
    | "Adventure"
    | "Food & Places"
    | "Luxury"
    | "Trekking"
    | "Wildlife"
    | "Culture";
  isFeatured: boolean;
  status: "draft" | "published";
  summary: string;
  tags: string[];
  readTime: number;
  createdAt: Date;
  updatedAt: Date;
}

//==========Inquiries==========
export interface Inquiry {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  status: "new" | "in-progress" | "resolved";
}

//==========Partner Feedbacks==========
export interface PartnerFeedback {
  id: string;
  _id?: string;
  partnerName: string;
  company: string;
  designation: string;
  partnershipType: string;
  project?: string;
  feedback: string;
  rating: number;
  logo?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

//==========Testimonials==========
export interface Testimonial {
  id: string;
  _id?: string;
  name: string;
  designation: string;
  location: string;
  rating: number;
  feedback: string;
  image?: string;
  tripName?: string;
  tripDate?: Date;
  verified: boolean;
  highlights?: string[];
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

//==========User==========
export interface User {
  _id: string
  id: string
  email: string
  firstName: string
  lastName: string
  role: 'admin'
  permissions: {
    tours: boolean
    blogs: boolean
    gallery: boolean
    testimonials: boolean
    partnerFeedbacks: boolean
    inquiries: boolean
    userManagement: boolean
    systemSettings: boolean
  }
  isActive: boolean
  emailVerified: boolean
  lastLogin: Date
  fullName: string
  createdAt: string
  updatedAt: string
  createdBy: string
}

export interface CreateUserData {
  email: string
  firstName: string
  lastName: string
  role: 'admin'
  permissions: {
    tours: boolean
    blogs: boolean
    gallery: boolean
    testimonials: boolean
    partnerFeedbacks: boolean
    inquiries: boolean
    userManagement: boolean
    systemSettings: boolean
  }
}

//==========Settings==========
export interface Settings {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  socialLinks: {
    facebook: string;
    instagram: string;
    twitter: string;
    youtube: string;
  };
  logo: string;
}
