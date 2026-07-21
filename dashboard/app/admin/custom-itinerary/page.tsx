"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { getCustomItineraries } from "@/lib/data-utils";
import {
  MapPin,
  Calendar,
  Users,
  DollarSign,
  Clock,
  Search,
  Route,
  Loader2,
  Tag,
  Phone,
  Mail,
  FileText,
} from "lucide-react";

interface CustomItinerary {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  destinations?: string | string[];
  duration?: string;
  travelers?: string | number;
  budget?: string;
  travelDate?: string;
  details?: string;
  createdAt: string;
}

const StatCard = ({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: any;
  label: string;
  value: number | string;
  color: string;
}) => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
    <div
      className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}
    >
      <Icon className="w-6 h-6" />
    </div>
    <div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-xs text-gray-500 font-medium">{label}</p>
    </div>
  </div>
);

export default function CustomItineraryPage() {
  const [itineraries, setItineraries] = useState<CustomItinerary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const res = await getCustomItineraries();
        if (res?.success) {
          setItineraries(res.data || []);
        } else {
          setError("Failed to load custom itinerary requests");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const filtered = itineraries.filter(
    (i) =>
      i.name?.toLowerCase().includes((search || "").toLowerCase()) ||
      i.email?.toLowerCase().includes((search || "").toLowerCase()) ||
      String(i.destinations || "")
        .toLowerCase()
        .includes((search || "").toLowerCase()),
  );

  const thisWeek = itineraries.filter(
    (i) =>
      new Date(i.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
  ).length;

  if (loading)
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
      </div>
    );
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="p-4 md:p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Custom Tour Requests
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Tailor-made itinerary requests from website visitors
          </p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email, destination..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 bg-white"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Route}
          label="Total Requests"
          value={itineraries.length}
          color="bg-orange-50 text-orange-600"
        />
        <StatCard
          icon={Clock}
          label="This Week"
          value={thisWeek}
          color="bg-blue-50 text-blue-600"
        />
        <StatCard
          icon={Users}
          label="Avg. Travelers"
          value={
            itineraries.length > 0
              ? Math.round(
                  itineraries.reduce(
                    (s, i) => s + (Number(i.travelers) || 0),
                    0,
                  ) / itineraries.length,
                ) || "–"
              : "–"
          }
          color="bg-green-50 text-green-600"
        />
        <StatCard
          icon={MapPin}
          label="Showing"
          value={filtered.length}
          color="bg-purple-50 text-purple-600"
        />
      </div>

      {/* Cards Grid */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm text-center py-20 text-gray-400">
          <Route className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="font-medium">No custom tour requests found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((item) => {
            const isExpanded = expanded === item._id;
            const destStr = Array.isArray(item.destinations)
              ? item.destinations.join(", ")
              : item.destinations || "Not specified";

            return (
              <div
                key={item._id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-orange-200 hover:shadow-md transition-all overflow-hidden"
              >
                {/* Card Header */}
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-b border-orange-100 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        {item.name?.charAt(0)?.toUpperCase() || "?"}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-sm">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                          <Clock className="w-3 h-3" />
                          {format(new Date(item.createdAt), "dd MMM yyyy")}
                        </p>
                      </div>
                    </div>
                    <span className="bg-orange-100 text-orange-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-orange-200 flex-shrink-0">
                      CUSTOM
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 space-y-3">
                  {/* Contact */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <Mail className="w-3.5 h-3.5 text-orange-500 flex-shrink-0" />
                      <span className="truncate">{item.email}</span>
                    </div>
                    {item.phone && (
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Phone className="w-3.5 h-3.5 text-orange-500 flex-shrink-0" />
                        <span>{item.phone}</span>
                      </div>
                    )}
                  </div>

                  {/* Tour Info Grid */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-gray-50 rounded-lg p-2.5">
                      <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mb-0.5">
                        Destination
                      </p>
                      <p className="text-xs font-medium text-gray-800 truncate">
                        {destStr}
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2.5">
                      <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mb-0.5">
                        Duration
                      </p>
                      <p className="text-xs font-medium text-gray-800">
                        {item.duration || "–"}
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2.5">
                      <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mb-0.5">
                        Travelers
                      </p>
                      <p className="text-xs font-medium text-gray-800">
                        {item.travelers || "–"}
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2.5">
                      <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mb-0.5">
                        Budget
                      </p>
                      <p className="text-xs font-medium text-gray-800">
                        {item.budget || "–"}
                      </p>
                    </div>
                  </div>

                  {item.travelDate && (
                    <div className="flex items-center gap-2 text-xs text-gray-600 bg-blue-50 rounded-lg p-2.5">
                      <Calendar className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                      <span>
                        <span className="font-semibold">Travel Date:</span>{" "}
                        {item.travelDate}
                      </span>
                    </div>
                  )}

                  {item.details && (
                    <>
                      <button
                        onClick={() =>
                          setExpanded(isExpanded ? null : item._id)
                        }
                        className="flex items-center gap-1.5 text-xs text-orange-600 font-semibold hover:text-orange-700 transition-colors"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        {isExpanded ? "Hide" : "View"} Special Requirements
                      </button>
                      {isExpanded && (
                        <div className="bg-amber-50 border border-amber-100 rounded-lg p-3 text-xs text-gray-700 leading-relaxed">
                          {item.details}
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* Actions */}
                <div className="px-4 pb-4">
                  <a
                    href={`mailto:${item.email}?subject=Your Custom Tour Request — Mountain Travels Pakistan`}
                    className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold py-2.5 rounded-xl transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    Reply to {item.name.split(" ")[0]}
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
