"use client"

import { useState } from "react"
import { BASE_URL } from "@/app/Var"

type Tour = typeof defaultTour

const defaultTour = {
  customer: {
    fullName: "",
    email: "",
    phone: "",
    nationality: "",
    contactMethod: "Email",
  },
  country: "",
  days: 1,
  groupSize: "",
  shortDescription: "",
  travelPreferences: {
    startMonth: "",
    budget: "",
    detailsAboutTour: "",
  },
  createdAt: "",
  updatedAt: "",
}

export default function CustomizedTour() {
  const [tour, setTour] = useState<Tour>(defaultTour)
  const [loading, setLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setTour({ ...tour, [name]: value })
  }

  const handleNestedChange = (
    section: string,
    field: string,
    value: string
  ) => {
    setTour({
      ...tour,
      [section]: {
        ...(tour as any)[section],
        [field]: value,
      },
    })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch(`${BASE_URL}/api/customized/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tour),
      })

      if (!res.ok) throw new Error("Failed to submit request")

      setShowSuccess(true)
      setTour(defaultTour)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl font-bold mb-8 text-center">
            PLAN YOUR ADVENTURE
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* PERSONAL DETAILS */}
            <h2 className="text-xl font-bold">Personal Details</h2>

            <input
              placeholder="Full Name"
              value={tour.customer.fullName}
              onChange={(e) =>
                handleNestedChange("customer", "fullName", e.target.value)
              }
              className="w-full border p-3 rounded"
              required
            />

            <input
              type="email"
              placeholder="Email Address"
              value={tour.customer.email}
              onChange={(e) =>
                handleNestedChange("customer", "email", e.target.value)
              }
              className="w-full border p-3 rounded"
              required
            />

            <input
              placeholder="Phone / WhatsApp"
              value={tour.customer.phone}
              onChange={(e) =>
                handleNestedChange("customer", "phone", e.target.value)
              }
              className="w-full border p-3 rounded"
            />

            <input
              placeholder="Nationality"
              value={tour.customer.nationality}
              onChange={(e) =>
                handleNestedChange("customer", "nationality", e.target.value)
              }
              className="w-full border p-3 rounded"
            />

            {/* TRIP DETAILS */}
            <h2 className="text-xl font-bold">Trip Details</h2>

            <input
              name="country"
              placeholder="Destination"
              value={tour.country}
              onChange={handleChange}
              className="w-full border p-3 rounded"
            />

            <input
              name="days"
              type="number"
              placeholder="Number of Days"
              value={tour.days}
              onChange={handleChange}
              className="w-full border p-3 rounded"
            />

            <input
              name="groupSize"
              placeholder="Group Size"
              value={tour.groupSize}
              onChange={handleChange}
              className="w-full border p-3 rounded"
            />

            {/* PREFERENCES */}
            <h2 className="text-xl font-bold">Preferences</h2>

            <input
              placeholder="Preferred Start Month"
              value={tour.travelPreferences.startMonth}
              onChange={(e) =>
                handleNestedChange(
                  "travelPreferences",
                  "startMonth",
                  e.target.value
                )
              }
              className="w-full border p-3 rounded"
            />

            <input
              placeholder="Budget Range (USD)"
              value={tour.travelPreferences.budget}
              onChange={(e) =>
                handleNestedChange(
                  "travelPreferences",
                  "budget",
                  e.target.value
                )
              }
              className="w-full border p-3 rounded"
            />

            <textarea
              placeholder="Detail Type About Your Tour"
              value={tour.travelPreferences.detailsAboutTour}
              onChange={(e) =>
                handleNestedChange(
                  "travelPreferences",
                  "detailsAboutTour",
                  e.target.value
                )
              }
              className="w-full border p-3 rounded"
            />

            <textarea
              name="shortDescription"
              placeholder="Additional Notes / Short Description"
              value={tour.shortDescription}
              onChange={handleChange}
              className="w-full border p-3 rounded"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-3 rounded font-bold"
            >
              {loading ? "Submitting..." : "Submit Custom Tour Request"}
            </button>
          </form>
        </div>
      </section>

      {/* SUCCESS POPUP */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full text-center shadow-xl">
            <h2 className="text-2xl font-bold mb-3 text-green-600">
              Request Received 🎉
            </h2>

            <p className="text-gray-600 mb-6">
              Your customized tour request has been Summited.
              <br />
              We’ll be in touch with you shortly to craft your perfect adventure.
            </p>

            <button
              onClick={() => setShowSuccess(false)}
              className="bg-primary text-white px-6 py-2 rounded font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  )
}
