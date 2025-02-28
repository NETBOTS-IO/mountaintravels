"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFieldArray } from "react-hook-form"
import * as z from "zod"
import { Plus, Minus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePicker } from "@/components/ui/date-picker"

const formSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  location: z.string().min(2, { message: "Location must be at least 2 characters." }),
  price: z.number().min(0, { message: "Price must be a positive number." }),
  duration: z.number().min(1, { message: "Duration must be at least 1 day." }),
  category: z.string({ required_error: "Please select a tour category." }),
  images: z.array(z.instanceof(File)).min(1, { message: "At least one image is required." }),
  itineraries: z
    .array(
      z.object({
        day: z.number(),
        title: z.string().min(2, "Title must be at least 2 characters."),
        description: z.string().min(10, "Description must be at least 10 characters."),
        accommodation: z.string(),
        meals: z.string(),
        time: z.string(),
        distance: z.number().optional(),
        ascent: z.number().optional(),
        descent: z.number().optional(),
        image: z.instanceof(File).optional(),
      }),
    )
    .min(1, { message: "At least one itinerary item is required." }),
  mapIframe: z.string().optional(),
  faqs: z.array(
    z.object({
      question: z.string().min(2, "Question must be at least 2 characters."),
      answer: z.string().min(2, "Answer must be at least 2 characters."),
    }),
  ),
  termsAndConditions: z.string().min(10, { message: "Terms and conditions must be at least 10 characters." }),
  maxGroupSize: z.number().min(1, { message: "Max group size must be at least 1." }),
  difficultyLevel: z.enum(["Easy", "Moderate", "Challenging"]),
  startDates: z.array(z.date()),
  includedServices: z.array(z.string()),
  excludedServices: z.array(z.string()),
  requiredEquipment: z.array(z.string()),
  meetingPoint: z.string().min(2, { message: "Meeting point must be at least 2 characters." }),
  endPoint: z.string().min(2, { message: "End point must be at least 2 characters." }),
  status: z.enum(["draft", "published", "archived"]),
  seasonalPricing: z
    .array(
      z.object({
        startDate: z.date(),
        endDate: z.date(),
        price: z.number().min(0),
      }),
    )
    .optional(),
  relatedTours: z.array(z.string()).optional(),
  keywords: z.array(z.string()),
})

export default function AddTourPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      price: 0,
      duration: 1,
      category: "",
      images: [],
      itineraries: [{ day: 1, title: "", description: "", accommodation: "", meals: "", time: "" }],
      mapIframe: "",
      faqs: [{ question: "", answer: "" }],
      termsAndConditions: "",
      maxGroupSize: 1,
      difficultyLevel: "Easy",
      startDates: [],
      includedServices: [],
      excludedServices: [],
      requiredEquipment: [],
      meetingPoint: "",
      endPoint: "",
      status: "draft",
      seasonalPricing: [],
      relatedTours: [],
      keywords: [],
    },
  })

  const {
    fields: itineraryFields,
    append: appendItinerary,
    remove: removeItinerary,
  } = useFieldArray({
    control: form.control,
    name: "itineraries",
  })

  const {
    fields: faqFields,
    append: appendFaq,
    remove: removeFaq,
  } = useFieldArray({
    control: form.control,
    name: "faqs",
  })

  const {
    fields: seasonalPricingFields,
    append: appendSeasonalPricing,
    remove: removeSeasonalPricing,
  } = useFieldArray({
    control: form.control,
    name: "seasonalPricing",
  })

  const {
    fields: includedServicesFields,
    append: appendIncludedService,
    remove: removeIncludedService,
  } = useFieldArray({
    control: form.control,
    name: "includedServices",
  })

  const {
    fields: excludedServicesFields,
    append: appendExcludedService,
    remove: removeExcludedService,
  } = useFieldArray({
    control: form.control,
    name: "excludedServices",
  })

  const {
    fields: keywordsFields,
    append: appendKeyword,
    remove: removeKeyword,
  } = useFieldArray({
    control: form.control,
    name: "keywords",
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    // Here you would typically make an API call to create the tour
    console.log(values)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)

    toast({
      title: "Tour Created",
      description: "The tour has been successfully created.",
    })
    router.push("/tours")
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-3xl font-bold">Add New Tour</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Form fields */}
          {/* ... (previous form fields remain unchanged) ... */}

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter tour title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter tour description" {...field} rows={5} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="Enter tour location" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter tour price"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration (days)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter tour duration"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="mountaineering">Mountaineering</SelectItem>
                    <SelectItem value="trekking">Trekking</SelectItem>
                    <SelectItem value="skiing">Skiing</SelectItem>
                    <SelectItem value="expedition">Expedition</SelectItem>
                    <SelectItem value="rock-climbing">Rock Climbing</SelectItem>
                    <SelectItem value="mountain-biking">Mountain Biking</SelectItem>
                    <SelectItem value="cultural-tour">Cultural Tour</SelectItem>
                    <SelectItem value="hunting">Hunting</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => {
                      const files = Array.from(e.target.files || [])
                      field.onChange(files)
                    }}
                  />
                </FormControl>
                <FormDescription>Upload tour images</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Accordion type="single" collapsible className="w-full border rounded-md">
            <AccordionItem value="itineraries">
              <AccordionTrigger className="px-4">Itineraries</AccordionTrigger>
              <AccordionContent className="px-4">
                {itineraryFields.map((field, index) => (
                  <div key={field.id} className="border p-4 mb-4 rounded-md">
                    <FormField
                      control={form.control}
                      name={`itineraries.${index}.title`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Day {index + 1} Title</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`itineraries.${index}.description`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`itineraries.${index}.accommodation`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Accommodation</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`itineraries.${index}.meals`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Meals</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`itineraries.${index}.time`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Time</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`itineraries.${index}.distance`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Distance (km)</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`itineraries.${index}.ascent`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ascent (m)</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`itineraries.${index}.descent`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Descent (m)</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`itineraries.${index}.image`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Image</FormLabel>
                          <FormControl>
                            <Input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0]
                                if (file) {
                                  field.onChange(file)
                                }
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeItinerary(index)}
                      className="mt-2"
                    >
                      <Minus className="h-4 w-4 mr-2" /> Remove Day
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    appendItinerary({
                      day: itineraryFields.length + 1,
                      title: "",
                      description: "",
                      accommodation: "",
                      meals: "",
                      time: "",
                      distance: 0,
                      ascent: 0,
                      descent: 0,
                    })
                  }
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Day
                </Button>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <FormField
            control={form.control}
            name="mapIframe"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Map (Google Maps iframe)</FormLabel>
                <FormControl>
                  <Textarea placeholder="Paste Google Maps iframe code here" {...field} />
                </FormControl>
                <FormDescription>Enter the iframe code for the Google Maps location</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Accordion type="single" collapsible className="w-full border rounded-md">
            <AccordionItem value="faqs">
              <AccordionTrigger className="px-4">FAQs</AccordionTrigger>
              <AccordionContent className="px-4">
                {faqFields.map((field, index) => (
                  <div key={field.id} className="border p-4 mb-4 rounded-md">
                    <FormField
                      control={form.control}
                      name={`faqs.${index}.question`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Question</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`faqs.${index}.answer`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Answer</FormLabel>
                          <FormControl>
                            <Textarea {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="button" variant="outline" size="sm" onClick={() => removeFaq(index)} className="mt-2">
                      <Minus className="h-4 w-4 mr-2" /> Remove FAQ
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => appendFaq({ question: "", answer: "" })}
                >
                  <Plus className="h-4 w-4 mr-2" /> Add FAQ
                </Button>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <FormField
            control={form.control}
            name="termsAndConditions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Terms and Conditions</FormLabel>
                <FormControl>
                  <Textarea {...field} rows={10} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* ... (remaining form fields) ... */}

          <FormField
            control={form.control}
            name="maxGroupSize"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Max Group Size</FormLabel>
                <FormControl>
                  <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="difficultyLevel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Difficulty Level</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Easy">Easy</SelectItem>
                    <SelectItem value="Moderate">Moderate</SelectItem>
                    <SelectItem value="Challenging">Challenging</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="startDates"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Dates</FormLabel>
                <FormControl>
                  <DatePicker selected={field.value} onChange={(dates) => field.onChange(dates)} multiple />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Accordion type="single" collapsible className="w-full border rounded-md">
            <AccordionItem value="includedServices">
              <AccordionTrigger className="px-4">Included Services</AccordionTrigger>
              <AccordionContent className="px-4">
                {includedServicesFields.map((field, index) => (
                  <div key={field.id} className="flex items-center space-x-2 mb-2">
                    <FormField
                      control={form.control}
                      name={`includedServices.${index}`}
                      render={({ field }) => (
                        <FormItem className="flex-grow">
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <Button type="button" variant="outline" size="sm" onClick={() => removeIncludedService(index)}>
                      <Minus className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={() => appendIncludedService("")}>
                  <Plus className="h-4 w-4 mr-2" /> Add Included Service
                </Button>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Accordion type="single" collapsible className="w-full border rounded-md">
            <AccordionItem value="excludedServices">
              <AccordionTrigger className="px-4">Excluded Services</AccordionTrigger>
              <AccordionContent className="px-4">
                {excludedServicesFields.map((field, index) => (
                  <div key={field.id} className="flex items-center space-x-2 mb-2">
                    <FormField
                      control={form.control}
                      name={`excludedServices.${index}`}
                      render={({ field }) => (
                        <FormItem className="flex-grow">
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <Button type="button" variant="outline" size="sm" onClick={() => removeExcludedService(index)}>
                      <Minus className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={() => appendExcludedService("")}>
                  <Plus className="h-4 w-4 mr-2" /> Add Excluded Service
                </Button>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <FormField
            control={form.control}
            name="requiredEquipment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Required Equipment</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter required equipment (one per line)"
                    {...field}
                    onChange={(e) => field.onChange(e.target.value.split("\n"))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="meetingPoint"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meeting Point</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endPoint"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Point</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Accordion type="single" collapsible className="w-full border rounded-md">
            <AccordionItem value="seasonalPricing">
              <AccordionTrigger className="px-4">Seasonal Pricing</AccordionTrigger>
              <AccordionContent className="px-4">
                {seasonalPricingFields.map((field, index) => (
                  <div key={field.id} className="border p-4 mb-4 rounded-md">
                    <FormField
                      control={form.control}
                      name={`seasonalPricing.${index}.startDate`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Start Date</FormLabel>
                          <FormControl>
                            <DatePicker selected={field.value} onChange={(date) => field.onChange(date)} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`seasonalPricing.${index}.endDate`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>End Date</FormLabel>
                          <FormControl>
                            <DatePicker selected={field.value} onChange={(date) => field.onChange(date)} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`seasonalPricing.${index}.price`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Price</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeSeasonalPricing(index)}
                      className="mt-2"
                    >
                      <Minus className="h-4 w-4 mr-2" /> Remove Seasonal Price
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => appendSeasonalPricing({ startDate: new Date(), endDate: new Date(), price: 0 })}
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Seasonal Price
                </Button>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <FormField
            control={form.control}
            name="relatedTours"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Related Tours</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter related tour IDs (comma-separated)" />
                </FormControl>
                <FormDescription>Enter the IDs of related tours, separated by commas</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Accordion type="single" collapsible className="w-full border rounded-md">
            <AccordionItem value="keywords">
              <AccordionTrigger className="px-4">Keywords</AccordionTrigger>
              <AccordionContent className="px-4">
                {keywordsFields.map((field, index) => (
                  <div key={field.id} className="flex items-center space-x-2 mb-2">
                    <FormField
                      control={form.control}
                      name={`keywords.${index}`}
                      render={({ field }) => (
                        <FormItem className="flex-grow">
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <Button type="button" variant="outline" size="sm" onClick={() => removeKeyword(index)}>
                      <Minus className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={() => appendKeyword("")}>
                  <Plus className="h-4 w-4 mr-2" /> Add Keyword
                </Button>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create Tour"}
          </Button>
        </form>
      </Form>
    </div>
  )
}

