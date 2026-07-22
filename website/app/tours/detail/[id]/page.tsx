"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Users,
  Mountain,
  DollarSign,
  MapPin,
  Clock,
  Sun,
  Compass,
  Briefcase,
  Utensils,
  Home,
  X,
  FileText,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Download,
  Mail,
  Map,
  Share2,
  Award,
  ClipboardCheck,
  MessageSquare,
  AlertCircle,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import Animation from "@/components/animations/animations";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { siteConfig } from "@/data/siteConfig";
import { generateTourPDF } from "@/lib/pdfGenerator";
import axios from "axios";
import { BASE_URL } from "@/app/Var";

export default function TourPage() {
  const { id } = useParams();
  const [activeImage, setActiveImage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tour, setTour] = useState<any>();
  const [relatedTours, setRelatedTours] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAnimation, setShowAnimation] = useState(true);
  const [departures, setDepartures] = useState<any[]>([]);
  const [selectedDeparture, setSelectedDeparture] = useState<string>("");

  // Step-by-Step booking states
  const [bookingStep, setBookingStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    pax: 1,
    message: "",
  });
  const [submittingBooking, setSubmittingBooking] = useState(false);

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/tours/${id}`);
        setTour(response.data.data);

        // Fetch all tours for related section
        const allToursRes = await axios.get(`${BASE_URL}/api/tours`);
        const allTours = allToursRes.data.data || [];
        // Filter out current tour and pick 3
        const related = allTours
          .filter((t: any) => t._id !== response.data.data?._id)
          .slice(0, 3);
        setRelatedTours(related);
      } catch (error) {
        console.error("Error fetching tour:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTour();
  }, [id]);

  useEffect(() => {
    const fetchDepartures = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/departures`);
        const allDepartures = res.data.data || [];
        const filtered = allDepartures.filter(
          (dep: any) => dep.tripId?._id === tour?._id,
        );
        setDepartures(filtered);
      } catch (err) {
        console.error("Error fetching departures:", err);
      }
    };
    if (tour?._id) fetchDepartures();
  }, [tour?._id]);

  const handleStepBookingSubmit = async () => {
    if (!selectedDeparture) return;
    const departure = departures.find((d) => d._id === selectedDeparture);
    if (!departure || !tour?._id) return;

    setSubmittingBooking(true);
    try {
      const payload = {
        tripId: tour._id,
        departureId: departure._id,
        firstName: bookingData.firstName,
        lastName: bookingData.lastName,
        email: bookingData.email,
        travelers: bookingData.pax,
        specialRequests: bookingData.message,
      };
      await axios.post(`${BASE_URL}/api/bookings`, payload);
      setIsModalOpen(true);
      // reset form
      setBookingStep(1);
      setBookingData({
        firstName: "",
        lastName: "",
        email: "",
        pax: 1,
        message: "",
      });
    } catch (error) {
      console.error("Error booking tour:", error);
    } finally {
      setSubmittingBooking(false);
    }
  };

  useEffect(() => {
    if (tour?.category) {
      const timer = setTimeout(() => setShowAnimation(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [tour]);

  if (loading)
    return (
      <div className="container mx-auto px-4 py-16 text-center text-sm text-muted-foreground">
        Please wait! loading data......
      </div>
    );

  if (showAnimation && tour?.category) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="w-80 h-80">
          <Animation type={tour.category.toLowerCase()} />
        </div>
      </div>
    );
  }

  if (!tour)
    return <div className="container mx-auto px-4 py-8">Tour not found</div>;

  const handlePrevImage = () => {
    setActiveImage((prev) => (prev === 0 ? tour.images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setActiveImage((prev) => (prev === tour.images.length - 1 ? 0 : prev + 1));
  };

  const handleShareWhatsApp = () => {
    const text = `Check out this amazing tour from ${siteConfig.name}: ${tour.name} - ${tour.days} days of adventure in ${tour.location}. Book now at ${window.location.href}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleShareEmail = () => {
    const subject = `Discover ${tour.name} with ${siteConfig.name}`;
    const body = `Hello, I found this incredible tour and thought you might be interested: ${tour.name} - ${tour.days} days in ${tour.location}. Price: $${tour.price}. Book your adventure now at ${window.location.href}`;
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(gmailUrl, "_blank");
  };

  const handleDownloadPDF = async () => {
    try {
      setLoading(true);
      const doc = await generateTourPDF(tour);
      doc.save(`${tour.name || "tour"}.pdf`);
    } catch (err) {
      console.error("Error generating PDF:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Header Slider */}
      <div className="relative h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px] w-full bg-black overflow-hidden shadow-xl">
        <Image
          src={
            tour.images && tour.images.length > 0
              ? tour.images[activeImage].startsWith("http")
                ? tour.images[activeImage]
                : `${BASE_URL}${tour.images[activeImage]}`
              : "https://images.unsplash.com/photo-1469521669194-babb45599def?w=1000&q=80"
          }
          alt={tour.name}
          fill
          unoptimized
          className="object-cover opacity-85 transition-all duration-750"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

        {/* Navigation Overlays */}
        <button
          onClick={handlePrevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/35 hover:bg-black/60 p-2.5 rounded-full text-white transition-all backdrop-blur-sm"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={handleNextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/35 hover:bg-black/60 p-2.5 rounded-full text-white transition-all backdrop-blur-sm"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Thumbnail indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {tour.images?.map((_: any, idx: number) => (
            <button
              key={idx}
              onClick={() => setActiveImage(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${idx === activeImage ? "bg-[#45919c] scale-125" : "bg-white/50"}`}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl mt-10">
        {/* Breadcrumb Info */}
        <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4">
          <Link href="/" className="hover:text-primary flex items-center gap-1">
            <Home className="w-3 h-3" /> Home
          </Link>
          <ChevronRight className="w-2.5 h-2.5" />
          <Link href="/tours" className="hover:text-primary">
            Tours
          </Link>
          <ChevronRight className="w-2.5 h-2.5" />
          <span className="text-foreground font-semibold truncate">
            {tour.name}
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header info */}
            <div className="bg-card border rounded-2xl p-6 sm:p-8 shadow-sm space-y-5">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground leading-tight">
                  {tour.name}
                </h1>
                <div className="flex gap-1.5 flex-wrap shrink-0">
                  <Button
                    onClick={handleShareWhatsApp}
                    size="sm"
                    variant="outline"
                    className="text-xs hover:bg-green-50"
                  >
                    <Share2 className="w-3.5 h-3.5 mr-1 text-green-600" />{" "}
                    WhatsApp
                  </Button>
                  <Button
                    onClick={handleShareEmail}
                    size="sm"
                    variant="outline"
                    className="text-xs hover:bg-blue-50"
                  >
                    <Mail className="w-3.5 h-3.5 mr-1 text-blue-600" /> Email
                  </Button>
                  <Button
                    onClick={handleDownloadPDF}
                    size="sm"
                    variant="outline"
                    className="text-xs hover:bg-red-50"
                  >
                    <Download className="w-3.5 h-3.5 mr-1 text-red-600" /> PDF
                  </Button>
                </div>
              </div>

              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary mr-1.5 shrink-0" />
                <span>{tour.location}</span>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                <Badge
                  variant="outline"
                  className="text-xs py-1 px-3 bg-muted/40"
                >
                  <Calendar className="w-3.5 h-3.5 mr-1.5 text-primary" />{" "}
                  {tour.days} Days
                </Badge>
                <Badge
                  variant="outline"
                  className="text-xs py-1 px-3 bg-muted/40"
                >
                  <Users className="w-3.5 h-3.5 mr-1.5 text-primary" />{" "}
                  {tour.groupSize || "2-12 People"}
                </Badge>
                <Badge
                  variant="outline"
                  className="text-xs py-1 px-3 bg-muted/40"
                >
                  <Mountain className="w-3.5 h-3.5 mr-1.5 text-primary" />{" "}
                  {tour.difficulty || "Moderate"}
                </Badge>
              </div>

              <div className="text-2xl font-black text-primary border-t pt-4 flex items-baseline gap-1">
                <span className="text-xs text-muted-foreground font-normal">
                  From
                </span>
                <DollarSign className="w-6 h-6 self-center -mr-1" />
                {tour.price}
                <span className="text-xs text-muted-foreground font-normal ml-1">
                  / person
                </span>
              </div>
            </div>

            {/* Overviews / Descriptions */}
            <div className="bg-card border rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
              <div>
                <h2 className="text-lg font-bold text-[#45919c] mb-2">
                  About This Journey
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {tour.shortDescription}
                </p>
              </div>
              {tour.overview && (
                <div className="border-t pt-4">
                  <h3 className="text-sm font-semibold text-[#2596be] mb-1.5">
                    Overview
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {tour.overview}
                  </p>
                </div>
              )}
              {tour.highlights?.length > 0 && (
                <div className="border-t pt-4">
                  <h3 className="text-sm font-semibold text-foreground mb-3">
                    Highlights
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {tour.highlights.map((h: string, i: number) => (
                      <div
                        key={i}
                        className="flex gap-2 p-2 bg-muted/20 border rounded-lg text-xs"
                      >
                        <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Detail Tabs */}
            <div className="bg-card border rounded-2xl p-6 shadow-sm">
              <Tabs defaultValue="itinerary" className="w-full">
                <TabsList className="grid grid-cols-5 gap-1.5 p-1 bg-muted rounded-xl mb-6">
                  <TabsTrigger
                    value="itinerary"
                    className="text-xs capitalize py-2"
                  >
                    Itinerary
                  </TabsTrigger>
                  <TabsTrigger
                    value="inclusions"
                    className="text-xs capitalize py-2"
                  >
                    Inclusions
                  </TabsTrigger>
                  <TabsTrigger value="faqs" className="text-xs capitalize py-2">
                    FAQs
                  </TabsTrigger>
                  <TabsTrigger
                    value="terms"
                    className="text-xs capitalize py-2"
                  >
                    Terms
                  </TabsTrigger>
                  <TabsTrigger value="map" className="text-xs capitalize py-2">
                    Map
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="itinerary" className="space-y-4">
                  <Accordion type="single" collapsible className="space-y-2">
                    {tour.itineraries?.map((day: any, idx: number) => (
                      <AccordionItem
                        key={idx}
                        value={`day-${idx}`}
                        className="border rounded-xl px-4 py-1"
                      >
                        <AccordionTrigger className="text-sm font-semibold hover:no-underline">
                          Day {day.day}: {day.title}
                        </AccordionTrigger>
                        <AccordionContent className="pt-2 pb-4 text-xs text-muted-foreground leading-relaxed space-y-4">
                          <p>{day.description}</p>
                          <div className="flex flex-wrap gap-4 text-[11px] text-foreground bg-muted/40 p-3 rounded-lg">
                            <span className="flex items-center gap-1.5">
                              <Home className="w-3.5 h-3.5 text-primary" />{" "}
                              {day.accommodation || "Camping"}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Utensils className="w-3.5 h-3.5 text-primary" />{" "}
                              {day.meals?.join(", ") || "Breakfast"}
                            </span>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </TabsContent>

                <TabsContent
                  value="inclusions"
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  <div className="space-y-3">
                    <h4 className="font-bold text-sm text-foreground">
                      What's Included
                    </h4>
                    <ul className="space-y-2">
                      {tour.inclusions?.map((item: string, i: number) => (
                        <li
                          key={i}
                          className="flex items-start text-xs text-muted-foreground"
                        >
                          <Briefcase className="w-4 h-4 text-primary mr-2 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-bold text-sm text-foreground">
                      What's Excluded
                    </h4>
                    <ul className="space-y-2">
                      {tour.exclusions?.map((item: string, i: number) => (
                        <li
                          key={i}
                          className="flex items-start text-xs text-muted-foreground"
                        >
                          <X className="w-4 h-4 text-red-500 mr-2 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>

                <TabsContent value="faqs">
                  <Accordion type="single" collapsible className="space-y-2">
                    {tour.faqs?.map((faq: any, i: number) => (
                      <AccordionItem
                        key={i}
                        value={`faq-${i}`}
                        className="border rounded-xl px-4"
                      >
                        <AccordionTrigger className="text-xs font-semibold">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-xs text-muted-foreground leading-relaxed pt-1 pb-3">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </TabsContent>

                <TabsContent
                  value="terms"
                  className="space-y-6 text-xs text-muted-foreground leading-relaxed"
                >
                  {tour.termsAndConditions?.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-bold text-foreground">
                        Terms and Conditions
                      </h4>
                      <ul className="list-disc pl-4 space-y-1">
                        {tour.termsAndConditions.map(
                          (item: string, i: number) => (
                            <li key={i}>{item}</li>
                          ),
                        )}
                      </ul>
                    </div>
                  )}
                  {tour.policies?.length > 0 && (
                    <div className="space-y-2 border-t pt-4">
                      <h4 className="font-bold text-foreground">
                        Expedition Policies
                      </h4>
                      <ul className="list-disc pl-4 space-y-1">
                        {tour.policies.map((item: string, i: number) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="map">
                  {tour.map?.latitude && tour.map?.longitude ? (
                    <div className="aspect-video rounded-xl overflow-hidden border">
                      <iframe
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        scrolling="no"
                        src={`https://www.openstreetmap.org/export/embed.html?bbox=${tour.map.longitude - 0.1}%2C${tour.map.latitude - 0.1}%2C${tour.map.longitude + 0.1}%2C${tour.map.latitude + 0.1}&amp;layer=mapnik&amp;marker=${tour.map.latitude}%2C${tour.map.longitude}`}
                      />
                    </div>
                  ) : (
                    <div className="aspect-video bg-muted/30 border rounded-xl flex items-center justify-center text-xs text-muted-foreground p-6 text-center">
                      <div>
                        <MapPin className="w-8 h-8 mx-auto mb-2 opacity-35 text-primary" />
                        <p className="font-bold mb-1">Route Map Unavailable</p>
                        <p>
                          No map coordinates loaded for this route. Contact
                          ground support.
                        </p>
                      </div>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Step-by-Step booking widget in sidebar */}
          <div className="lg:sticky lg:top-6 lg:self-start">
            <div className="bg-card border rounded-2xl p-6 shadow-sm space-y-6">
              {/* Headings */}
              <div>
                <h2 className="text-lg font-extrabold text-foreground">
                  Book Your Trip
                </h2>
                <p className="text-xs text-muted-foreground">
                  Complete the form below to secure your spaces
                </p>
              </div>

              {/* Progress Steps Indicators */}
              <div className="flex items-center justify-between border-b pb-4 text-xs font-semibold">
                <span
                  className={`flex items-center gap-1 ${bookingStep >= 1 ? "text-primary" : "text-muted-foreground"}`}
                >
                  <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-[10px]">
                    1
                  </span>{" "}
                  Date
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
                <span
                  className={`flex items-center gap-1 ${bookingStep >= 2 ? "text-primary" : "text-muted-foreground"}`}
                >
                  <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-[10px]">
                    2
                  </span>{" "}
                  Travelers
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
                <span
                  className={`flex items-center gap-1 ${bookingStep === 3 ? "text-primary" : "text-muted-foreground"}`}
                >
                  <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-[10px]">
                    3
                  </span>{" "}
                  Confirm
                </span>
              </div>

              {/* Dynamic steps content */}
              <div className="space-y-4 min-h-[220px]">
                {/* Step 1: Select Date */}
                {bookingStep === 1 && (
                  <div className="space-y-4">
                    <Label className="text-xs font-bold text-foreground">
                      Select Departure Date
                    </Label>
                    <Select
                      value={selectedDeparture}
                      onValueChange={(val) => setSelectedDeparture(val)}
                    >
                      <SelectTrigger className="w-full text-xs">
                        <SelectValue placeholder="Select available departure" />
                      </SelectTrigger>
                      <SelectContent>
                        {departures.length > 0 ? (
                          departures.map((dep) => (
                            <SelectItem
                              key={dep._id}
                              value={dep._id}
                              className="text-xs"
                            >
                              {new Date(dep.date).toLocaleDateString()} – $
                              {dep.price} ({dep.status})
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value="none" disabled className="text-xs">
                            No dates listed
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                    {departures.length > 0 && (
                      <p className="text-[10px] text-muted-foreground">
                        Select one of our vetted group departures to continue.
                      </p>
                    )}
                    <Button
                      disabled={!selectedDeparture}
                      onClick={() => setBookingStep(2)}
                      className="w-full text-xs font-semibold mt-4 bg-primary text-white"
                    >
                      Next Step <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </div>
                )}

                {/* Step 2: Contact Details & Pax */}
                {bookingStep === 2 && (
                  <div className="space-y-3.5">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label
                          htmlFor="firstName"
                          className="text-[11px] font-semibold"
                        >
                          First Name
                        </Label>
                        <Input
                          id="firstName"
                          value={bookingData.firstName}
                          onChange={(e) =>
                            setBookingData({
                              ...bookingData,
                              firstName: e.target.value,
                            })
                          }
                          placeholder="John"
                          className="text-xs"
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor="lastName"
                          className="text-[11px] font-semibold"
                        >
                          Last Name
                        </Label>
                        <Input
                          id="lastName"
                          value={bookingData.lastName}
                          onChange={(e) =>
                            setBookingData({
                              ...bookingData,
                              lastName: e.target.value,
                            })
                          }
                          placeholder="Doe"
                          className="text-xs"
                        />
                      </div>
                    </div>
                    <div>
                      <Label
                        htmlFor="email"
                        className="text-[11px] font-semibold"
                      >
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={bookingData.email}
                        onChange={(e) =>
                          setBookingData({
                            ...bookingData,
                            email: e.target.value,
                          })
                        }
                        placeholder="john@example.com"
                        className="text-xs"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="pax"
                        className="text-[11px] font-semibold"
                      >
                        Number of Travelers
                      </Label>
                      <Input
                        id="pax"
                        type="number"
                        min={1}
                        value={bookingData.pax}
                        onChange={(e) =>
                          setBookingData({
                            ...bookingData,
                            pax: parseInt(e.target.value) || 1,
                          })
                        }
                        className="text-xs"
                      />
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button
                        variant="outline"
                        className="w-1/2 text-xs"
                        onClick={() => setBookingStep(1)}
                      >
                        Back
                      </Button>
                      <Button
                        disabled={
                          !bookingData.firstName ||
                          !bookingData.lastName ||
                          !bookingData.email
                        }
                        onClick={() => setBookingStep(3)}
                        className="w-1/2 text-xs"
                      >
                        Next Step
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 3: Confirmation Summary */}
                {bookingStep === 3 && (
                  <div className="space-y-4">
                    <div className="bg-muted/40 p-4 rounded-xl space-y-2.5 text-xs text-muted-foreground border">
                      <h4 className="font-bold text-foreground text-center border-b pb-1.5 mb-2 flex items-center justify-center gap-1.5">
                        <ClipboardCheck className="w-4 h-4 text-primary" />{" "}
                        Booking Summary
                      </h4>
                      <p className="flex justify-between">
                        <span>Departure Date:</span>{" "}
                        <strong className="text-foreground">
                          {new Date(
                            departures.find((d) => d._id === selectedDeparture)
                              ?.date,
                          ).toLocaleDateString()}
                        </strong>
                      </p>
                      <p className="flex justify-between">
                        <span>Traveler Name:</span>{" "}
                        <strong className="text-foreground">
                          {bookingData.firstName} {bookingData.lastName}
                        </strong>
                      </p>
                      <p className="flex justify-between">
                        <span>Total Travelers:</span>{" "}
                        <strong className="text-foreground">
                          {bookingData.pax}
                        </strong>
                      </p>
                      <p className="flex justify-between border-t pt-2 mt-2 font-bold text-foreground text-sm">
                        <span>Total Price:</span>
                        <span className="text-[#45919c]">
                          $
                          {(
                            (departures.find((d) => d._id === selectedDeparture)
                              ?.price || 0) * bookingData.pax
                          ).toLocaleString()}
                        </span>
                      </p>
                    </div>
                    <div>
                      <Label
                        htmlFor="message"
                        className="text-[11px] font-semibold"
                      >
                        Special Requests (Optional)
                      </Label>
                      <Textarea
                        id="message"
                        value={bookingData.message}
                        onChange={(e) =>
                          setBookingData({
                            ...bookingData,
                            message: e.target.value,
                          })
                        }
                        placeholder="Dietary requests, medical conditions, etc."
                        className="text-xs"
                      />
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button
                        variant="outline"
                        className="w-1/2 text-xs"
                        onClick={() => setBookingStep(2)}
                      >
                        Back
                      </Button>
                      <Button
                        disabled={submittingBooking}
                        onClick={handleStepBookingSubmit}
                        className="w-1/2 text-xs font-bold bg-[#45919c] text-white"
                      >
                        {submittingBooking ? "Booking..." : "Confirm & Book"}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Tours Section */}
      {relatedTours.length > 0 && (
        <div className="container mx-auto px-4 max-w-7xl pb-24">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">
            Related Tours
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedTours.map((t: any) => (
              <Link
                key={t._id}
                href={`/tours/detail/${t.id || t._id}`}
                className="group block"
              >
                <div className="bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="aspect-[4/3] relative">
                    <Image
                      src={
                        t.coverImage?.startsWith("http")
                          ? t.coverImage
                          : `${BASE_URL}${t.coverImage}`
                      }
                      alt={t.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5 space-y-2">
                    <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                      {t.name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{t.destination}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Confirmation Dialog with animated elements */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-md bg-card p-6 rounded-2xl text-center space-y-4 border border-green-100 shadow-2xl">
          <DialogHeader>
            <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-2 text-emerald-600 border border-emerald-100">
              <Award className="w-8 h-8 animate-bounce text-emerald-600" />
            </div>
            <DialogTitle className="text-2xl font-black text-emerald-800">
              Booking Confirmed!
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground pt-1.5 leading-relaxed">
              We have received your reservation for{" "}
              <strong className="text-foreground">{tour.name}</strong>. A
              confirmation email has been dispatched. Our local specialists will
              contact you within 24 hours to organize the onboarding logistics.
            </DialogDescription>
          </DialogHeader>
          <div className="pt-2">
            <Button
              onClick={() => setIsModalOpen(false)}
              className="w-full text-xs font-bold rounded-full py-3"
            >
              Done
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
