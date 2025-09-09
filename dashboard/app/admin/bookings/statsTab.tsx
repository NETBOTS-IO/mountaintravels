"use client";

import { useState, useEffect, useCallback } from "react";
import { 
  Users, 
  Clock,
  CheckCircle,
  DollarSign
} from "lucide-react";
import { BookingStats, Tour, Departure } from "../../../lib/types";
import { fetchBookingStats } from "@/lib/data-utils";

interface StatisticsTabProps {
  refreshTrigger?: number;
}

const StatisticsTab: React.FC<StatisticsTabProps> = ({ refreshTrigger }) => {
  const [stats, setStats] = useState<BookingStats | null>(null);
  const [loading, setLoading] = useState(false);

  // Load stats on component mount and when refresh trigger changes
  useEffect(() => {
    loadStats();
  }, [refreshTrigger]);

  const loadStats = useCallback(async () => {
    setLoading(true);
    try {
      const statsData = await fetchBookingStats();
      setStats(statsData);
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Utility functions
  const getStatusBadge = (status: string, type: 'booking' | 'payment' = 'booking') => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    
    if (type === 'booking') {
      const statusColors = {
        PENDING: "bg-yellow-100 text-yellow-800",
        CONFIRMED: "bg-green-100 text-green-800",
        CANCELLED: "bg-red-100 text-red-800",
        COMPLETED: "bg-blue-100 text-blue-800"
      };
      return `${baseClasses} ${statusColors[status as keyof typeof statusColors] || "bg-gray-100 text-gray-800"}`;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  // Type guard to safely access properties
  const isTour = (tripId: string | Tour): tripId is Tour => typeof tripId === 'object' && tripId !== null;

  // Helper function to get trip name safely
  const getTripName = (tripId: string | Tour) => {
    if (isTour(tripId)) {
      return tripId.name;
    }
    return 'N/A';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {stats && (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow border">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Total Bookings
                  </p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {stats.totalBookings}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow border">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Pending
                  </p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {stats.pendingBookings}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow border">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Confirmed
                  </p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {stats.confirmedBookings}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow border">
              <div className="flex items-center">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <DollarSign className="w-6 h-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Total Revenue
                  </p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {formatCurrency(stats.totalRevenue)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Bookings */}
          <div className="bg-white rounded-lg shadow border">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                Recent Bookings
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {stats?.recentBookings && stats.recentBookings.length > 0 ? (
                  stats.recentBookings.map((booking) => (
                    <div
                      key={booking._id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div>
                          <p className="font-medium text-gray-900">
                            {booking.firstName} {booking.lastName}
                          </p>
                          <p className="text-sm text-gray-600">
                            {booking.email}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">
                            {getTripName(booking.tripId)}
                          </p>
                          <p className="text-sm text-gray-600">
                            {formatCurrency(booking.totalPrice)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span
                          className={getStatusBadge(
                            booking.status,
                            "booking"
                          )}
                        >
                          {booking.status}
                        </span>
                        <span className="text-sm text-gray-500">
                          {formatDate(booking.createdAt)}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No recent bookings found
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default StatisticsTab;