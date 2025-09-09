"use client";

import { useState, useEffect, useCallback } from "react";
import { 
  Plus, 
  Calendar,
  Eye,
  Edit,
  RefreshCw,
  X,
  Trash2
} from "lucide-react";
import { toast } from "react-hot-toast";
import { Departure, Tour } from "../../../lib/types";
import { createDeparture, deleteDeparture, fetchAllDepartures, getTours, updateDeparture } from "@/lib/data-utils";
import CreateDepartureForm from "@/components/DepartureForm";

const DeparturesTab: React.FC = () => {
  const [departures, setDepartures] = useState<Departure[]>([]);
  const [trips, setTrips] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedDeparture, setSelectedDeparture] = useState<Departure | null>(null);
  const [viewMode, setViewMode] = useState<"create" | "edit" | "view" | null>(null);

  const [departureFilters, setDepartureFilters] = useState({ 
    tripId: '', 
    search: '', 
    status: '', 
    page: 1, 
    limit: 20,
    fromDate: '',
    toDate: ''
  });

  // Load data when filters change
  useEffect(() => {
    loadDepartures();
  }, [departureFilters]);

  // Load trips on component mount
  useEffect(() => {
    loadTrips();
  }, []);

  const loadTrips = async () => {
    try {
      const tripsData = await getTours();
      setTrips(tripsData);
    } catch (error) {
      console.error('Error loading trips:', error);
    }
  };

  const loadDepartures = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetchAllDepartures({
        page: departureFilters.page,
        limit: departureFilters.limit,
        status: departureFilters.status,
        tripId: departureFilters.tripId || undefined,
        fromDate: departureFilters.fromDate,
        toDate: departureFilters.toDate
      });
      
      if (response && response.departures) {
        setDepartures(response.departures);
      } else {
        setDepartures([]);
      }
    } catch (error) {
      console.error("Error loading departures:", error);
      toast.error('Failed to load departures');
      setDepartures([]);
    } finally {
      setLoading(false);
    }
  }, [departureFilters]);

  // Utility functions
  const getStatusBadge = (status: string) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    const departureColors = {
      AVAILABLE: "bg-green-100 text-green-800",
      LIMITED: "bg-yellow-100 text-yellow-800",
      SOLD_OUT: "bg-red-100 text-red-800",
      CANCELLED: "bg-gray-100 text-gray-800"
    };
    return `${baseClasses} ${departureColors[status as keyof typeof departureColors] || "bg-gray-100 text-gray-800"}`;
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

  return (
    <div className="space-y-6">
      {/* Departure Filters and Actions */}
      <div className="bg-white p-6 rounded-lg shadow border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">
            Manage Departures
          </h3>
          <button
            onClick={() => setViewMode("create")}
            className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Departure
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          <select
            value={departureFilters.tripId}
            onChange={(e) =>
              setDepartureFilters((prev) => ({
                ...prev,
                tripId: e.target.value,
                page: 1,
              }))
            }
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="">All Tours</option>
            {trips && trips.length > 0 ? (
              trips.map((trip) => (
                <option key={trip.id} value={trip.id}>
                  {trip.name}
                </option>
              ))
            ) : (
              <option value="" disabled>
                Loading tours...
              </option>
            )}
          </select>

          <select
            value={departureFilters.status}
            onChange={(e) =>
              setDepartureFilters((prev) => ({
                ...prev,
                status: e.target.value,
                page: 1,
              }))
            }
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="">All Statuses</option>
            <option value="AVAILABLE">Available</option>
            <option value="LIMITED">Limited</option>
            <option value="SOLD_OUT">Sold Out</option>
            <option value="CANCELLED">Cancelled</option>
          </select>

          <input
            type="date"
            value={departureFilters.fromDate}
            onChange={(e) =>
              setDepartureFilters((prev) => ({
                ...prev,
                fromDate: e.target.value,
                page: 1,
              }))
            }
            className="outline-none w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            placeholder="From Date"
          />

          <input
            type="date"
            value={departureFilters.toDate}
            onChange={(e) =>
              setDepartureFilters((prev) => ({
                ...prev,
                toDate: e.target.value,
                page: 1,
              }))
            }
            className="outline-none w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            placeholder="To Date"
          />

          <button
            onClick={() => loadDepartures()}
            className="flex items-center justify-center px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            Refresh
          </button>
        </div>
      </div>

      {/* Departures Table */}
      <div className="bg-white rounded-lg shadow border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tour
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Capacity
                </th> */}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bookings
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {departures && departures.length > 0 ? (
                departures.map((departure) => (
                  <tr key={departure._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {getTripName(departure.tripId)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatDate(departure.date)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {formatCurrency(departure.price)}
                    </td>
                    {/* <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {departure.spotsLeft} / {departure.maxSpots}
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div
                          className="bg-orange-600 h-2 rounded-full"
                          style={{
                            width: `${
                              ((departure.maxSpots - departure.spotsLeft) /
                                departure.maxSpots) *
                              100
                            }%`,
                          }}
                        ></div>
                      </div>
                    </td> */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {departure.bookingCount || 0}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={getStatusBadge(departure.status)}>
                        {departure.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {
                            setSelectedDeparture(departure);
                            setViewMode("view");
                          }}
                          className="text-orange-600 hover:text-orange-900"
                          title="View departure details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => {
                            setSelectedDeparture(departure);
                            setViewMode("edit");
                          }}
                          className="text-blue-600 hover:text-blue-900"
                          title="Edit departure"
                        >
                          <Edit className="w-4 h-4" />
                        </button>

                        <button
                          onClick={async () => {
                            if (
                              confirm(
                                "Are you sure you want to delete this departure?"
                              )
                            ) {
                              await deleteDeparture(departure._id);
                              await loadDepartures();
                              toast.success("Departure deleted");
                            }
                          }}
                          className="text-red-600 hover:text-red-900"
                          title="Delete departure"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    {/* Loading State */}
                    {loading && (
                      <div className="flex items-center justify-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
                      </div>
                    )}

                    {/* Empty State */}
                    {!loading && departures?.length === 0 && (
                      <div className="text-center py-12">
                        <Calendar className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">
                          No departures found
                        </h3>
                        {departureFilters.tripId ? (
                          <p className="mt-1 text-sm text-gray-500">
                            No departures found for the selected tour.
                          </p>
                        ) : (
                          <p className="mt-1 text-sm text-gray-500">
                            Select a tour to view departures or create a new
                            one.
                          </p>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Departure Pagination */}
      {departures?.length > 0 && (
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing {(departureFilters.page - 1) * departureFilters.limit + 1}{" "}
              to{" "}
              {Math.min(
                departureFilters.page * departureFilters.limit,
                departures?.length || 0
              )}{" "}
              of {departures?.length || 0} departures
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() =>
                  setDepartureFilters((prev) => ({
                    ...prev,
                    page: Math.max(1, prev.page - 1),
                  }))
                }
                disabled={departureFilters.page === 1}
                className="px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="px-3 py-2 text-sm text-gray-700">
                Page {departureFilters.page}
              </span>
              <button
                onClick={() =>
                  setDepartureFilters((prev) => ({
                    ...prev,
                    page: prev.page + 1,
                  }))
                }
                disabled={(departures?.length || 0) < departureFilters.limit}
                className="px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create / Edit Departure Modal */}
      {(viewMode === "create" || viewMode === "edit") && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {viewMode === "edit" ? "Edit Departure" : "Create New Departure"}
                </h3>
                <button onClick={() => setViewMode(null)} className="text-gray-400 hover:text-red-500 transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <CreateDepartureForm
                mode={viewMode}
                trips={trips}
                initialData={viewMode === "edit" ? selectedDeparture ?? undefined : undefined}
                onSubmit={async (data) => {
                  if (viewMode === "edit" && selectedDeparture) {
                    await updateDeparture(selectedDeparture._id, data);
                    toast.success("Departure updated");
                  } else {
                    await createDeparture(data);
                    toast.success("Departure created");
                  }
                  setViewMode(null);
                  await loadDepartures();
                }}
                onCancel={() => setViewMode(null)}
              />
            </div>
          </div>
        </div>
      )}
      
      {/* View Departure Modal */}
      {viewMode === "view" && selectedDeparture && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-2/3 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Departure Details</h3>
              <button onClick={() => setViewMode(null)} className="text-gray-400 hover:text-red-500 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              {/* <p><strong>Trip:</strong> {getTripName(selectedDeparture.tripId)}</p> */}
              <p><strong>Date:</strong> {formatDate(selectedDeparture.date)}</p>
              <p><strong>Price:</strong> {formatCurrency(selectedDeparture.price)}</p>
              <p><strong>Capacity:</strong> {selectedDeparture.spotsLeft} / {selectedDeparture.maxSpots}</p>
              <p><strong>Status:</strong> {selectedDeparture.status}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeparturesTab;