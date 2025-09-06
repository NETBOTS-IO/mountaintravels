"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  getTestimonials,
  deleteTestimonial,
  toggleTestimonialVerification,
  getTestimonialStats,
} from "@/lib/data-utils";
import { Testimonial } from "@/lib/types";
import { toast } from "react-hot-toast";
import {
  Star,
  Pencil,
  Trash2,
  CheckCircle,
  XCircle,
  Plus,
  Search,
  Filter,
  User,
  Eye,
} from "lucide-react";
import Image from "next/image";
import { BASE_URL } from "@/Var";

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [stats, setStats] = useState({
    totalTestimonials: 0,
    verifiedTestimonials: 0,
    averageRating: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRating, setFilterRating] = useState<string>("all");
  const [filterVerified, setFilterVerified] = useState<string>("all");
  const [testimonialToDelete, setTestimonialToDelete] = useState<string | null>(
    null
  );
  const router = useRouter();

  const fetchTestimonials = async () => {
    setIsLoading(true);
    try {
      const data = await getTestimonials();
      setTestimonials(data);
      const statsData = await getTestimonialStats();
      setStats(statsData);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      toast.error("Failed to load testimonials");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const success = await deleteTestimonial(id);
      if (success) {
        toast.success("Testimonial deleted successfully");
        fetchTestimonials();
      } else {
        throw new Error("Failed to delete testimonial");
      }
    } catch (error) {
      console.error("Error deleting testimonial:", error);
      toast.error("Failed to delete testimonial");
    }
    setTestimonialToDelete(null);
  };

  const handleToggleVerification = async (id: string) => {
    try {
      const updatedTestimonial = await toggleTestimonialVerification(id);
      if (updatedTestimonial) {
        toast.success(
          `Testimonial ${
            updatedTestimonial.verified ? "verified" : "unverified"
          } successfully`
        );
        fetchTestimonials();
      } else {
        throw new Error("Failed to update verification status");
      }
    } catch (error) {
      console.error("Error updating verification status:", error);
      toast.error("Failed to update verification status");
    }
  };

  const filteredTestimonials = testimonials.filter((testimonial) => {
    const matchesSearch =
      testimonial.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      testimonial.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (testimonial.tripName &&
        testimonial.tripName.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesRating =
      filterRating === "all" || testimonial.rating.toString() === filterRating;

    const matchesVerified =
      filterVerified === "all" ||
      (filterVerified === "true" && testimonial.verified) ||
      (filterVerified === "false" && !testimonial.verified);

    return matchesSearch && matchesRating && matchesVerified;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Testimonials</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Total Testimonials
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalTestimonials}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Verified Testimonials
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.verifiedTestimonials}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Average Rating
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center">
              {stats.averageRating.toFixed(1)}
              <Star className="h-5 w-5 ml-1 text-yellow-400 fill-yellow-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Manage Testimonials</CardTitle>
            <Button onClick={() => router.push("/admin/testimonials/add")}>
              <Plus className="mr-2 h-4 w-4" /> Add Testimonial
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Label htmlFor="search" className="sr-only">
                Search
              </Label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  id="search"
                  placeholder="Search by name, location or trip..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-row gap-4">
              <div className="w-40">
                <Label htmlFor="rating-filter" className="sr-only">
                  Filter by Rating
                </Label>
                <Select value={filterRating} onValueChange={setFilterRating}>
                  <SelectTrigger id="rating-filter">
                    <SelectValue placeholder="Rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Ratings</SelectItem>
                    <SelectItem value="5">5 Stars</SelectItem>
                    <SelectItem value="4">4 Stars</SelectItem>
                    <SelectItem value="3">3 Stars</SelectItem>
                    <SelectItem value="2">2 Stars</SelectItem>
                    <SelectItem value="1">1 Star</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-40">
                <Label htmlFor="verified-filter" className="sr-only">
                  Filter by Verification
                </Label>
                <Select
                  value={filterVerified}
                  onValueChange={setFilterVerified}
                >
                  <SelectTrigger id="verified-filter">
                    <SelectValue placeholder="Verification" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="true">Verified</SelectItem>
                    <SelectItem value="false">Unverified</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <p>Loading testimonials...</p>
            </div>
          ) : filteredTestimonials.length === 0 ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-gray-500">
                {searchTerm ||
                filterRating !== "all" ||
                filterVerified !== "all"
                  ? "No testimonials match your filters"
                  : "No testimonials found"}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Trip & Location</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTestimonials.map((testimonial) => (
                    <TableRow key={testimonial.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                            {testimonial.image ? (
                              <Image
                                src={`${BASE_URL}${testimonial.image}` || "/placeholder-user.jpg"}
                                alt={testimonial.name}
                                width={40}
                                height={40}
                                className="object-cover"
                              />
                            ) : (
                              <div className="flex items-center justify-center h-full w-full text-gray-500">
                                <User size={20} />
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="font-medium">
                              {testimonial.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {testimonial.designation}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {testimonial.tripName && (
                          <div className="font-medium">
                            {testimonial.tripName}
                          </div>
                        )}
                        <div className="text-sm text-gray-500">
                          {testimonial.location}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {testimonial.rating}
                          <Star className="h-4 w-4 ml-1 text-yellow-400 fill-yellow-400" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            testimonial.verified ? "default" : "secondary"
                          }
                        >
                          {testimonial.verified ? "Verified" : "Unverified"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() =>
                              router.push(
                                `/admin/testimonials/${testimonial.id}`
                              )
                            }
                            title="View"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() =>
                              handleToggleVerification(testimonial.id)
                            }
                            title={testimonial.verified ? "Unverify" : "Verify"}
                          >
                            {testimonial.verified ? (
                              <XCircle className="h-4 w-4" />
                            ) : (
                              <CheckCircle className="h-4 w-4" />
                            )}
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() =>
                              router.push(
                                `/admin/testimonials/edit/${testimonial.id}`
                              )
                            }
                            title="Edit"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <AlertDialog
                            open={testimonialToDelete === testimonial.id}
                          >
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="icon"
                                className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                                onClick={() =>
                                  setTestimonialToDelete(testimonial.id)
                                }
                                title="Delete"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Delete Testimonial
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete this
                                  testimonial? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel
                                  onClick={() => setTestimonialToDelete(null)}
                                >
                                  Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction
                                  className="bg-red-500 hover:bg-red-600"
                                  onClick={() =>
                                    testimonial.id &&
                                    handleDelete(testimonial.id)
                                  }
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
