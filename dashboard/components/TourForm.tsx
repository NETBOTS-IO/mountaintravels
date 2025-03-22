"use client"
import axios from "axios"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  PlusCircle,
  MinusCircle,
  MapPin,
  Calendar,
  Users,
  Mountain,
  DollarSign,
  Sun,
  Image,
  FileText,
  HelpCircle,
  Book,
  Shield,
} from "lucide-react"
import { getTourById, type Tour } from "@/lib/data-utils"
import { toast } from "react-hot-toast"
import { BASE_URL } from "@/Var"

const tourCategories = ["Trekking", "Cultural", "Adventure", "Sightseeing", "Wildlife", "Historical", "Mountaineering"]


const ImagePreview = ({ src, onRemove }) => {
  return (
    <div className="relative">
      <img
        src={src || "/placeholder.svg?height=200&width=300"}
        alt="Tour image"
        className="w-full h-32 object-cover rounded-md"
      />
      <Button type="button" variant="destructive" size="icon" className="absolute top-1 right-1" onClick={onRemove}>
        <MinusCircle className="h-4 w-4" />
      </Button>
    </div>
  )
}

const defaultTour = {
  id: "",
  title: "",
  category: "",
  location: "",
  days: 1,
  groupSize: "",
  difficulty: "easy" as const,
  price: 0,
  bestSeason: "",
  description: "",
  images: [],
  itineraries: [
    {
      day: 1,
      title: "",
      description: "",
      activities: "",
      accommodation: "",
      meals: "",
      distance: "",
      hours: "",
      images: [],
    },
  ],
  inclusions: [""],
  exclusions: [""],
  faqs: [{ question: "", answer: "" }],
  termsAndConditions: [""],
  policies: [""],
  map: { latitude: 0, longitude: 0 },
}

export default function TourForm({ tourId = null, initialData = null }) {
  const [tour, setTour] = useState<Tour>(initialData || defaultTour)
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [itineraryImageFiles, setItineraryImageFiles] = useState<{ [dayIndex: number]: File[] }>({})
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const [itineraryImagePreviews, setItineraryImagePreviews] = useState<{ [dayIndex: number]: string[] }>({})
  const router = useRouter()

  useEffect(() => {
    if (tourId && initialData) {
      setTour(initialData)
      // If there are existing images, set them as previews
      if (initialData.images && initialData.images.length > 0) {
        setImagePreviews(initialData.images)
      }
    }
    // if (tourId && !initialData) {
    //   const fetchedTour = getTourById(tourId)
    //   if (fetchedTour) {
    //     setTour(fetchedTour)
    //     // If there are existing images, set them as previews
    //     if (fetchedTour.images && fetchedTour.images.length > 0) {
    //       setImagePreviews(fetchedTour.images)
    //     }

    //     // If there are existing itinerary images, set them as previews
    //     if (fetchedTour.itineraries) {
    //       const itineraryPreviews = {}
    //       fetchedTour.itineraries.forEach((itinerary, index) => {
    //         if (itinerary.images && itinerary.images.length > 0) {
    //           itineraryPreviews[index] = itinerary.images
    //         }
    //       })
    //       setItineraryImagePreviews(itineraryPreviews)
    //     }
    //   }
    // } else if (initialData) {
    //   setTour(initialData)
    // }
  }, [tourId, initialData])

  const handleChange = (e, index = null, field = null) => {
    const { name, value } = e.target
    if (index !== null && field) {
      setTour((prevTour) => ({
        ...prevTour,
        [field]: prevTour[field].map((item, i) => (i === index ? { ...item, [name]: value } : item)),
      }))
    } else {
      setTour((prevTour) => ({ ...prevTour, [name]: value }))
    }
  }

  const handleMapChange = (e) => {
    const { name, value } = e.target
    setTour((prevTour) => ({ ...prevTour, map: { ...prevTour.map, [name]: Number.parseFloat(value) } }))
  }

  const handleArrayChange = (e, index, field) => {
    const { value } = e.target
    setTour((prevTour) => ({
      ...prevTour,
      [field]: prevTour[field].map((item, i) => (i === index ? value : item)),
    }))
  }

  const addArrayItem = (field) => {
    setTour((prevTour) => ({ ...prevTour, [field]: [...prevTour[field], ""] }))
  }

  const removeArrayItem = (index, field) => {
    setTour((prevTour) => ({ ...prevTour, [field]: prevTour[field].filter((_, i) => i !== index) }))
  }

  const updateItineraryDays = (days) => {
    setTour((prevTour) => {
      const newItineraries = [...prevTour.itineraries]
      const currentDays = newItineraries.length

      if (days > currentDays) {
        for (let i = currentDays + 1; i <= days; i++) {
          newItineraries.push({
            day: i,
            title: "",
            description: "",
            activities: "",
            accommodation: "",
            meals: "",
            distance: "",
            hours: "",
            images: [],
          })
        }
      } else if (days < currentDays) {
        newItineraries.splice(days)
      }

      return { ...prevTour, itineraries: newItineraries }
    })
  }

  const handleImageUpload = (e) => {
    if (!e.target.files || e.target.files.length === 0) return

    const files = Array.from(e.target.files) as File[]

    // Store the actual file objects
    setImageFiles((prev) => [...prev, ...files])

    // Create preview URLs for display
    const fileUrls = files.map((file) => URL.createObjectURL(file))
    setImagePreviews((prev) => [...prev, ...fileUrls])

    // Also update the tour state for compatibility with existing code
    setTour((prevTour) => ({
      ...prevTour,
      images: [...prevTour.images, ...fileUrls],
    }))
  }

  const removeImage = (index) => {
    // Revoke the object URL to avoid memory leaks
    if (imagePreviews[index]) {
      URL.revokeObjectURL(imagePreviews[index])
    }

    // Remove from all state variables
    setImageFiles((prev) => prev.filter((_, i) => i !== index))
    setImagePreviews((prev) => prev.filter((_, i) => i !== index))
    setTour((prevTour) => ({
      ...prevTour,
      images: prevTour.images.filter((_, i) => i !== index),
    }))
  }

  const handleItineraryImageUpload = (e, dayIndex) => {
    if (!e.target.files || e.target.files.length === 0) return

    const files = Array.from(e.target.files) as File[]

    // Store the actual file objects
    setItineraryImageFiles((prev) => ({
      ...prev,
      [dayIndex]: [...(prev[dayIndex] || []), ...files],
    }))

    // Create preview URLs for display
    const fileUrls = files.map((file) => URL.createObjectURL(file))
    setItineraryImagePreviews((prev) => ({
      ...prev,
      [dayIndex]: [...(prev[dayIndex] || []), ...fileUrls],
    }))

    // Also update the tour state for compatibility with existing code
    setTour((prevTour) => ({
      ...prevTour,
      itineraries: prevTour.itineraries.map((day, i) =>
        i === dayIndex ? { ...day, images: [...day.images, ...fileUrls] } : day,
      ),
    }))
  }

  const removeItineraryImage = (dayIndex, imageIndex) => {
    // Revoke the object URL to avoid memory leaks
    const urlToRemove = itineraryImagePreviews[dayIndex]?.[imageIndex]
    if (urlToRemove) {
      URL.revokeObjectURL(urlToRemove)
    }

    // Remove from all state variables
    setItineraryImageFiles((prev) => ({
      ...prev,
      [dayIndex]: (prev[dayIndex] || []).filter((_, i) => i !== imageIndex),
    }))

    setItineraryImagePreviews((prev) => ({
      ...prev,
      [dayIndex]: (prev[dayIndex] || []).filter((_, i) => i !== imageIndex),
    }))

    setTour((prevTour) => ({
      ...prevTour,
      itineraries: prevTour.itineraries.map((day, i) =>
        i === dayIndex ? { ...day, images: day.images.filter((_, imgI) => imgI !== imageIndex) } : day,
      ),
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Tour data:", tour);
    console.log("Tour Id:", tourId);


    const formData = new FormData();
  
    if (!tour) {
      // console.error("Tour data is undefined!");
      toast.error("Tour data is missing!");
      return;
    }
  
    // ✅ Add main tour images to FormData (only if images exist)
    if (imageFiles?.length > 0) {
      imageFiles.forEach((file) => {
        formData.append("images", file);
      });
    }
  
    // ✅ Add itinerary images to FormData
    Object.values(itineraryImageFiles).forEach((files) => {
      files.forEach((file) => {
        formData.append("itineraryImages", file);
      });
    });
  
    // ✅ Extract tour data without images
    const { images, itineraries, id, ...tourData } = tour || {};

    // ✅ Check if the tour is being
    const isUpdating =
    (tourId !== null && typeof tourId === "string" && tourId.trim() !== "") ||
    (id !== null && typeof id === "string" && id.trim() !== "");
  
    

    // ✅ Process itineraries
    const processedItineraries = itineraries?.map((itinerary, index) => ({
      ...itinerary,
      images: undefined,
      imageCount: (itineraryImageFiles[index] || []).length,
    }));
  
    if (isUpdating) {
      tourData.id = id;
    }
  
    // ✅ Append text data as JSON
    formData.append(
      "tourData",
      JSON.stringify({
        ...tourData,
        itineraries: processedItineraries || [],
      })
    );
  
    const url = isUpdating
      ? `${BASE_URL}/api/tours/${tourId}`
      : `${BASE_URL}/api/tours`;
    const method = isUpdating ? "put" : "post";
  console.log(`Submitting tour with method: ${method}, URL: ${url}`);

  
    // ✅ Debugging: Log FormData before sending
    // for (let pair of formData.entries()) {
    //   console.log("FormData Key:", pair[0], "=>", pair[1]);
    // }
  
    try {
      const response = await axios({
        method,
        url,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      // ✅ Ensure a successful request before showing success toast
      if (response.status >= 200 && response.status < 300) {
        toast.success(`Tour ${isUpdating ? "updated" : "added"} successfully`);
        router.push("/admin/tours");
      }
    } catch (error) {
      // ✅ Show error only if the request fails
      console.error("Error saving tour:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Failed to save tour");
    }
  };
  
  

  // Clean up object URLs when component unmounts
  useEffect(() => {
    return () => {
      // Clean up image previews
      imagePreviews.forEach((url) => {
        if (url.startsWith("blob:")) {
          URL.revokeObjectURL(url)
        }
      })

      // Clean up itinerary image previews
      Object.values(itineraryImagePreviews).forEach((urls) => {
        urls.forEach((url) => {
          if (url.startsWith("blob:")) {
            URL.revokeObjectURL(url)
          }
        })
      })
    }
  }, [imagePreviews, itineraryImagePreviews])

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title" className="flex items-center mb-2">
            <FileText className="w-4 h-4 mr-2" />
            Title
          </Label>
          <Input id="title" name="title" value={tour?.title || ""} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="category" className="flex items-center mb-2">
            <Book className="w-4 h-4 mr-2" />
            Category
          </Label>
          <Select
            name="category"
            value={tour?.category || ""}
            onValueChange={(value) => handleChange({ target: { name: "category", value } })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {tourCategories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="location" className="flex items-center mb-2">
          <MapPin className="w-4 h-4 mr-2" />
          Location
        </Label>
        <Input id="location" name="location" value={tour?.location || ""} onChange={handleChange} required />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="days" className="flex items-center mb-2">
            <Calendar className="w-4 h-4 mr-2" />
            Days
          </Label>
          <Input
            id="days"
            name="days"
            type="number"
            min="1"
            value={tour?.days || 1}
            onChange={(e) => {
              handleChange(e)
              updateItineraryDays(Number.parseInt(e.target.value))
            }}
            required
          />
        </div>
        <div>
          <Label htmlFor="groupSize" className="flex items-center mb-2">
            <Users className="w-4 h-4 mr-2" />
            Group Size
          </Label>
          <Input id="groupSize" name="groupSize" value={tour?.groupSize || ""} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="difficulty" className="flex items-center mb-2">
            <Mountain className="w-4 h-4 mr-2" />
            Difficulty
          </Label>
          <Select
            name="difficulty"
            value={tour?.difficulty || ""}
            onValueChange={(value) => handleChange({ target: { name: "difficulty", value } })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="easy">Easy</SelectItem>
              <SelectItem value="moderate">Moderate</SelectItem>
              <SelectItem value="challenging">Challenging</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="price" className="flex items-center mb-2">
            <DollarSign className="w-4 h-4 mr-2" />
            Price
          </Label>
          <Input id="price" name="price" type="number" value={tour?.price || 0} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="bestSeason" className="flex items-center mb-2">
            <Sun className="w-4 h-4 mr-2" />
            Best Season
          </Label>
          <Input id="bestSeason" name="bestSeason" value={tour?.bestSeason || ""} onChange={handleChange} required />
        </div>
      </div>

      <div>
        <Label htmlFor="description" className="flex items-center mb-2">
          <FileText className="w-4 h-4 mr-2" />
          Description
        </Label>
        <Textarea
          id="description"
          name="description"
          value={tour?.description || ""}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <Label className="flex items-center mb-2">
          <Image className="w-4 h-4 mr-2" />
          Images
        </Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {imagePreviews.map((preview, index) => (
            <ImagePreview key={index} src={preview || "/placeholder.svg"} onRemove={() => removeImage(index)} />
          ))}
          <label className="flex items-center justify-center w-full h-32 border-2 border-dashed rounded-md cursor-pointer hover:border-primary">
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" multiple />
            <PlusCircle className="h-6 w-6 mr-2" />
            Add Image
          </label>
        </div>
      </div>

      <Accordion type="single" collapsible className="w-full space-y-4">
        <AccordionItem value="itinerary" className="border rounded-lg">
          <AccordionTrigger className="px-4 py-2 font-bold">
            <Calendar className="w-5 h-5 mr-2" />
            Itinerary
          </AccordionTrigger>
          <AccordionContent className="p-4 bg-gray-50">
            {tour?.itineraries?.map((day, index) => (
              <div key={index} className="border p-4 mb-4 rounded-md bg-white">
                <h3 className="font-bold mb-2">Day {day.day}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor={`day-${index}-title`} className="mb-2">
                      Day Title
                    </Label>
                    <Input
                      id={`day-${index}-title`}
                      name="title"
                      value={day.title || ""}
                      onChange={(e) => handleChange(e, index, "itineraries")}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`day-${index}-description`} className="mb-2">
                      Description
                    </Label>
                    <Input
                      id={`day-${index}-description`}
                      name="description"
                      value={day.description || ""}
                      onChange={(e) => handleChange(e, index, "itineraries")}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`day-${index}-activities`} className="mb-2">
                      Activities
                    </Label>
                    <Input
                      id={`day-${index}-activities`}
                      name="activities"
                      value={day.activities || ""}
                      onChange={(e) => handleChange(e, index, "itineraries")}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`day-${index}-accommodation`} className="mb-2">
                      Accommodation
                    </Label>
                    <Input
                      id={`day-${index}-accommodation`}
                      name="accommodation"
                      value={day.accommodation || ""}
                      onChange={(e) => handleChange(e, index, "itineraries")}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`day-${index}-meals`} className="mb-2">
                      Meals
                    </Label>
                    <Input
                      id={`day-${index}-meals`}
                      name="meals"
                      value={day.meals || ""}
                      onChange={(e) => handleChange(e, index, "itineraries")}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`day-${index}-distance`} className="mb-2">
                      Distance
                    </Label>
                    <Input
                      id={`day-${index}-distance`}
                      name="distance"
                      value={day.distance || ""}
                      onChange={(e) => handleChange(e, index, "itineraries")}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`day-${index}-hours`} className="mb-2">
                      Hours
                    </Label>
                    <Input
                      id={`day-${index}-hours`}
                      name="hours"
                      value={day.hours || ""}
                      onChange={(e) => handleChange(e, index, "itineraries")}
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <Label className="mb-2">Images</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {(itineraryImagePreviews[index] || []).map((preview, imgIndex) => (
                      <div key={imgIndex} className="relative">
                        <img
                          src={preview || "/placeholder.svg?height=200&width=300"}
                          alt={`Day ${day.day} image ${imgIndex + 1}`}
                          className="w-full h-24 object-cover rounded-md"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-1 right-1"
                          onClick={() => removeItineraryImage(index, imgIndex)}
                        >
                          <MinusCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <label className="flex items-center justify-center w-full h-24 border-2 border-dashed rounded-md cursor-pointer hover:border-primary">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleItineraryImageUpload(e, index)}
                        className="hidden"
                        multiple
                      />
                      <PlusCircle className="h-6 w-6 mr-2" />
                      Add Image
                    </label>
                  </div>
                </div>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="inclusions" className="border rounded-lg">
          <AccordionTrigger className="px-4 py-2 font-bold">
            <PlusCircle className="w-5 h-5 mr-2" />
            Inclusions
          </AccordionTrigger>
          <AccordionContent className="p-4 bg-gray-50">
            {tour?.inclusions?.map((inclusion, index) => (
              <div key={index} className="flex items-center mb-2">
                <Input
                  value={inclusion || ""}
                  onChange={(e) => handleArrayChange(e, index, "inclusions")}
                  className="flex-grow"
                />
                <Button type="button" variant="ghost" onClick={() => removeArrayItem(index, "inclusions")}>
                  <MinusCircle className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button type="button" onClick={() => addArrayItem("inclusions")} className="mt-2">
              <PlusCircle className="h-4 w-4 mr-2" /> Add Inclusion
            </Button>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="exclusions" className="border rounded-lg">
          <AccordionTrigger className="px-4 py-2 font-bold">
            <MinusCircle className="w-5 h-5 mr-2" />
            Exclusions
          </AccordionTrigger>
          <AccordionContent className="p-4 bg-gray-50">
            {tour?.exclusions?.map((exclusion, index) => (
              <div key={index} className="flex items-center mb-2">
                <Input
                  value={exclusion || ""}
                  onChange={(e) => handleArrayChange(e, index, "exclusions")}
                  className="flex-grow"
                />
                <Button type="button" variant="ghost" onClick={() => removeArrayItem(index, "exclusions")}>
                  <MinusCircle className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button type="button" onClick={() => addArrayItem("exclusions")} className="mt-2">
              <PlusCircle className="h-4 w-4 mr-2" /> Add Exclusion
            </Button>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="faqs" className="border rounded-lg">
          <AccordionTrigger className="px-4 py-2 font-bold">
            <HelpCircle className="w-5 h-5 mr-2" />
            FAQs
          </AccordionTrigger>
          <AccordionContent className="p-4 bg-gray-50">
            {tour?.faqs?.map((faq, index) => (
              <div key={index} className="mb-4">
                <Input
                  value={faq.question || ""}
                  onChange={(e) => handleChange(e, index, "faqs")}
                  name="question"
                  placeholder="Question"
                  className="mb-2"
                />
                <Textarea
                  value={faq.answer || ""}
                  onChange={(e) => handleChange(e, index, "faqs")}
                  name="answer"
                  placeholder="Answer"
                />
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => removeArrayItem(index, "faqs")}
                  className="mt-2"
                >
                  Remove FAQ
                </Button>
              </div>
            ))}
            <Button
              type="button"
              onClick={() =>
                setTour((prevTour) => ({ ...prevTour, faqs: [...(prevTour.faqs || []), { question: "", answer: "" }] }))
              }
              className="mt-2"
            >
              <PlusCircle className="h-4 w-4 mr-2" /> Add FAQ
            </Button>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="termsAndConditions" className="border rounded-lg">
          <AccordionTrigger className="px-4 py-2 font-bold">
            <FileText className="w-5 h-5 mr-2" />
            Terms and Conditions
          </AccordionTrigger>
          <AccordionContent className="p-4 bg-gray-50">
            {tour?.termsAndConditions?.map((term, index) => (
              <div key={index} className="flex items-center mb-2">
                <Input
                  value={term || ""}
                  onChange={(e) => handleArrayChange(e, index, "termsAndConditions")}
                  className="flex-grow"
                />
                <Button type="button" variant="ghost" onClick={() => removeArrayItem(index, "termsAndConditions")}>
                  <MinusCircle className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button type="button" onClick={() => addArrayItem("termsAndConditions")} className="mt-2">
              <PlusCircle className="h-4 w-4 mr-2" /> Add Term
            </Button>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="policies" className="border rounded-lg">
          <AccordionTrigger className="px-4 py-2 font-bold">
            <Shield className="w-5 h-5 mr-2" />
            Policies
          </AccordionTrigger>
          <AccordionContent className="p-4 bg-gray-50">
            {tour?.policies?.map((policy, index) => (
              <div key={index} className="flex items-center mb-2">
                <Input
                  value={policy || ""}
                  onChange={(e) => handleArrayChange(e, index, "policies")}
                  className="flex-grow"
                />
                <Button type="button" variant="ghost" onClick={() => removeArrayItem(index, "policies")}>
                  <MinusCircle className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button type="button" onClick={() => addArrayItem("policies")} className="mt-2">
              <PlusCircle className="h-4 w-4 mr-2" /> Add Policy
            </Button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="latitude" className="flex items-center mb-2">
            <MapPin className="w-4 h-4 mr-2" />
            Latitude
          </Label>
          <Input
            id="latitude"
            name="latitude"
            type="number"
            step="any"
            value={tour?.map?.latitude || 0}
            onChange={handleMapChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="longitude" className="flex items-center mb-2">
            <MapPin className="w-4 h-4 mr-2" />
            Longitude
          </Label>
          <Input
            id="longitude"
            name="longitude"
            type="number"
            step="any"
            value={tour?.map?.longitude || 0}
            onChange={handleMapChange}
            required
          />
        </div>
      </div>

      <Button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white">
        {tourId ? "Update Tour" : "Add Tour"}
      </Button>
    </form>
  )
}

