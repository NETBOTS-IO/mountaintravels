"use client";
import axios from "axios";
import { BASE_URL } from "@/Var";
import { Tour, Blog, GalleryPhoto, Inquiry, BlogAPIResponse, Testimonial, PartnerFeedback, PopularDestination,TravelTip ,BookingStats,Booking, ApiResponse, Departure } from "./types";

const inquiriesData: Inquiry[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    subject: "K2 Base Camp Trek Inquiry",
    message:
      "I'm interested in the K2 Base Camp Trek. Can you provide more details?",
    date: "2023-06-15",
    status: "new",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    subject: "Hunza Valley Tour Question",
    message:
      "Hi, I'd like to know if the Hunza Valley Explorer tour is available in September.",
    date: "2023-06-16",
    status: "in-progress",
  },
];

// Simplified data access functions

// ---------- Tours ----------
export async function getTours(): Promise<Tour[]> {
  try {
    const response = await axios.get(`${BASE_URL}/api/tours`);
    // Map _id to id for each tour
    return response.data.data.map((tour: any) => ({
      ...tour,
      id: tour._id,
    }));
  } catch (error) {
    console.error("Failed to fetch tours:", error);
    return [];
  }
}

export async function getTourById(id: string): Promise<Tour | undefined> {
  try {
    const response = await axios.get(`${BASE_URL}/api/tours/${id}`);
    // Map _id to id for the single tour
    const tour = response.data.data;
    return tour ? { ...tour, id: tour._id } : undefined;
  } catch (error) {
    console.error(`Failed to fetch tour with ID ${id}:`, error);
    return undefined;
  }
}

// export async function getTourBySlug(slug: string): Promise<Tour | undefined> {
//   try {
//     const response = await axios.get(`${BASE_URL}/api/tours/${slug}`)
//     console.log("Fetched tour by slug:", response.data.data)
//     return response.data.data // Adjust based on actual API response structure
//   } catch (error) {
//     console.error(`Failed to fetch tour with slug ${slug}:`, error)
//     return undefined
//   }
// }

export async function updateTourById(
  id: string,
  tourData: Partial<Tour>
): Promise<Tour | undefined> {
  try {
    const response = await axios.put(`${BASE_URL}/api/tours/${id}`, tourData);
    console.log("Updated tour:", response.data.data);
    return response.data.data; // Adjust based on actual API response structure
  } catch (error) {
    console.error(`Failed to fetch tour with ID ${id}:`, error);
    return undefined;
  }
}
export async function createTour(
  tour: Omit<Tour, "id">
): Promise<Tour | undefined> {
  try {
    const response = await axios.post(`${BASE_URL}/api/tours`, tour);
    console.log("Created tour:", response.data.data);
    return response.data.data; // Adjust based on actual API response structure
  } catch (error) {
    console.error("Failed to create tour:", error);
    return undefined;
  }
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
    console.error(
      "Error deleting tour:",
      error.response?.data || error.message
    );
    return false;
  }
}

// ---------- Blogs ----------

// Get all blogs with optional filters
export async function getBlogs(query: {
  page?: number;
  limit?: number;
  search?: string;
}) {
  const params = new URLSearchParams();

  if (query.page) params.append("page", query.page.toString());
  if (query.limit) params.append("limit", query.limit.toString());
  if (query.search) params.append("search", query.search);

  const res = await axios.get(`${BASE_URL}/api/blogs?${params.toString()}`);
  return res.data.data; // Return the data property from the response
}

// Get single blog by ID
export const getBlogById = async (id: string): Promise<Blog> => {
  try {
    const res = await axios.get(`${BASE_URL}/api/blogs/${id}`);
    return res.data.data; // Return the data property from the response
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Failed to fetch blog");
  }
};

// Create a new blog
export const createBlog = async (
  formData: FormData
): Promise<BlogAPIResponse> => {
  try {
    const res = await axios.post(`${BASE_URL}/api/blogs`, formData);
    return res.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Failed to create blog");
  }
};

// Update existing blog
export const updateBlog = async (
  id: string,
  formData: FormData
): Promise<BlogAPIResponse> => {
  try {
    const res = await axios.put(`${BASE_URL}/api/blogs/${id}`, formData);
    return res.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Failed to update blog");
  }
};

// Delete a blog
export const deleteBlog = async (id: string): Promise<boolean> => {
  try {
    const res = await axios.delete(`${BASE_URL}/api/blogs/${id}`);
    return res.status === 200;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Failed to delete blog");
  }
};

// Search blogs
export const searchBlogs = async (query: string): Promise<Blog[]> => {
  try {
    const res = await axios.get(`${BASE_URL}/api/blogs/search`, {
      params: { search: query },
    });
    return res.data.blogs;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Failed to search blogs");
  }
};

// Get popular blogs
export const getPopularBlogs = async (): Promise<Blog[]> => {
  try {
    const res = await axios.get(`${BASE_URL}/api/blogs/popular`);
    return res.data.blogs;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || "Failed to load popular blogs"
    );
  }
};

// Get related blogs (based on category or tags)
export const getRelatedBlogs = async (blogId: string): Promise<Blog[]> => {
  try {
    const res = await axios.get(`${BASE_URL}/api/blogs/related/${blogId}`);
    return res.data.blogs;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || "Failed to load related blogs"
    );
  }
};

// ---------- Testimonials ----------
export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const response = await axios.get(`${BASE_URL}/api/testimonials`);
    // Map _id to id for each testimonial
    return response.data.data.map((testimonial: any) => ({
      ...testimonial,
      id: testimonial._id,
    }));
  } catch (error) {
    console.error("Failed to fetch testimonials:", error);
    return [];
  }
}

export async function getTestimonialById(id: string): Promise<Testimonial | undefined> {
  try {
    const response = await axios.get(`${BASE_URL}/api/testimonials/${id}`);
    const testimonial = response.data.data;
    return testimonial ? { ...testimonial, id: testimonial._id } : undefined;
  } catch (error) {
    console.error(`Failed to fetch testimonial with ID ${id}:`, error);
    return undefined;
  }
}

export async function getFeaturedTestimonials(limit: number = 6): Promise<Testimonial[]> {
  try {
    const response = await axios.get(`${BASE_URL}/api/testimonials/featured?limit=${limit}`);
    return response.data.data.map((testimonial: any) => ({
      ...testimonial,
      id: testimonial._id,
    }));
  } catch (error) {
    console.error("Failed to fetch featured testimonials:", error);
    return [];
  }
}

export async function getTestimonialStats() {
  try {
    const response = await axios.get(`${BASE_URL}/api/testimonials/stats`);
    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch testimonial stats:", error);
    return {
      totalTestimonials: 0,
      verifiedTestimonials: 0,
      averageRating: 0,
      ratingDistribution: [],
    };
  }
}

export async function createTestimonial(testimonialData: FormData): Promise<Testimonial | undefined> {
  try {
    const response = await axios.post(`${BASE_URL}/api/testimonials`, testimonialData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Failed to create testimonial:", error);
    return undefined;
  }
}

export async function updateTestimonial(id: string, testimonialData: FormData): Promise<Testimonial | undefined> {
  try {
    const response = await axios.put(`${BASE_URL}/api/testimonials/${id}`, testimonialData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.data;
  } catch (error) {
    console.error(`Failed to update testimonial with ID ${id}:`, error);
    return undefined;
  }
}

export async function deleteTestimonial(id: string): Promise<boolean> {
  try {
    const response = await axios.delete(`${BASE_URL}/api/testimonials/${id}`);
    return response.status >= 200 && response.status < 300;
  } catch (error) {
    console.error(`Failed to delete testimonial with ID ${id}:`, error);
    return false;
  }
}

export async function toggleTestimonialVerification(id: string): Promise<Testimonial | undefined> {
  try {
    const response = await axios.patch(`${BASE_URL}/api/testimonials/${id}/verify`);
    return response.data.data;
  } catch (error) {
    console.error(`Failed to toggle verification for testimonial with ID ${id}:`, error);
    return undefined;
  }
}

// ---------- Inquiries ----------
export function getInquiries(): Inquiry[] {
  return inquiriesData;
}

export function getInquiryById(id: string): Inquiry | undefined {
  return inquiriesData.find((inquiry) => inquiry.id === id);
}

export function updateInquiryStatus(
  id: string,
  status: "new" | "in-progress" | "resolved"
): Inquiry | undefined {
  const inquiry = getInquiryById(id);
  if (!inquiry) return undefined;

  // In a real app, we would update this in a database
  console.log("Updating inquiry status:", { ...inquiry, status });
  return { ...inquiry, status };
}

export function deleteInquiry(id: string): boolean {
  // In a real app, we would delete this from a database
  console.log("Deleting inquiry:", id);
  return true;
}

export async function createGalleryPhoto(formData: FormData) {
  try {
    const response = await axios.post(`${BASE_URL}/api/gallery`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Failed to create gallery photo"
    );
  }
}

export async function getGalleryPhotos(params?: {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
}): Promise<GalleryPhoto[]> {
  try {
    const query = new URLSearchParams();
    if (params?.page) query.append("page", String(params.page));
    if (params?.limit) query.append("limit", String(params.limit));
    if (params?.search) query.append("search", params.search);
    if (params?.category) query.append("category", params.category);
    const response = await axios.get(
      `${BASE_URL}/api/gallery${query.toString() ? `?${query.toString()}` : ""}`
    );
    // Map _id to id for each photo
    return {
      ...response.data,
      photos: response.data.photos.map((photo: any) => ({
        ...photo,
        id: photo._id,
      })),
    };
  } catch (error) {
    console.error("Failed to fetch gallery photos:", error);
    return [];
  }
}

export async function getGalleryPhotoById(
  id: string
): Promise<GalleryPhoto | null> {
  try {
    const response = await axios.get(`${BASE_URL}/api/gallery/${id}`);
    const photo = response.data.data;
    return photo ? { ...photo, id: photo._id } : null;
  } catch (error) {
    return null;
  }
}

export async function deleteGalleryPhoto(id: string): Promise<boolean> {
  try {
    const response = await axios.delete(`${BASE_URL}/api/gallery/${id}`);
    if (response.status >= 200 && response.status < 300) {
      console.log("Gallery photo deleted successfully:", id);
      return true;
    } else {
      console.error("Failed to delete gallery photo:", response.statusText);
      return false;
    }
  } catch (error: any) {
    console.error(
      "Error deleting gallery photo:",
      error.response?.data || error.message
    );
    return false;
  }
}

export async function updateGalleryPhoto(id: string, formData: FormData) {
  try {
    const response = await axios.put(
      `${BASE_URL}/api/gallery/${id}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Failed to update gallery photo"
    );
  }
}

// ---------- Partner Feedbacks ----------
export async function getPartnerFeedbacks(params?: {
  page?: number;
  limit?: number;
  search?: string;
}): Promise<{ items: PartnerFeedback[]; total: number; pages: number }> {
  try {
    const query = new URLSearchParams();
    if (params?.page) query.append("page", String(params.page));
    if (params?.limit) query.append("limit", String(params.limit));
    if (params?.search) query.append("search", params.search);
    
    const response = await axios.get(
      `${BASE_URL}/api/partner-feedbacks${query.toString() ? `?${query.toString()}` : ""}`
    );
    
    // Map _id to id for each feedback
    const items = response.data.items.map((feedback: any) => ({
      ...feedback,
      id: feedback._id,
    }));
    
    return {
      items,
      total: response.data.total || items.length,
      pages: response.data.pages || 1
    };
  } catch (error) {
    console.error("Failed to fetch partner feedbacks:", error);
    return { items: [], total: 0, pages: 1 };
  }
}

export async function getPartnerFeedbackById(id: string): Promise<PartnerFeedback | undefined> {
  try {
    const response = await axios.get(`${BASE_URL}/api/partner-feedbacks/${id}`);
    const feedback = response.data.data || response.data;
    return feedback ? { ...feedback, id: feedback._id } : undefined;
  } catch (error) {
    console.error(`Failed to fetch partner feedback with ID ${id}:`, error);
    return undefined;
  }
}

export async function createPartnerFeedback(formData: FormData): Promise<PartnerFeedback | undefined> {
  try {
    const response = await axios.post(`${BASE_URL}/api/partner-feedbacks`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.data || response.data;
  } catch (error) {
    console.error("Failed to create partner feedback:", error);
    return undefined;
  }
}

export async function updatePartnerFeedback(id: string, formData: FormData): Promise<PartnerFeedback | undefined> {
  try {
    const response = await axios.put(`${BASE_URL}/api/partner-feedbacks/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.data || response.data;
  } catch (error) {
    console.error(`Failed to update partner feedback with ID ${id}:`, error);
    return undefined;
  }
}

export async function deletePartnerFeedback(id: string): Promise<boolean> {
  try {
    const response = await axios.delete(`${BASE_URL}/api/partner-feedbacks/${id}`);
    return response.status >= 200 && response.status < 300;
  } catch (error) {
    console.error(`Failed to delete partner feedback with ID ${id}:`, error);
    return false;
  }
}


// Create
export async function createPopularDestination(formData: FormData) {
  const res = await fetch(`${BASE_URL}/api/popular/create`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) return null;
  return res.json();
}

// Update
export async function updatePopularDestination(id: string, formData: FormData) {
  const res = await fetch(`${BASE_URL}/api/popular/${id}`, {
    method: "PUT",
    body: formData,
  });
  if (!res.ok) return null;
  return res.json();
}

// Get all
export async function getPopularDestinations(): Promise<any[] | null> {
  const res = await fetch(`${BASE_URL}/api/popular`, {
    cache: "no-store",
  });
  if (!res.ok) return null;

  const result = await res.json();
  return result.data || []; // ✅ return array, not whole object
}

// Get by ID
// in data-utils.ts
export async function getPopularDestinationById(id: string) {
  const res = await fetch(`${BASE_URL}/api/popular/${id}`);
  const json = await res.json();
  return json.data; // not the whole json
}


// Delete
export async function deletePopularDestination(id: string) {
  const res = await fetch(`${BASE_URL}/api/popular/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) return null;
  return res.json();
}
export async function createTravelTip(data: TravelTip | FormData) {
  const isFormData = data instanceof FormData;

  const res = await fetch(`${BASE_URL}/api/tips/create`, {
    method: "POST",
    headers: isFormData ? undefined : { "Content-Type": "application/json" },
    body: isFormData ? data : JSON.stringify(data),
  });

  if (!res.ok) return null;
  return res.json();
}

// Update
export async function updateTravelTip(id: string, data: TravelTip | FormData) {
  const isFormData = data instanceof FormData;

  const res = await fetch(`${BASE_URL}/api/tips/update/${id}`, {
    method: "PUT",
    headers: isFormData ? undefined : { "Content-Type": "application/json" },
    body: isFormData ? data : JSON.stringify(data),
  });

  if (!res.ok) return null;
  return res.json();
}

// Get all
export async function getTravelTips(): Promise<TravelTip[] | null> {
  const res = await fetch(`${BASE_URL}/api/tips`, { cache: "no-store" });
  if (!res.ok) return null;

  const json = await res.json();
  return json.data; // return only the array
}


// Get by ID
export async function getTravelTipById(id: string): Promise<{ success: boolean; data: TravelTip } | null> {
  const res = await fetch(`${BASE_URL}/api/tips/getby/${id}`);
  if (!res.ok) return null;
  return res.json();
}

// Delete
export async function deleteTravelTip(id: string) {
  const res = await fetch(`${BASE_URL}/api/tips/delete/${id}`, { method: "DELETE" });
  if (!res.ok) return null;
  return res.json();
}

// ✅ Trusted Companies API helpers

// Get all companies
export async function getTrustedCompanies() {
  const res = await fetch(`${BASE_URL}/api/trusted/`, {
    cache: "no-store",
  });
  if (!res.ok) return null;
  return res.json();
}

// Get by ID
export async function getTrustedCompanyById(id: string) {
  const res = await fetch(`${BASE_URL}/api/trusted/getby/${id}`);
  if (!res.ok) return null;
  return res.json();
}

// Create
export async function createTrustedCompany(data: FormData) {
  const res = await fetch(`${BASE_URL}/api/trusted/created`, {
    method: "POST",
    body: data,
  });
  if (!res.ok) return null;
  return res.json();
}

// Update
export async function updateTrustedCompany(id: string, data: FormData) {
  const res = await fetch(`${BASE_URL}/api/trusted/updateby/${id}`, {
    method: "PUT",
    body: data,
  });
  if (!res.ok) return null;
  return res.json();
}

// Delete
export async function deleteTrustedCompany(id: string) {
  const res = await fetch(`${BASE_URL}/api/trusted/deleteby/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) return null;
  return res.json();
}
export async function getContacts() {
  const res = await fetch(`${BASE_URL}/api/contact`, {
    method: "GET",
    cache: "no-store", // ensure fresh data
  });
  if (!res.ok) return null;
  return res.json();
}

// Get contact by ID (optional for detail page)
export async function getContactById(id: string) {
  const res = await fetch(`${BASE_URL}/api/contact/${id}`, {
    method: "GET",
    cache: "no-store",
  });
  if (!res.ok) return null;
  return res.json();
}
// ADMIN DEPARTURE API FUNCTIONS
// ============================================

export const createDeparture = async (departureData: {
  tripId: string;
  date: string;
  price: number;
  maxSpots: number;
  status?: string;
}): Promise<Departure> => {
  try {
    const response = await axios.post<ApiResponse<Departure>>(
      `${BASE_URL}/api/departures`,
      departureData
    );
    
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    throw new Error(response.data.message || 'Failed to create departure');
  } catch (error) {
    console.error('Error creating departure:', error);
    throw error;
  }
};

export const fetchAllDepartures = async (params?: {
  page?: number;
  limit?: number;
  tripId?: string;
  status?: string;
  fromDate?: string;
  toDate?: string;
}): Promise<{
  departures: Departure[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}> => {
  try {
    const response = await axios.get<ApiResponse<Departure[]>>(
      `${BASE_URL}/api/departures`,
      { params }
    );

    if (response.data.success && response.data.data) {
      return {
        departures: response.data.data,
        pagination: response.data.pagination,
      };
    }

    throw new Error(response.data.message || "Failed to fetch departures");
  } catch (error) {
    console.error("Error fetching all departures:", error);
    throw error;
  }
};

export const updateDeparture = async (
  departureId: string,
  updateData: Partial<Departure>
): Promise<Departure> => {
  try {
    const response = await axios.patch<ApiResponse<Departure>>(
      `${BASE_URL}/api/departures/${departureId}`,
      updateData
    );
    
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    throw new Error(response.data.message || 'Failed to update departure');
  } catch (error) {
    console.error('Error updating departure:', error);
    throw error;
  }
};

export const deleteDeparture = async (departureId: string): Promise<void> => {
  try {
    const response = await axios.delete<ApiResponse<Departure>>(
      `${BASE_URL}/api/departures/${departureId}`
    );
    
    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to delete departure');
    }
  } catch (error) {
    console.error('Error deleting departure:', error);
    throw error;
  }
};
// ============================================
// ADMIN BOOKING API FUNCTIONS
// ============================================

export const fetchAllBookings = async (params?: {
  page?: number;
  limit?: number;
  status?: string;
  email?: string;
  tripId?: string;
  sortBy?: string;
  sortOrder?: string;
}): Promise<{
  bookings: Booking[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}> => {
  try {
    const response = await axios.get<ApiResponse<Booking[]>>(`${BASE_URL}/api/bookings`, { params });
    
    if (response.data.success && response.data.data) {
      return {
        bookings: response.data.data,
        pagination: response.data.pagination,
      };
    }
    throw new Error(response.data.message || 'Failed to fetch bookings');
  } catch (error) {
    console.error('Error fetching all bookings:', error);
    throw error;
  }
};

export const fetchBookingById = async (bookingId: string): Promise<Booking> => {
  try {
    const response = await axios.get<ApiResponse<Booking>>(
      `${BASE_URL}/api/bookings/${bookingId}`
    );
    
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    throw new Error(response.data.message || 'Booking not found');
  } catch (error) {
    console.error('Error fetching booking by ID:', error);
    throw error;
  }
};

export const updateBooking = async (
  bookingId: string,
  updateData: {
    status?: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
    paymentStatus?: 'PENDING' | 'PAID' | 'REFUNDED' | 'FAILED';
    paymentMethod?: string;
    specialRequests?: string;
  }
): Promise<Booking> => {
  try {
    const response = await axios.patch<ApiResponse<Booking>>(
      `${BASE_URL}/api/bookings/${bookingId}`,
      updateData
    );
    
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    throw new Error(response.data.message || 'Failed to update booking');
  } catch (error) {
    console.error('Error updating booking:', error);
    throw error;
  }
};

export const fetchBookingStats = async (): Promise<BookingStats> => {
  try {
    const response = await axios.get<ApiResponse<BookingStats>>(
      `${BASE_URL}/api/bookings/stats`
    );
    
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    throw new Error(response.data.message || 'Failed to fetch booking statistics');
  } catch (error) {
    console.error('Error fetching booking stats:', error);
    throw error;
  }
};
