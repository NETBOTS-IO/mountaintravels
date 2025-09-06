"use client";

import { useState } from "react";
import { 
  Calendar, 
  Users, 
  TrendingUp,
} from "lucide-react";


// Import the separated tab components
import BookingsTab from "./bookingsTab";
import DeparturesTab from "./departuresTab";
import StatisticsTab from "./statsTab";


const BookingManagement = () => {
  const [activeTab, setActiveTab] = useState<'bookings' | 'departures' | 'stats'>('bookings');
  const [statsRefreshTrigger, setStatsRefreshTrigger] = useState(0);

  // Function to trigger stats refresh when bookings are updated
  const handleStatsUpdate = () => {
    setStatsRefreshTrigger(prev => prev + 1);
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'bookings':
        return <BookingsTab onStatsUpdate={handleStatsUpdate} />;
      case 'departures':
        return <DeparturesTab />;
      case 'stats':
        return <StatisticsTab refreshTrigger={statsRefreshTrigger} />;
      default:
        return <BookingsTab onStatsUpdate={handleStatsUpdate} />;
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Booking Management
        </h1>
        <p className="text-gray-600">
          Manage bookings, departures, and view statistics
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: "bookings", label: "Bookings", icon: Users },
              { id: "departures", label: "Departures", icon: Calendar },
              { id: "stats", label: "Statistics", icon: TrendingUp },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === id
                    ? "border-orange-500 text-orange-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <Icon className="w-5 h-5 mr-2" />
                {label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Render Active Tab */}
      {renderActiveTab()}
    </div>
  );
};

export default BookingManagement;