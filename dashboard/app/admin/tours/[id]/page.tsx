"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft } from "lucide-react"
import { getTourById, type Tour } from "@/lib/data-utils"
import { BASE_URL } from "@/Var"
// Remove the separate type import
// import type { Tour } from "@/lib/data-utils";

export default function TourDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const [tour, setTour] = useState<Tour | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      const fetchTour = async () => {
        try {
          setLoading(true)
          const fetchedTour = await getTourById(id as string)
          console.log("fetchedTour", fetchedTour)
          setTour(fetchedTour || null)
        } catch (error) {
          console.error("Error fetching tour:", error)
        } finally {
          setLoading(false)
        }
      }
      fetchTour()
    }
  }, [id])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!tour) {
    return <div>Tour not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="outline" onClick={() => router.back()} className="mb-4">
        <ChevronLeft className="mr-2 h-4 w-4" /> Back
      </Button>

      <h1 className="text-3xl font-bold mb-6">{tour.title}</h1>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
          <TabsTrigger value="inclusions">Inclusions/Exclusions</TabsTrigger>
          <TabsTrigger value="faqs">FAQs</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>{tour.title}</CardTitle>
              <CardDescription>{tour.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <strong>Category:</strong> {tour.category}
                </div>
                <div>
                  <strong>Location:</strong> {tour.location}
                </div>
                <div>
                  <strong>Duration:</strong> {tour.days} days
                </div>
                <div>
                  <strong>Group Size:</strong> {tour.groupSize}
                </div>
                <div>
                  <strong>Difficulty:</strong> {tour.difficulty}
                </div>
                <div>
                  <strong>Price:</strong> ${tour.price}
                </div>
                <div>
                  <strong>Best Season:</strong> {tour.bestSeason}
                </div>
              </div>
              <div className="mt-4">
                <strong>Images:</strong>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {tour.images.map((image, index) => (
                    console.log("image url", `${BASE_URL}${image}`),
                    <img
                      key={index}
                      src={`${BASE_URL}${image}` || "/placeholder.svg?height=200&width=300"}
                      alt={`Tour image ${index + 1}`}
                      className="w-full h-24 object-cover rounded-md"
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="itinerary">
          <Card>
            <CardHeader>
              <CardTitle>Itinerary</CardTitle>
            </CardHeader>
            <CardContent>
              {tour.itineraries.map((day, index) => (
                <div key={index} className="mb-4">
                  <h3 className="font-bold">
                    Day {day.day}: {day.title}
                  </h3>
                  <p>{day.description}</p>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div>
                      <strong>Activities:</strong> {day.activities}
                    </div>
                    <div>
                      <strong>Accommodation:</strong> {day.accommodation}
                    </div>
                    <div>
                      <strong>Meals:</strong> {day.meals}
                    </div>
                    <div>
                      <strong>Distance:</strong> {day.distance}
                    </div>
                    <div>
                      <strong>Hours:</strong> {day.hours}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inclusions">
          <Card>
            <CardHeader>
              <CardTitle>Inclusions and Exclusions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-bold mb-2">Inclusions</h3>
                  <ul className="list-disc list-inside">
                    {tour.inclusions.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold mb-2">Exclusions</h3>
                  <ul className="list-disc list-inside">
                    {tour.exclusions.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="faqs">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              {tour.faqs.map((faq, index) => (
                <div key={index} className="mb-4">
                  <h3 className="font-bold">{faq.question}</h3>
                  <p>{faq.answer}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

