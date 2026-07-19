"use client";

import { useState } from "react";
import { X } from "lucide-react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/app/Var";

interface CustomItineraryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CustomItineraryModal({
  isOpen,
  onClose,
}: CustomItineraryModalProps) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    destinations: [] as string[],
    duration: "",
    travelers: 1,
    budget: "",
    travelDate: "",
    details: "",
  });

  if (!isOpen) return null;

  const destinationsOptions = [
    "Culture & Heritage",
    "Mountain & Trekking",
    "Safaris & Wildlife",
    "Desert & Coastal Routes",
    "Bespoke Luxury Stays",
    "Custom / Other Valley Trek",
  ];

  const handleDestinationToggle = (dest: string) => {
    setFormData((prev) => ({
      ...prev,
      destinations: prev.destinations.includes(dest)
        ? prev.destinations.filter((d) => d !== dest)
        : [...prev.destinations, dest],
    }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axios.post(`${BASE_URL}/api/custom-itineraries/add`, formData);
      setSuccess(true);
    } catch (err: any) {
      console.error(err);
      setError(
        err?.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out]">
      <div className="relative w-full max-w-lg bg-background border border-border rounded-2xl shadow-2xl overflow-hidden animate-[scaleIn_0.3s_ease-out] text-foreground p-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-[#ff9800] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {success ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 bg-[#45919c]/10 text-[#45919c] rounded-full flex items-center justify-center mx-auto text-3xl">
              ✓
            </div>
            <h3 className="text-xl font-bold">Request Submitted!</h3>
            <p className="text-sm text-muted-foreground max-w-sm mx-auto">
              Thank you for planning with Mountain Travels Pakistan. Our travel
              experts will get in touch with your custom itinerary soon.
            </p>
            <Button
              onClick={() => {
                onClose();
                setSuccess(false);
                setStep(1);
                setFormData({
                  name: "",
                  email: "",
                  phone: "",
                  destinations: [],
                  duration: "",
                  travelers: 1,
                  budget: "",
                  travelDate: "",
                  details: "",
                });
              }}
              className="bg-[#45919c] hover:bg-[#ff9800] text-white rounded-full px-6"
            >
              Close Window
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <span className="text-[10px] uppercase tracking-wider font-semibold text-primary">
                Step {step} of 3
              </span>
              <h2 className="text-lg font-bold text-foreground">
                Custom Itinerary Planner
              </h2>
            </div>

            {error && (
              <div className="p-3 text-xs bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg">
                {error}
              </div>
            )}

            {/* STEP 1: Destinations & Preferences */}
            {step === 1 && (
              <div className="space-y-4 animate-[fadeIn_0.2s_ease-out]">
                <div className="space-y-2">
                  <label className="text-xs font-semibold">
                    Where would you like to go?
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {destinationsOptions.map((dest) => {
                      const selected = formData.destinations.includes(dest);
                      return (
                        <button
                          key={dest}
                          type="button"
                          onClick={() => handleDestinationToggle(dest)}
                          className={`p-2.5 text-left text-xs rounded-xl border transition-all ${
                            selected
                              ? "border-[#45919c] bg-[#45919c]/10 text-foreground font-semibold"
                              : "border-border hover:border-[#45919c]/40"
                          }`}
                        >
                          {dest}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold">Duration</label>
                    <select
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      required
                      className="w-full text-xs p-2 rounded-lg border border-border bg-background"
                    >
                      <option value="">Select duration</option>
                      <option value="1-5 Days">1-5 Days</option>
                      <option value="6-10 Days">6-10 Days</option>
                      <option value="11-15 Days">11-15 Days</option>
                      <option value="16-20 Days">16-20 Days</option>
                      <option value="21+ Days">21+ Days</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold">
                      Travelers Count
                    </label>
                    <input
                      type="number"
                      name="travelers"
                      min={1}
                      max={50}
                      value={formData.travelers}
                      onChange={handleInputChange}
                      required
                      className="w-full text-xs p-2 rounded-lg border border-border bg-background"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <Button
                    type="button"
                    onClick={nextStep}
                    disabled={
                      formData.destinations.length === 0 || !formData.duration
                    }
                    className="bg-[#45919c] hover:bg-[#ff9800] text-white rounded-full text-xs px-6"
                  >
                    Continue
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 2: Date & Budget */}
            {step === 2 && (
              <div className="space-y-4 animate-[fadeIn_0.2s_ease-out]">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold">
                      Estimated Travel Date
                    </label>
                    <input
                      type="date"
                      name="travelDate"
                      value={formData.travelDate}
                      onChange={handleInputChange}
                      required
                      className="w-full text-xs p-2 rounded-lg border border-border bg-background"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold">
                      Budget Level
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      required
                      className="w-full text-xs p-2 rounded-lg border border-border bg-background"
                    >
                      <option value="">Select budget range</option>
                      <option value="Standard">
                        Standard (Comfortable & Clean)
                      </option>
                      <option value="Premium">
                        Premium (Standard Hotels & Tours)
                      </option>
                      <option value="Luxury">
                        Luxury (Bespoke Heritage & Retreats)
                      </option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold">
                    Additional Details / Notes (Optional)
                  </label>
                  <textarea
                    name="details"
                    rows={3}
                    placeholder="Tell us more about your ideas, places you want to visit, or any special requests..."
                    value={formData.details}
                    onChange={handleInputChange}
                    className="w-full text-xs p-2 rounded-lg border border-border bg-background"
                  />
                </div>

                <div className="flex justify-between pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    className="rounded-full text-xs px-6"
                  >
                    Back
                  </Button>
                  <Button
                    type="button"
                    onClick={nextStep}
                    disabled={!formData.travelDate || !formData.budget}
                    className="bg-[#45919c] hover:bg-[#ff9800] text-white rounded-full text-xs px-6"
                  >
                    Continue
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 3: Contact details & Submit */}
            {step === 3 && (
              <div className="space-y-4 animate-[fadeIn_0.2s_ease-out]">
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full text-xs p-2 rounded-lg border border-border bg-background"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="johndoe@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full text-xs p-2 rounded-lg border border-border bg-background"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold">
                      Phone / WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+1 (555) 019-9000"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full text-xs p-2 rounded-lg border border-border bg-background"
                    />
                  </div>
                </div>

                <div className="flex justify-between pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    className="rounded-full text-xs px-6"
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="bg-[#45919c] hover:bg-[#ff9800] text-white rounded-full text-xs px-6"
                  >
                    {loading ? "Submitting..." : "Submit Proposal Request"}
                  </Button>
                </div>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
