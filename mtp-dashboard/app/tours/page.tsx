"use client"

import { useState } from "react"
import { Plus, Search, Eye, Edit, Trash2 } from 'lucide-react'
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

// Mock data for demonstration purposes
const tours = [
  {
    id: 1,
    title: "Paris Adventure",
    location: "Paris, France",
    price: 1200,
    duration: 7,
    description: "Experience the magic of Paris",
    status: "active",
    category: "Cultural",
  },
  {
    id: 2,
    title: "Tokyo Explorer",
    location: "Tokyo, Japan",
    price: 1500,
    duration: 10,
    description: "Discover the wonders of Tokyo",
    status: "pending",
    category: "Adventure",
  },
  {
    id: 3,
    title: "New York City Tour",
    location: "New York, USA",
    price: 800,
    duration: 5,
    description: "Explore the Big Apple",
    status: "active",
    category: "City",
  },
  {
    id: 4,
    title: "Rome Historical Tour",
    location: "Rome, Italy",
    price: 1100,
    duration: 6,
    description: "Walk through ancient history",
    status: "inactive",
    category: "Historical",
  },
  {
    id: 5,
    title: "Sydney Harbour Tour",
    location: "Sydney, Australia",
    price: 950,
    duration: 4,
    description: "Sail around Sydney's iconic harbour",
    status: "active",
    category: "Nature",
  },
]

export default function ToursPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("title")
  const { toast } = useToast()

  const filteredTours = tours
    .filter(
      (tour) =>
        tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tour.location.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      if (sortBy === "price") {
        return a.price - b.price
      } else if (sortBy === "duration") {
        return a.duration - b.duration
      } else {
        return a.title.localeCompare(b.title)
      }
    })

  const handleDelete = (id: number) => {
    console.log(`Deleting tour with id: ${id}`)
    toast({
      title: "Tour Deleted",
      description: `Tour with ID: ${id} has been deleted.`,
      variant: "destructive",
    })
  }

  const handleView = (id: number) => {
    router.push(`/tours/${id}`)
  }

  const handleEdit = (id: number) => {
    router.push(`/tours/edit/${id}`)
  }

  const handleStatusToggle = (id: number) => {
    console.log(`Toggling status for tour with id: ${id}`)
    toast({
      title: "Status Updated",
      description: "Tour status has been updated successfully.",
    })
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Tour Packages</h1>
        <Button onClick={() => router.push("/tours/add")}>
          <Plus className="mr-2 h-4 w-4" />
          Add Tour
        </Button>
      </div>

      <div className="flex items-center space-x-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tours..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="title">Sort by Title</SelectItem>
            <SelectItem value="price">Sort by Price</SelectItem>
            <SelectItem value="duration">Sort by Duration</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Duration (days)</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTours.map((tour) => (
            <TableRow key={tour.id}>
              <TableCell>{tour.title}</TableCell>
              <TableCell>{tour.location}</TableCell>
              <TableCell>${tour.price}</TableCell>
              <TableCell>{tour.duration}</TableCell>
              <TableCell>{tour.category}</TableCell>
              <TableCell>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    tour.status === "active"
                      ? "bg-green-100 text-green-800"
                      : tour.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {tour.status}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0" onClick={() => handleView(tour.id)}>
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">View</span>
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0" onClick={() => handleEdit(tour.id)}>
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0" onClick={() => handleDelete(tour.id)}>
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

