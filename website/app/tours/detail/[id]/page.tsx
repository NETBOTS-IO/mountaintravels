"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
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
  Info,
  FileText,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Download,
  Mail,
  Map,
  Share2,
} from "lucide-react"
import Animation from "../../../../components/animations/animations"; // import child component

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { tourPackages } from "@/data/tourPackages"
import { siteConfig } from "@/data/siteConfig"
import  {generateTourPDF}  from "@/lib/pdfGenerator"
import axios from "axios"
import { BASE_URL } from "@/app/Var"
export default function TourPage() {
  const { id } = useParams()
  const [activeImage, setActiveImage] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [tour, setTour] = useState()
  const [loading, setLoading] = useState(true)
  const [showAnimation, setShowAnimation] = useState(true); // NEW
  const [departures, setDepartures] = useState<any[]>([]);
  const [selectedDeparture, setSelectedDeparture] = useState<string>("");
  useEffect(() => {
    const fetchTour = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/tours/${id}`)
        setTour(response.data.data)
      } catch (error) {
        console.error("Error fetching tour:", error)
      } finally {
        setLoading(false)
      }
    }
  
    fetchTour()
  }, [id])
  useEffect(() => {
    const fetchDepartures = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/departures`);
        const allDepartures = res.data.data || [];
  
        // ✅ filter departures by current tour._id
        const filtered = allDepartures.filter(
          (dep: any) => dep.tripId?._id === tour?._id
        );
  
        setDepartures(filtered);
      } catch (err) {
        console.error("Error fetching departures:", err);
      }
    };
  
    if (tour?._id) fetchDepartures();
  }, [tour?._id]);
  
  
  // update handleBooking
  const handleBooking = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const form = e.currentTarget as HTMLFormElement;
  
    // Extract values safely
    const fullName = (form.elements.namedItem("name") as HTMLInputElement)?.value?.trim() || "";
    const email = (form.elements.namedItem("email") as HTMLInputElement)?.value?.trim() || "";
    const pax = Number((form.elements.namedItem("pax") as HTMLInputElement)?.value || 1);
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement)?.value || "";
  
    // Split full name → first + last
    const [firstName, ...rest] = fullName.split(" ");
    const lastName = rest.length > 0 ? rest.join(" ") : "Unknown";
  
    // Find selected departure
    const departure = departures.find((d) => d._id === selectedDeparture);
    if (!departure) {
      console.error("❌ No departure selected");
      return;
    }
  
    // ✅ Use tourId from page props/state as tripId for backend
    const tripId = tour?._id; 
    if (!tripId) {
      console.error("❌ No tour ID found");
      return;
    }
  
    try {
      const payload = {
        tripId,                    // 👈 mapped from tour._id
        departureId: departure._id,
        firstName,
        lastName,
        email,
        travelers: pax,
        specialRequests: message,
      };
  
      const response = await axios.post(`${BASE_URL}/api/bookings`, payload);
  
      console.log("✅ Booking successful:", response.data);
      setIsModalOpen(true);
    } catch (error: any) {
      console.error("❌ Error booking tour:", error.response?.data || error.message);
    }
  };
  


  
  // ⏱️ Hide animation after 2 seconds
  useEffect(() => {
    if (tour?.category) {
      const timer = setTimeout(() => setShowAnimation(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [tour])
  
  if (loading) {
    // return (
    //   <div className="flex items-center justify-center h-screen">
    //     Loading...
    //   </div>
    // )
  }
  
  // ✅ Show animation before tour details
  if (showAnimation && tour?.category) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="w-80 h-80"> {/* ✅ adjust size here */}
          <Animation type={tour.category.toLowerCase()} />
        </div>
      </div>
    )
  }

  if (loading) return <div className="container mx-auto px-4 py-8">Please wait! loading data......</div>

  if (!tour) {
    return <div className="container mx-auto px-4 py-8">Tour not found</div>
  }

  const handlePrevImage = () => {
    setActiveImage((prev) => (prev === 0 ? tour.images.length - 1 : prev - 1))
  }

  const handleNextImage = () => {
    setActiveImage((prev) => (prev === tour.images.length - 1 ? 0 : prev + 1))
  }

  // const handleBooking = async (e) => {
  //   e.preventDefault();
  
  //   try {
  //     const response = await axios.post(`${BASE_URL}/api/entry/create`, {
  //       source: "BOOKING FORM",
  //       name: e.target.name.value,
  //       email: e.target.email.value,
  //       participants: e.target.pax.value,
  //       tourPackage: tour.name,
  //       message: e.target.message.value,
  //     });
  
  //     console.log("Booking successful:", response);
  //     setIsModalOpen(true);
  //   } catch (error) {
  //     console.error("Error booking tour:", error);
  //   }
  // };
  

  const handleShareWhatsApp = () => {
    const text = `Check out this amazing tour from ${siteConfig.name}: ${tour.name} - ${tour.days} days of adventure in ${tour.location}. Book now at ${window.location.href}`
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`
    window.open(whatsappUrl, "_blank")
  }

  const handleShareEmail = () => {
    const subject = `Discover ${tour.name} with ${siteConfig.name}`;
    const body = `Hello,
  
  I found this incredible tour and thought you might be interested:
  
  ${tour.name}
  ${tour.days} days in ${tour.location}
  Price: $${tour.price}
  
  Highlights:
  ${tour.shortDescription}
  
  Book your adventure now at ${window.location.href}
  
  Best regards,
  ${siteConfig.name} Team`;
  
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&su=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  
    window.open(gmailUrl, "_blank"); // opens Gmail compose in new tab
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

  // Dummy dates for booking
  const dummyDates = ["2025-06-15", "2025-07-01", "2025-07-15", "2025-08-01", "2025-08-15"]

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Hero Section */}
      <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] mb-12 rounded-xl overflow-hidden shadow-2xl">
  <Image
    src={`${BASE_URL}${tour.images[activeImage]}` || "/placeholder.svg"}
    alt={tour.name}
    fill
    className="object-contain bg-black"
  />
  <div className="absolute inset-0 flex items-end justify-center pb-8">
    {/* <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center px-4 drop-shadow-lg">
      {tour.name}
    </h1> */}
  </div>

  {/* Prev Button */}
  <button
    onClick={handlePrevImage}
    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg transition-all hover:bg-white"
    aria-label="Previous image"
  >
    <ChevronLeft className="h-6 w-6 text-gray-800" />
  </button>

  {/* Next Button */}
  <button
    onClick={handleNextImage}
    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg transition-all hover:bg-white"
    aria-label="Next image"
  >
    <ChevronRight className="h-6 w-6 text-gray-800" />
  </button>
</div>



      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        <div className="lg:col-span-2 space-y-8">
          {/* Tour Info Section */}
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">{tour.name}</h2>
              <div className="flex flex-wrap gap-2">
                <Button
                  onClick={handleShareWhatsApp}
                  size="sm"
                  variant="outline"
                  className="border-2 hover:bg-green-500 hover:text-white transition-colors"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  WhatsApp
                </Button>
                <Button
                  onClick={handleShareEmail}
                  size="sm"
                  variant="outline"
                  className="border-2 hover:bg-blue-500 hover:text-white transition-colors"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </Button>
                <Button
                  onClick={handleDownloadPDF}
                  size="sm"
                  variant="outline"
                  className="border-2 hover:bg-red-500 hover:text-white transition-colors"
                >
                  <Download className="h-4 w-4 mr-2" />
                  PDF
                </Button>
              </div>
        
            </div>
            <div className="flex items-center mb-4 text-lg">
              <MapPin className="w-6 h-6 text-primary mr-2" />
              <span>{tour.location}</span>
            </div>
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <Badge variant="outline" className="flex items-center text-base py-1 px-3">
                <Calendar className="w-5 h-5 mr-2" />
                {tour.days} Days
              </Badge>
              <Badge variant="outline" className="flex items-center text-base py-1 px-3">
                <Users className="w-5 h-5 mr-2" />
                {tour.groupSize}
              </Badge>
              <Badge variant="outline" className="flex items-center text-base py-1 px-3">
                <Mountain className="w-5 h-5 mr-2" />
                {tour.difficulty}
              </Badge>
              
            </div>
            <div className="text-3xl sm:text-4xl font-bold text-primary mb-6">
              <DollarSign className="inline w-8 h-8 mr-1" />
              {tour.price}
            </div>
            
            {/* About Tour */}
            <div className="mb-6">
  <h2 className="text-xl font-bold text-green-600 mb-2">About Tour</h2>
  <p className="text-lg leading-relaxed text-gray-700">{tour.shortDescription}</p>
</div>

{/* Overview */}
{tour.overview && (
  <div className="mb-6">
    <h2 className="text-xl font-bold text-orange-600 mb-2">Features</h2>
    <p className="text-lg leading-relaxed text-gray-700">{tour.overview}</p>
  </div>
)}


            <div className="flex items-center text-lg">
              <Sun className="w-6 h-6 text-primary mr-2" />
              <span>Best Season: {tour.bestTime}</span>
            </div>
          </div>

          {/* Tour Details Section */}
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">Tour Details</h2>
            <Tabs defaultValue="itinerary" className="w-full">
            <div style={{marginBottom: "100px"}}>
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 gap-2 mb-8">
                {["itinerary", "inclusions", "faqs", "terms", "map"].map((tab) => (
                  <TabsTrigger
                    key={tab}
                    value={tab}
                    className="flex items-center justify-center px-3 py-2 text-sm sm:text-base capitalize"
                  >
                    {/* {tab === "overview" && <Info className="w-4 h-4 mr-2" />} */}
                    {tab === "itinerary" && <Calendar className="w-4 h-4 mr-2" />}
                    {tab === "inclusions" && <Briefcase className="w-4 h-4 mr-2" />}
                    {tab === "faqs" && <HelpCircle className="w-4 h-4 mr-2" />}
                    {tab === "terms" && <FileText className="w-4 h-4 mr-2" />}
                    {tab === "map" && <Map  className="w-4 h-4 mr-2" />}

                    {tab}
                  </TabsTrigger>
                ))}
              </TabsList>

              </div>
          

              <div className="mt-6">
                {/* <TabsContent value="overview">
                  <div  >

                    <div>
                      <p className="text-base sm:text-lg mb-4">{tour.shortDescription}</p>
                      <h3 className="text-xl font-bold mb-3">Highlights</h3>
                      <ul className="list-disc pl-5 text-base sm:text-lg space-y-2">
                        <li>Visit iconic landmarks</li>
                        <li>Experience local culture</li>
                        <li>Enjoy breathtaking views</li>
                        <li>Professional guide throughout the tour</li>
                      </ul>
                    </div>
                  </div>
                </TabsContent> */}

<TabsContent key="itinerary" value="itinerary">
  <Accordion type="single" collapsible className="w-full space-y-4">
    {tour.itineraries.map((day, index) => (
      <AccordionItem
        key={index}
        value={`day-${index + 1}`}
        className="border rounded-lg px-4"
      >
        <AccordionTrigger className="text-base sm:text-lg py-4">
          Day {day.day}: {day.title}
        </AccordionTrigger>
        <AccordionContent className="pt-2 pb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-base sm:text-lg mb-4">{day.description}</p>
              <div className="space-y-3 text-sm sm:text-base text-muted-foreground">
                <p className="flex items-center">
                  <Home className="w-5 h-5 mr-2" />
                  <span className="flex-1">
                    Accommodation: {day.accommodation}
                  </span>
                </p>
                <p className="flex items-center">
                  <Utensils className="w-5 h-5 mr-2" />
                  <span className="flex-1">
                    Meals: {day.meals?.join(", ") || "N/A"}
                  </span>
                </p>
              </div>
            </div>

            {day.images?.length > 0 && (
              <div className="relative aspect-video">
                <Image
                  src={
                    day.images[0].startsWith("http")
                      ? day.images[0]
                      : `${BASE_URL || ""}${day.images[0]}`
                  }
                  alt={day.title?.trim() || `Day ${day.day} Image`}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            )}
          </div>
        </AccordionContent>
      </AccordionItem>
    ))}
  </Accordion>

  {/* ✅ Extra Tour Info (styled with colors) */}
  {(tour.physicalRequirements || tour.distance || tour.hours) && (
  <div className="mt-6 p-4 border rounded-lg bg-gray-50 shadow-sm space-y-3">
    {tour.physicalRequirements && (
      <p className="flex items-center font-medium">
        <HelpCircle className="w-5 h-5 mr-2 text-green-600" />
        <span className="text-green-700">Physical Requirements:</span>&nbsp;
        <span className="text-orange-600">{tour.physicalRequirements}</span>
      </p>
    )}

    {tour.distance && (
      <p className="flex items-center font-medium">
        <MapPin className="w-5 h-5 mr-2 text-green-600" />
        <span className="text-green-700">Distance:</span>&nbsp;
        <span className="text-orange-600">{tour.distance}</span>
      </p>
    )}

    {tour.hours && (
      <p className="flex items-center font-medium">
        <Clock className="w-5 h-5 mr-2 text-green-600" />
        <span className="text-green-700">Hours:</span>&nbsp;
        <span className="text-orange-600">{tour.hours}</span>
      </p>
    )}
  </div>
  )}
</TabsContent>






                <TabsContent value="inclusions">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Inclusions</h3>
                      <ul className="space-y-2 text-lg">
                        {tour.inclusions.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <Briefcase className="w-5 h-5 mr-2 mt-1 flex-shrink-0 text-primary" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Exclusions</h3>
                      <ul className="space-y-2 text-lg">
                        {tour.exclusions.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <X className="w-5 h-5 mr-2 mt-1 flex-shrink-0 text-red-500" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="faqs">
                  <Accordion type="single" collapsible className="w-full space-y-4">
                    {tour.faqs.map((faq, index) => (
                      <AccordionItem key={index} value={`faq-${index + 1}`} className="border rounded-lg px-4">
                        <AccordionTrigger className="text-base sm:text-lg py-4">{faq.question}</AccordionTrigger>
                        <AccordionContent className="pt-2 pb-4 text-base">{faq.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </TabsContent>

                <TabsContent value="terms">
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Terms and Conditions</h3>
                      <ul className="list-disc pl-5 text-lg space-y-2">
                        {tour.termsAndConditions.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Policies</h3>
                      <ul className="list-disc pl-5 text-lg space-y-2">
                        {tour.policies.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="map">
                  <div className="space-y-8">
                           {/* Map Section */}
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 flex items-center">
              <MapPin className="w-6 h-6 sm:w-8 sm:h-8 mr-2 text-primary" />
              Tour Map
            </h2>
            <div className="aspect-video rounded-lg overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                marginHeight="0"
                marginWidth="0"
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${tour.map.longitude - 0.1}%2C${tour.map.latitude - 0.1}%2C${tour.map.longitude + 0.1}%2C${tour.map.latitude + 0.1}&amp;layer=mapnik&amp;marker=${tour.map.latitude}%2C${tour.map.longitude}`}
              ></iframe>
            </div>
            <p className="mt-4 text-center text-sm text-gray-500">
              <a
                href={`https://www.openstreetmap.org/?mlat=${tour.map.latitude}&amp;mlon=${tour.map.longitude}#map=12/${tour.map.latitude}/${tour.map.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                View Larger Map
              </a>
            </p>
          </div>
                 
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>

          {/* Map Section
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 flex items-center">
              <MapPin className="w-6 h-6 sm:w-8 sm:h-8 mr-2 text-primary" />
              Tour Map
            </h2>
            <div className="aspect-video rounded-lg overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                marginHeight="0"
                marginWidth="0"
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${tour.map.longitude - 0.1}%2C${tour.map.latitude - 0.1}%2C${tour.map.longitude + 0.1}%2C${tour.map.latitude + 0.1}&amp;layer=mapnik&amp;marker=${tour.map.latitude}%2C${tour.map.longitude}`}
              ></iframe>
            </div>
            <p className="mt-4 text-center text-sm text-gray-500">
              <a
                href={`https://www.openstreetmap.org/?mlat=${tour.map.latitude}&amp;mlon=${tour.map.longitude}#map=12/${tour.map.latitude}/${tour.map.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                View Larger Map
              </a>
            </p>
          </div> */}
        </div>

        {/* Booking Form */}
      <div className="lg:sticky lg:top-4 lg:self-start">

  {/* Departure Information Box */}
{/* Departure Information Box */}
{departures.length > 0 && (
  <div className="mb-6 p-4 border rounded-lg shadow-sm bg-gray-50">
    <h4 className="text-lg font-bold mb-3">Available Departures</h4>
    <ul className="space-y-2">
      {departures.map((dep) => {
        const isAvailable = dep.status === "AVAILABLE";
        return (
          <li
            key={dep._id}
            className={`flex justify-between items-center p-3 rounded-lg border 
              ${isAvailable ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}
          >
            <div>
              <p><strong>Date:</strong> {new Date(dep.date).toLocaleDateString()}</p>
              <p><strong>Price:</strong> ${dep.price}</p>
              <p><strong>Spots Left:</strong> {dep.spotsLeft}</p>
            </div>
            <span
              className={`px-2 py-1 rounded text-sm font-semibold 
                ${isAvailable ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}
            >
              {dep.status}
            </span>
          </li>
        );
      })}
    </ul>
  </div>
)}



  {/* Booking Form */}
  <form onSubmit={handleBooking} className="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
    <h3 className="text-xl sm:text-2xl font-bold mb-6">Book This Tour</h3>
    <div className="space-y-4">
      <div>
        <Label className="text-lg">Select Departure</Label>
        <Select onValueChange={setSelectedDeparture}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Choose a date" />
          </SelectTrigger>
          <SelectContent>
            {departures.length > 0 ? (
              departures.map((dep) => (
                <SelectItem key={dep._id} value={dep._id}>
                  {new Date(dep.date).toLocaleDateString()} – ${dep.price}
                </SelectItem>
              ))
            ) : (
              <SelectItem value="none" disabled>
                No departures available
              </SelectItem>
            )}
          </SelectContent>
        </Select>
      </div>

      {selectedDeparture && (
        <>
          <div>
            <Label htmlFor="name" className="text-lg">Full Name</Label>
            <Input id="name" placeholder="John Doe" required className="text-lg" />
          </div>
          <div>
  <Label htmlFor="lastName" className="text-lg">Last Name</Label>
  <Input id="lastName" placeholder="Doe" required className="text-lg" />
</div>
          <div>
            <Label htmlFor="email" className="text-lg">Email</Label>
            <Input id="email" type="email" placeholder="john@example.com" required className="text-lg" />
          </div>
          <div>
            <Label htmlFor="pax" className="text-lg">Number of Participants</Label>
            <Input id="pax" type="number" min="1" max="20" required className="text-lg" />
          </div>
          <div>
            <Label htmlFor="message" className="text-lg">Message (Optional)</Label>
            <Textarea id="message" placeholder="Any special requests?" className="text-lg" />
          </div>
          <Button type="submit" className="w-full text-lg">Book Now</Button>
        </>
      )}
    </div>
  </form>
</div>

      </div>

      {/* Booking Confirmation Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
  <DialogContent className="bg-green-100 p-6 rounded-xl">
    <DialogHeader>
      <DialogTitle className="text-2xl">Booking Confirmed!</DialogTitle>
      <DialogDescription className="text-lg">
        Thank you for Booking {tour.name}. We will contact you shortly with further details.
      </DialogDescription>
    </DialogHeader>
    <Button onClick={() => setIsModalOpen(false)} className="text-lg mt-4">
      Close
    </Button>
  </DialogContent>
</Dialog>

    </div>
  )
}

