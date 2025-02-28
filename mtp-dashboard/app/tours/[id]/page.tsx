"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, MapPin, Calendar, DollarSign, Users, Mountain } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// Mock data for demonstration purposes
const tourData = {
  id: 1,
  title: "Paris Adventure",
  description: "Experience the magic of Paris with our comprehensive tour package.",
  location: "Paris, France",
  price: 1200,
  duration: 7,
  category: "Cultural Tour",
  images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
  itineraries: [
    {
      day: 1,
      title: "Arrival",
      description: "Arrive in Paris and check-in to your hotel.",
      accommodation: "Hotel de Paris",
      meals: "Dinner",
      time: "2 hours",
      distance: 10,
      ascent: 0,
      descent: 0,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      day: 2,
      title: "City Tour",
      description: "Explore the main attractions of Paris.",
      accommodation: "Hotel de Paris",
      meals: "Breakfast, Lunch",
      time: "8 hours",
      distance: 15,
      ascent: 50,
      descent: 50,
      image: "/placeholder.svg?height=200&width=300",
    },
  ],
  mapIframe:
    "<iframe src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d83998.94722687619!2d2.277019841665155!3d48.8588377391234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e1f06e2b70f%3A0x40b82c3688c9460!2sParis%2C%20France!5e0!3m2!1sen!2sus!4v1623164983123!5m2!1sen!2sus' width='600' height='450' style='border:0;' allowfullscreen='' loading='lazy'></iframe>",
  faqs: [
    {
      question: "What's the best time to visit Paris?",
      answer: "Spring (April to mid-June) or Fall (September to November) are ideal.",
    },
    {
      question: "Is the tour suitable for children?",
      answer: "Yes, the tour is family-friendly and suitable for all ages.",
    },
  ],
  termsAndConditions: "<p>Standard terms and conditions apply. Please read carefully before booking.</p>",
  maxGroupSize: 20,
  difficultyLevel: "Easy",
  startDates: ["2023-07-01", "2023-07-15", "2023-08-01"],
  includedServices: ["Hotel accommodation", "Breakfast", "Guided tours"],
  excludedServices: ["Flights", "Travel insurance", "Personal expenses"],
  requiredEquipment: ["Comfortable walking shoes", "Camera", "Weather-appropriate clothing"],
  meetingPoint: "Charles de Gaulle Airport",
  endPoint: "Paris city center",
  status: "published",
  seasonalPricing: [
    { startDate: "2023-07-01", endDate: "2023-08-31", price: 1500 },
    { startDate: "2023-09-01", endDate: "2023-10-31", price: 1300 },
  ],
  relatedTours: ["2", "3", "4"],
  keywords: ["Paris", "Eiffel Tower", "Louvre", "Seine River", "Cultural"],
}

export default function SingleTourPage() {
  const router = useRouter()
  const { id } = useParams()
  const [tour, setTour] = useState(tourData)

  useEffect(() => {
    // In a real application, you would fetch the tour data based on the ID
    // For now, we're using the mock data
    setTour(tourData)
  }, [])

  return (
    <div className="container mx-auto p-6">
      <Button variant="ghost" onClick={() => router.back()} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Tours
      </Button>

      <h1 className="mb-6 text-3xl font-bold">{tour.title}</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <img src={tour.images[0] || "/placeholder.svg"} alt={tour.title} className="rounded-lg" />
          <div className="mt-4 grid grid-cols-4 gap-4">
            {tour.images.map((image, index) => (
              <img
                key={index}
                src={image || "/placeholder.svg"}
                alt={`${tour.title} ${index + 1}`}
                className="rounded-lg"
              />
            ))}
          </div>
        </div>

        <div>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <span>{tour.location}</span>
              </div>
              <div className="flex items-center space-x-4 mb-4">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <span>{tour.duration} days</span>
              </div>
              <div className="flex items-center space-x-4 mb-4">
                <DollarSign className="h-5 w-5 text-muted-foreground" />
                <span>${tour.price} per person</span>
              </div>
              <div className="flex items-center space-x-4 mb-4">
                <Users className="h-5 w-5 text-muted-foreground" />
                <span>Max group size: {tour.maxGroupSize}</span>
              </div>
              <div className="flex items-center space-x-4 mb-4">
                <Mountain className="h-5 w-5 text-muted-foreground" />
                <span>Difficulty: {tour.difficultyLevel}</span>
              </div>
              <p className="text-muted-foreground">{tour.description}</p>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Tour Category</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{tour.category}</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Accordion type="single" collapsible className="w-full mt-8">
        <AccordionItem value="itinerary">
          <AccordionTrigger>Itinerary</AccordionTrigger>
          <AccordionContent>
            {tour.itineraries.map((day, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-lg font-semibold">
                  Day {day.day}: {day.title}
                </h3>
                <p className="text-muted-foreground">{day.description}</p>
                <p>Accommodation: {day.accommodation}</p>
                <p>Meals: {day.meals}</p>
                <p>Time: {day.time}</p>
                <p>Distance: {day.distance} km</p>
                <p>Ascent: {day.ascent} m</p>
                <p>Descent: {day.descent} m</p>
                {day.image && (
                  <img src={day.image || "/placeholder.svg"} alt={`Day ${day.day}`} className="mt-2 rounded-lg" />
                )}
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="map">
          <AccordionTrigger>Map</AccordionTrigger>
          <AccordionContent>
            <div dangerouslySetInnerHTML={{ __html: tour.mapIframe }} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="includedServices">
          <AccordionTrigger>Included Services</AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc pl-5">
              {tour.includedServices.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="excludedServices">
          <AccordionTrigger>Excluded Services</AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc pl-5">
              {tour.excludedServices.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="requiredEquipment">
          <AccordionTrigger>Required Equipment</AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc pl-5">
              {tour.requiredEquipment.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="faqs">
          <AccordionTrigger>Frequently Asked Questions</AccordionTrigger>
          <AccordionContent>
            {tour.faqs.map((faq, index) => (
              <div key={index} className="mb-4">
                <h4 className="font-semibold">{faq.question}</h4>
                <p>{faq.answer}</p>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="termsAndConditions">
          <AccordionTrigger>Terms and Conditions</AccordionTrigger>
          <AccordionContent>
            <div dangerouslySetInnerHTML={{ __html: tour.termsAndConditions }} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="seasonalPricing">
          <AccordionTrigger>Seasonal Pricing</AccordionTrigger>
          <AccordionContent>
            {tour.seasonalPricing.map((pricing, index) => (
              <div key={index} className="mb-2">
                <p>
                  {pricing.startDate} to {pricing.endDate}: ${pricing.price}
                </p>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Additional Information</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Meeting Point: {tour.meetingPoint}</p>
          <p>End Point: {tour.endPoint}</p>
          <p>Start Dates: {tour.startDates.join(", ")}</p>
          <p>Status: {tour.status}</p>
          <p>Related Tours: {tour.relatedTours.join(", ")}</p>
          <p>Keywords: {tour.keywords.join(", ")}</p>
        </CardContent>
      </Card>
    </div>
  )
}

