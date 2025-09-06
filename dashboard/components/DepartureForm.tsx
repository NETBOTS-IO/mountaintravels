"use client";

import React, { useState, useEffect } from "react";
import { Tour, Departure } from "@/lib/types";

interface DepartureFormProps {
  mode: "create" | "edit";
  trips: Tour[];
  initialData?: Departure; // For edit mode
  onSubmit: (data: any) => Promise<void>;
  onCancel: () => void;
}

const DepartureForm: React.FC<DepartureFormProps> = ({
  mode,
  trips,
  initialData,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    tripId: "",
    date: "",
    price: "",
    maxSpots: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        tripId: typeof initialData.tripId === "object" ? initialData.tripId._id : initialData.tripId,
        date: initialData.date.split("T")[0],
        price: initialData.price.toString(),
        maxSpots: initialData.maxSpots.toString(),
      });
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await onSubmit({
        tripId: formData.tripId,
        date: formData.date,
        price: parseFloat(formData.price),
        maxSpots: parseInt(formData.maxSpots),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Trip */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Trip</label>
        <select
          required
          value={formData.tripId}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, tripId: e.target.value }))
          }
          className="mt-1 block w-full p-3 outline-none border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
        >
          <option value="">Select a tour</option>
          {trips?.map((trip) => (
            <option key={trip._id} value={trip._id}>
              {trip.name}
            </option>
          ))}
        </select>
      </div>

      {/* Date */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Departure Date</label>
        <input
          type="date"
          required
          value={formData.date}
          onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
          className="outline-none mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
        />
      </div>

      {/* Price & Capacity */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Price per Person</label>
          <input
            type="number"
            required
            min="0"
            step="0.01"
            value={formData.price}
            onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))}
            className="outline-none mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Maximum Spots</label>
          <input
            type="number"
            required
            min="1"
            value={formData.maxSpots}
            onChange={(e) => setFormData((prev) => ({ ...prev, maxSpots: e.target.value }))}
            className="outline-none mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50"
        >
          {loading
            ? mode === "edit"
              ? "Updating..."
              : "Creating..."
            : mode === "edit"
            ? "Update Departure"
            : "Create Departure"}
        </button>
      </div>
    </form>
  );
};

export default DepartureForm;