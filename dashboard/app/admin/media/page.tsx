"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Edit, Trash, Eye, Search, Film, Image } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { getGalleryPhotos, deleteGalleryPhoto } from "@/lib/data-utils";
import { type GalleryPhoto } from "@/lib/types";
import { toast } from "react-hot-toast";
import { BASE_URL } from "@/Var";
import { Pagination } from "@/components/ui/pagination";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

export default function MediaManagement() {
  const [items, setItems] = useState<GalleryPhoto[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeType, setActiveType] = useState("All");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const perPage = 10;
  const router = useRouter();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    const success = await deleteGalleryPhoto(deleteId);
    setIsDeleting(false);
    if (success) {
      setItems((prev) => prev.filter((p) => p.id !== deleteId));
      toast.success("Media item deleted successfully");
    } else {
      toast.error("Failed to delete media item");
    }
    setDeleteId(null);
  };

  useEffect(() => {
    setIsLoading(true);
    getGalleryPhotos({
      page,
      limit: perPage,
      search: searchTerm,
      type: activeType === "All" ? "" : (activeType || "").toLowerCase(),
    }).then((result: any) => {
      if (Array.isArray(result)) {
        setItems(result);
        setTotalPages(1);
      } else {
        setItems(result.photos || []);
        setTotalPages(result.pages || 1);
      }
      setIsLoading(false);
    });
  }, [page, searchTerm, activeType]);

  return (
    <div className="container">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Media Library</h1>
        <Button
          className="bg-primary hover:bg-primary-dark text-white"
          onClick={() => router.push("/admin/media/add")}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New Media
        </Button>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="flex items-center space-x-2 w-full md:max-w-sm">
          <Input
            placeholder="Search media..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
            className="flex-1"
          />
          <Search className="h-5 w-5 text-gray-400" />
        </div>

        <div className="flex items-center space-x-2 bg-gray-100 p-1.5 rounded-lg border">
          {["All", "Image", "Video"].map((type) => (
            <button
              key={type}
              onClick={() => {
                setActiveType(type);
                setPage(1);
              }}
              className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${
                activeType === type
                  ? "bg-white text-gray-800 shadow-sm border border-gray-200"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {type}s
            </button>
          ))}
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Preview</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            [...Array(5)].map((_, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Skeleton className="h-10 w-16 rounded-md" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-[150px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-[80px] rounded-full" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-[100px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-[100px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-[80px]" />
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Skeleton className="h-9 w-[70px] rounded-md" />
                    <Skeleton className="h-9 w-[70px] rounded-md" />
                    <Skeleton className="h-9 w-[80px] rounded-md" />
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : items.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                No media items found.
              </TableCell>
            </TableRow>
          ) : (
            items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  {item.src && item.src.length > 0 ? (
                    item.type === "video" ? (
                      <div className="relative w-16 h-10 border rounded-md overflow-hidden bg-black flex items-center justify-center">
                        <video
                          src={`${BASE_URL}/api/media/stream/${item.src[0].split("/").pop()}`}
                          className="w-full h-full object-cover"
                          muted
                          controls={false}
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                          <Film className="h-4 w-4 text-white drop-shadow-md" />
                        </div>
                      </div>
                    ) : (
                      <img
                        src={
                          item.src[0]?.startsWith("http")
                            ? item.src[0]
                            : `${BASE_URL}${item.src[0]}`
                        }
                        alt={item.title}
                        className="w-16 h-10 object-cover rounded-md border"
                      />
                    )
                  ) : (
                    <span className="text-gray-400">No Source</span>
                  )}
                </TableCell>
                <TableCell className="font-semibold">{item.title}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      item.type === "video"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {item.type === "video" ? (
                      <Film className="w-3 h-3" />
                    ) : (
                      <Image className="w-3 h-3" />
                    )}
                    {item.type === "video" ? "Video" : "Image"}
                  </span>
                </TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.location || "-"}</TableCell>
                <TableCell>{item.date || "-"}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="mr-2"
                      onClick={() => router.push(`/admin/media/${item.id}`)}
                    >
                      <Eye className="h-4 w-4 mr-1" /> View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mr-2"
                      onClick={() =>
                        router.push(`/admin/media/edit/${item.id}`)
                      }
                    >
                      <Edit className="h-4 w-4 mr-1" /> Edit
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => setDeleteId(item.id)}
                        >
                          <Trash className="h-4 w-4 mr-1" /> Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Media Item</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this media item?
                            This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel
                            onClick={() => setDeleteId(null)}
                            disabled={isDeleting}
                          >
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={handleDelete}
                            disabled={isDeleting}
                          >
                            {isDeleting ? "Deleting..." : "Delete"}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {totalPages > 1 && (
        <Pagination
          className="mt-2"
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}
