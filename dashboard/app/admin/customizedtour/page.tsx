"use client"

import { useEffect, useState } from "react"
import { BASE_URL } from "@/app/Var";

type Customer = {
  fullName: string
  email: string
  phone?: string
  whatsapp?: string
  nationality?: string
  contactMethod?: string
}

type TravelPreferences = {
  startMonth?: string
  budget?: string
  detailsAboutTour?: string
}

type CustomTour = {
  _id: string
  customer: Customer
  country: string
  days: number
  groupSize?: string
  travelPreferences: TravelPreferences
  shortDescription?: string
  status: string
  createdAt: string
  updatedAt: string
}

export default function DashboardCustomTours() {
  const [tours, setTours] = useState<CustomTour[]>([])
  const [loading, setLoading] = useState(true)

  const fetchTours = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${BASE_URL}/api/customized/get`)
      const data = await res.json()
      setTours(data.tours)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTours()
  }, [])

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`${BASE_URL}/api/customized/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })
      if (!res.ok) throw new Error("Failed to update status")
      fetchTours()
      alert(`Tour ${status.toLowerCase()} successfully!`)
    } catch (error) {
      console.error(error)
      alert("Error updating status")
    }
  }

  const deleteTour = async (id: string) => {
    if (!confirm("Are you sure you want to delete this tour?")) return
    try {
      const res = await fetch(`${BASE_URL}/api/customized/${id}`, {
        method: "DELETE",
      })
      if (!res.ok) throw new Error("Failed to delete")
      fetchTours()
      alert("Tour deleted successfully!")
    } catch (error) {
      console.error(error)
      alert("Error deleting tour")
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold mb-6">Customized Tours Dashboard</h1>

      {loading ? (
        <p>Loading...</p>
      ) : tours.length === 0 ? (
        <p>No custom tours found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">#</th>
                <th className="px-4 py-2 border">Customer</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Destination</th>
                <th className="px-4 py-2 border">Days</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tours.map((tour, idx) => (
                <tr key={tour._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{idx + 1}</td>
                  <td className="px-4 py-2 border">{tour.customer.fullName}</td>
                  <td className="px-4 py-2 border">{tour.customer.email}</td>
                  <td className="px-4 py-2 border">{tour.country}</td>
                  <td className="px-4 py-2 border">{tour.days}</td>
                  <td className="px-4 py-2 border">{tour.status}</td>
                  <td className="px-4 py-2 border flex gap-2">
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                      onClick={() => alert(JSON.stringify(tour, null, 2))}
                    >
                      View
                    </button>
                    {tour.status !== "Approved" && (
                      <button
                        className="bg-green-500 text-white px-2 py-1 rounded"
                        onClick={() => updateStatus(tour._id, "Approved")}
                      >
                        Approve
                      </button>
                    )}
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => deleteTour(tour._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
