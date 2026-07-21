"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MessageSquare } from "lucide-react";
import { BASE_URL } from "@/Var";

interface Booking {
  _id: string;
  fullName: string;
  tourId: { name: string } | string;
  createdAt: string;
  totalPrice: number;
}

interface Inquiry {
  _id: string;
  name: string;
  subject: string;
  createdAt: string;
  status: string;
}

export default function AdminDashboard() {
  const [recentBookings, setRecentBookings] = useState<Booking[]>([]);
  const [recentInquiries, setRecentInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [bookingsRes, inquiriesRes] = await Promise.all([
          fetch(`${BASE_URL}/api/bookings`),
          fetch(`${BASE_URL}/api/inquiries`),
        ]);

        const bookingsData = await bookingsRes.json();
        const inquiriesData = await inquiriesRes.json();

        if (bookingsData.success && bookingsData.data) {
          setRecentBookings(bookingsData.data.slice(0, 10));
        }

        if (inquiriesData.success && inquiriesData.data) {
          setRecentInquiries(inquiriesData.data.slice(0, 10));
        }
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Dashboard Overview</h2>

      {/* Recent Activity */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Recent Bookings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              Recent Bookings
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-sm text-gray-500">Loading bookings...</p>
            ) : recentBookings.length === 0 ? (
              <p className="text-sm text-gray-500">No bookings found.</p>
            ) : (
              <div className="space-y-4">
                {recentBookings.map((booking) => (
                  <div
                    key={booking._id}
                    className="flex items-center justify-between border-b pb-2"
                  >
                    <div>
                      <p className="font-medium">{booking.fullName}</p>
                      <p className="text-sm text-muted-foreground">
                        {typeof booking.tourId === "object" && booking.tourId
                          ? booking.tourId.name
                          : "Custom Tour"}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${booking.totalPrice}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(booking.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Inquiries */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="mr-2 h-5 w-5" />
              Recent Inquiries
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-sm text-gray-500">Loading inquiries...</p>
            ) : recentInquiries.length === 0 ? (
              <p className="text-sm text-gray-500">No inquiries found.</p>
            ) : (
              <div className="space-y-4">
                {recentInquiries.map((inquiry) => (
                  <div
                    key={inquiry._id}
                    className="flex items-center justify-between border-b pb-2"
                  >
                    <div>
                      <p className="font-medium">{inquiry.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {inquiry.subject}
                      </p>
                    </div>
                    <div className="text-right">
                      <p
                        className={`font-medium ${
                          inquiry.status === "New"
                            ? "text-blue-500"
                            : inquiry.status === "In Progress"
                              ? "text-orange-500"
                              : "text-green-500"
                        }`}
                      >
                        {inquiry.status || "Pending"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(inquiry.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
