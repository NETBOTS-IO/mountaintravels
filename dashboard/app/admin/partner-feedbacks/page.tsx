// dashboard/app/admin/partner-feedbacks/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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

// Icons
import { Eye, Pencil, Plus, Search, Trash2 } from "lucide-react";

// Data utilities
import { getPartnerFeedbacks, deletePartnerFeedback } from "@/lib/data-utils";
import { PartnerFeedback } from "@/lib/types";

export default function PartnerFeedbackListPage() {
  const router = useRouter();
  const [feedbacks, setFeedbacks] = useState<PartnerFeedback[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [feedbackToDelete, setFeedbackToDelete] = useState<string | null>(null);

  const fetchFeedbacks = async () => {
    setIsLoading(true);
    try {
      const result = await getPartnerFeedbacks({
        page,
        limit,
        search: searchTerm,
      });
      setFeedbacks(result.items);
      setTotalPages(result.pages);
    } catch (error) {
      console.error("Error fetching partner feedbacks:", error);
      toast.error("Failed to load partner feedbacks");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, [page]);

  const handleSearch = () => {
    setPage(1);
    fetchFeedbacks();
  };

  const handleDelete = async (id: string) => {
    try {
      const success = await deletePartnerFeedback(id);
      if (success) {
        toast.success("Partner feedback deleted successfully");
        fetchFeedbacks();
      } else {
        throw new Error("Failed to delete partner feedback");
      }
    } catch (error) {
      console.error("Error deleting partner feedback:", error);
      toast.error("Failed to delete partner feedback");
    }
    setFeedbackToDelete(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Partner Feedbacks</h1>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Manage Partner Feedbacks</CardTitle>
            <Button onClick={() => router.push("/admin/partner-feedbacks/add")}>
              <Plus className="mr-2 h-4 w-4" /> Add Feedback
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-6">
            <Input
              placeholder="Search by partner or company"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
            <Button onClick={handleSearch} variant="outline">
              <Search className="h-4 w-4 mr-2" /> Search
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Partner</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead className="text-center">Rating</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-10">
                      Loading...
                    </TableCell>
                  </TableRow>
                )}

                {!isLoading && feedbacks.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-10">
                      No partner feedbacks found
                    </TableCell>
                  </TableRow>
                )}

                {feedbacks.map((feedback) => (
                  <TableRow key={feedback.id}>
                    <TableCell>{feedback.partnerName}</TableCell>
                    <TableCell>{feedback.company}</TableCell>
                    <TableCell className="text-center">{feedback.rating}</TableCell>
                    <TableCell>
                      {feedback.createdAt
                        ? new Date(feedback.createdAt).toLocaleDateString()
                        : "N/A"}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            router.push(`/admin/partner-feedbacks/${feedback.id}`)
                          }
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            router.push(`/admin/partner-feedbacks/edit/${feedback.id}`)
                          }
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="icon">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Delete Partner Feedback
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete this partner feedback?
                                This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(feedback.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
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

          <div className="flex justify-between items-center mt-6">
            <div className="text-sm text-muted-foreground">
              Page {page} of {totalPages}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
