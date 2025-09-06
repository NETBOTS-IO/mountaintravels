"use client";

import { useState, useEffect, useCallback } from "react";
import { 
  Search, 
  Users, 
  Eye,
  CheckCircle,
  XCircle,
  Mail,
  Phone,
  Download,
  RefreshCw
} from "lucide-react";
import { toast } from "react-hot-toast";
import { Booking, Tour, Departure } from "../../../lib/types";
import { fetchAllBookings, updateBooking } from "@/lib/data-utils";

interface BookingsTabProps {
  onStatsUpdate: () => void;
}

const BookingsTab: React.FC<BookingsTabProps> = ({ onStatsUpdate }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  // Filters and pagination
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    paymentStatus: '',
    page: 1,
    limit: 20
  });

  // Load bookings when filters change
  useEffect(() => {
    loadBookings();
  }, [filters]);

  const loadBookings = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetchAllBookings({ 
        page: filters.page, 
        limit: filters.limit, 
        status: filters.status, 
        email: filters.search 
      });
      
      if (response.bookings) {
        setBookings(response.bookings);
      }
    } catch (error) {
      console.error('Error loading bookings:', error);
      toast.error('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const handleUpdateBookingStatus = async (
    bookingId: string,
    status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED',
    paymentStatus?: 'PENDING' | 'PAID' | 'REFUNDED' | 'FAILED'
  ) => {
    try {
      await updateBooking(bookingId, { status, paymentStatus });
      
      // Reload data after successful update
      await loadBookings();
      onStatsUpdate();
      setSelectedBooking(null);
      toast.success('Booking updated successfully');
    } catch (error) {
      console.error('Error updating booking:', error);
      toast.error('Error updating booking');
    }
  };

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
    
    if (type === 'payment') {
      const paymentColors = {
        PENDING: "bg-orange-100 text-orange-800",
        PAID: "bg-green-100 text-green-800",
        REFUNDED: "bg-purple-100 text-purple-800",
        FAILED: "bg-red-100 text-red-800"
      };
      return `${baseClasses} ${paymentColors[status as keyof typeof paymentColors] || "bg-gray-100 text-gray-800"}`;
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

  // Type guards to safely access properties
  const isTour = (tripId: string | Tour): tripId is Tour => typeof tripId === 'object' && tripId !== null;
  const isDeparture = (departureId: string | Departure): departureId is Departure => typeof departureId === 'object' && departureId !== null;

  // Helper function to get trip name safely
  const getTripName = (tripId: string | Tour) => {
    if (isTour(tripId)) {
      return tripId.name;
    }
    return 'N/A';
  };

  // Helper function to get departure date safely
  const getDepartureDate = (departureId: string | Departure) => {
    if (isDeparture(departureId)) {
      return formatDate(departureId.date);
    }
    return 'TBD';
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow border">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by email..."
              value={filters.search}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  search: e.target.value,
                  page: 1,
                }))
              }
              className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          <select
            value={filters.status}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                status: e.target.value,
                page: 1,
              }))
            }
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="">All Statuses</option>
            <option value="PENDING">Pending</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="CANCELLED">Cancelled</option>
            <option value="COMPLETED">Completed</option>
          </select>

          <select
            value={filters.paymentStatus}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                paymentStatus: e.target.value,
                page: 1,
              }))
            }
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="">All Payment Status</option>
            <option value="PENDING">Pending</option>
            <option value="PAID">Paid</option>
            <option value="REFUNDED">Refunded</option>
            <option value="FAILED">Failed</option>
          </select>

          <button
            onClick={() => loadBookings()}
            className="flex items-center justify-center px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            Refresh
          </button>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-lg shadow border overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">All Bookings</h3>
            <button
              onClick={() => {
                /* Export functionality */
              }}
              className="flex items-center px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trip
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Departure
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Travelers
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bookings && bookings.length > 0 ? (
                bookings.map((booking) => (
                  <tr key={booking._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {booking.firstName} {booking.lastName}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <Mail className="w-4 h-4 mr-1" />
                          {booking.email}
                        </div>
                        {booking.phone && (
                          <div className="text-sm text-gray-500 flex items-center">
                            <Phone className="w-4 h-4 mr-1" />
                            {booking.phone}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {getTripName(booking.tripId)}
                      </div>
                      <div className="text-sm text-gray-500">
                        #{booking.bookingNumber}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {booking.departureId
                          ? getDepartureDate(booking.departureId)
                          : "No departure selected"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {booking.travelers}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {formatCurrency(booking.totalPrice)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={getStatusBadge(booking.status, "booking")}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={getStatusBadge(
                          booking.paymentStatus,
                          "payment"
                        )}
                      >
                        {booking.paymentStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(booking.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setSelectedBooking(booking)}
                          className="text-orange-600 hover:text-orange-900"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {booking.status === "PENDING" && (
                          <button
                            onClick={() =>
                              handleUpdateBookingStatus(
                                booking._id,
                                "CONFIRMED",
                                "PAID"
                              )
                            }
                            className="text-green-600 hover:text-green-900"
                            title="Confirm booking and mark paid"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        )}
                        {booking.status !== "CANCELLED" && (
                          <button
                            onClick={() =>
                              handleUpdateBookingStatus(
                                booking._id,
                                "CANCELLED",
                                "REFUNDED"
                              )
                            }
                            className="text-red-600 hover:text-red-900"
                            title="Cancel booking and refund"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={9}
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    {/* Loading State */}
                    {loading && (
                      <div className="flex items-center justify-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
                      </div>
                    )}
                    {/* Empty State */}
                    {!loading && bookings?.length === 0 && (
                      <div className="text-center py-12">
                        <Users className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">
                          No bookings found
                        </h3>
                      </div>
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Booking Detail Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Booking Details
                </h3>
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Customer Name
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {selectedBooking.firstName} {selectedBooking.lastName}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {selectedBooking.email}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Phone
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {selectedBooking.phone || "Not provided"}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Travelers
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {selectedBooking.travelers}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Trip
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {getTripName(selectedBooking.tripId)}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Total Price
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {formatCurrency(selectedBooking.totalPrice)}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Status
                    </label>
                    <span
                      className={getStatusBadge(
                        selectedBooking.status,
                        "booking"
                      )}
                    >
                      {selectedBooking.status}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Payment Status
                    </label>
                    <span
                      className={getStatusBadge(
                        selectedBooking.paymentStatus,
                        "payment"
                      )}
                    >
                      {selectedBooking.paymentStatus}
                    </span>
                  </div>
                </div>

                {selectedBooking.specialRequests && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Special Requests
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {selectedBooking.specialRequests}
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Created
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {formatDate(selectedBooking.createdAt)}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Last Updated
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {formatDate(selectedBooking.updatedAt)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end space-x-3">
                {selectedBooking.status === "PENDING" && (
                  <button
                    onClick={() =>
                      handleUpdateBookingStatus(
                        selectedBooking._id,
                        "CONFIRMED",
                        "PAID"
                      )
                    }
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Confirm & Mark Paid
                  </button>
                )}
                {selectedBooking.status !== "CANCELLED" && (
                  <button
                    onClick={() =>
                      handleUpdateBookingStatus(
                        selectedBooking._id,
                        "CANCELLED",
                        "REFUNDED"
                      )
                    }
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Cancel & Refund
                  </button>
                )}
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingsTab;