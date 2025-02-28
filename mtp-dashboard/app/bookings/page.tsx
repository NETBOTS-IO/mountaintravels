"use client"

import { useState, useEffect } from "react"
import { Search, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Simulated API function
const fetchBookings = async () => {
  // In a real application, this would be an API call
  return [
    {
      id: 1,
      packageName: "Hunza Valley Tour",
      date: "2023-07-15",
      person: 2,
      name: "John Doe",
      email: "john@example.com",
      phone: "+1234567890",
    },
    {
      id: 2,
      packageName: "K2 Base Camp Trek",
      date: "2023-08-01",
      person: 4,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+0987654321",
    },
    // ... more bookings
  ]
}

export default function BookingsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("date")
  const [bookings, setBookings] = useState([])
  const { toast } = useToast()
  const [selectedBooking, setSelectedBooking] = useState(null)

  useEffect(() => {
    const loadBookings = async () => {
      const fetchedBookings = await fetchBookings()
      setBookings(fetchedBookings)
    }
    loadBookings()
  }, [])

  const filteredBookings = bookings
    .filter(
      (booking) =>
        booking.packageName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.email.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      if (sortBy === "date") {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      } else if (sortBy === "packageName") {
        return a.packageName.localeCompare(b.packageName)
      } else {
        return a.name.localeCompare(b.name)
      }
    })

  const handleView = (booking) => {
    setSelectedBooking(booking)
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Bookings</h1>

      <div className="flex items-center space-x-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search bookings..."
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
            <SelectItem value="date">Sort by Date</SelectItem>
            <SelectItem value="packageName">Sort by Package</SelectItem>
            <SelectItem value="name">Sort by Name</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Package Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Persons</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredBookings.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell>{booking.packageName}</TableCell>
              <TableCell>{booking.date}</TableCell>
              <TableCell>{booking.person}</TableCell>
              <TableCell>{booking.name}</TableCell>
              <TableCell>{booking.email}</TableCell>
              <TableCell>{booking.phone}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" onClick={() => handleView(booking)}>
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Booking Details</DialogTitle>
                      <DialogDescription>
                        <div>
                          <p>Package Name: {booking.packageName}</p>
                          <p>Date: {booking.date}</p>
                          <p>Persons: {booking.person}</p>
                          <p>Name: {booking.name}</p>
                          <p>Email: {booking.email}</p>
                          <p>Phone: {booking.phone}</p>
                        </div>
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

