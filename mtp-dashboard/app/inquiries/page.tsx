"use client"

import { useState, useEffect } from "react"
import { Search, Eye, Trash2, Check } from "lucide-react"
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

// Simulated API functions
const fetchInquiries = async () => {
  // In a real application, this would be an API call
  return [
    { id: 1, name: "John Doe", email: "john@example.com", subject: "Tour Inquiry", date: "2023-06-15", status: "New" },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      subject: "Booking Question",
      date: "2023-06-14",
      status: "In Progress",
    },
    // ... more inquiries
  ]
}

const deleteInquiry = async (id: number) => {
  // Simulated API call to delete an inquiry
  console.log(`Deleting inquiry ${id}`)
  // In a real application, you would make an API call here
  return true
}

const resolveInquiry = async (id: number) => {
  // Simulated API call to resolve an inquiry
  console.log(`Resolving inquiry ${id}`)
  // In a real application, you would make an API call here
  return true
}

export default function InquiriesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("date")
  const [inquiries, setInquiries] = useState([])
  const { toast } = useToast()
  const [selectedInquiry, setSelectedInquiry] = useState(null)

  useEffect(() => {
    const loadInquiries = async () => {
      const fetchedInquiries = await fetchInquiries()
      setInquiries(fetchedInquiries)
    }
    loadInquiries()
  }, [])

  const filteredInquiries = inquiries
    .filter(
      (inquiry) =>
        inquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inquiry.subject.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      if (sortBy === "date") {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      } else {
        return a.name.localeCompare(b.name)
      }
    })

  const handleView = (inquiry) => {
    setSelectedInquiry(inquiry)
  }

  const handleDelete = async (id: number) => {
    const success = await deleteInquiry(id)
    if (success) {
      setInquiries(inquiries.filter((inquiry) => inquiry.id !== id))
      toast({
        title: "Inquiry Deleted",
        description: `Inquiry with ID: ${id} has been deleted.`,
        variant: "destructive",
      })
    } else {
      toast({
        title: "Error",
        description: "Failed to delete inquiry. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleResolve = async (id: number) => {
    const success = await resolveInquiry(id)
    if (success) {
      setInquiries(inquiries.map((inquiry) => (inquiry.id === id ? { ...inquiry, status: "Resolved" } : inquiry)))
      toast({
        title: "Inquiry Resolved",
        description: `Inquiry with ID: ${id} has been marked as resolved.`,
      })
    } else {
      toast({
        title: "Error",
        description: "Failed to resolve inquiry. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Inquiries</h1>

      <div className="flex items-center space-x-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search inquiries..."
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
            <SelectItem value="name">Sort by Name</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredInquiries.map((inquiry) => (
            <TableRow key={inquiry.id}>
              <TableCell>{inquiry.name}</TableCell>
              <TableCell>{inquiry.email}</TableCell>
              <TableCell>{inquiry.subject}</TableCell>
              <TableCell>{inquiry.date}</TableCell>
              <TableCell>{inquiry.status}</TableCell>
              <TableCell>
                <div className="flex justify-end gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0" onClick={() => handleView(inquiry)}>
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Inquiry Details</DialogTitle>
                      </DialogHeader>
                      <DialogDescription>
                        <dl className="space-y-2">
                          <div>
                            <dt className="font-semibold">Name:</dt>
                            <dd>{inquiry.name}</dd>
                          </div>
                          <div>
                            <dt className="font-semibold">Email:</dt>
                            <dd>{inquiry.email}</dd>
                          </div>
                          <div>
                            <dt className="font-semibold">Subject:</dt>
                            <dd>{inquiry.subject}</dd>
                          </div>
                          <div>
                            <dt className="font-semibold">Date:</dt>
                            <dd>{inquiry.date}</dd>
                          </div>
                          <div>
                            <dt className="font-semibold">Status:</dt>
                            <dd>{inquiry.status}</dd>
                          </div>
                        </dl>
                      </DialogDescription>
                    </DialogContent>
                  </Dialog>
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0" onClick={() => handleDelete(inquiry.id)}>
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0" onClick={() => handleResolve(inquiry.id)}>
                    <Check className="h-4 w-4" />
                    <span className="sr-only">Resolve</span>
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

