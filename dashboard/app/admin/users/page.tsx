"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore, apiClient } from "@/store/authStore";
import { toast } from "react-hot-toast";
import { Plus, User2, Search, Filter, AlertCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { User } from "@/lib/types";
import UserCard from "./UserCard";
import { useRouter } from "next/navigation";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [verificationFilter, setVerificationFilter] = useState<string>("all");

  const { isAdmin, user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [users, searchQuery, statusFilter, verificationFilter]);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.get<{
        success: boolean;
        data: { users: User[] };
        message?: string;
      }>("/api/auth/users");
      
      const data = response.data;

      if (data.success) {
        setUsers(data.data.users);
      } else {
        toast.error(data.message || "Failed to fetch users");
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to fetch users";
      toast.error(errorMessage);
      console.error("Error fetching users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterUsers = () => {
    let filtered = users;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (user) =>
          user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      const isActive = statusFilter === "active";
      filtered = filtered.filter((user) => user.isActive === isActive);
    }

    // Email verification filter
    if (verificationFilter !== "all") {
      const isVerified = verificationFilter === "verified";
      filtered = filtered.filter((user) => user.emailVerified === isVerified);
    }

    setFilteredUsers(filtered);
  };

  const handleUpdatePermissions = async (userId: string, permissions: any) => {
    try {
      setIsUpdating(true);
      const response = await apiClient.put<{
        success: boolean;
        message?: string;
      }>(`/api/auth/users/${userId}/permissions`, { permissions });
      
      const data = response.data;

      if (data.success) {
        toast.success("Admin permissions updated successfully");
        await fetchUsers(); // Refresh the users list
      } else {
        toast.error(data.message || "Failed to update permissions");
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to update permissions";
      toast.error(errorMessage);
      console.error("Error updating permissions:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleUpdateStatus = async (userId: string, isActive: boolean) => {
    try {
      setIsUpdating(true);
      const response = await apiClient.put<{
        success: boolean;
        message?: string;
      }>(`/api/auth/users/${userId}/status`, { isActive });
      
      const data = response.data;

      if (data.success) {
        toast.success(
          `Admin ${isActive ? "activated" : "deactivated"} successfully`
        );
        await fetchUsers(); // Refresh the users list
      } else {
        toast.error(data.message || "Failed to update admin status");
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to update admin status";
      toast.error(errorMessage);
      console.error("Error updating admin status:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      setIsUpdating(true);
      const response = await apiClient.delete<{
        success: boolean;
        message?: string;
      }>(`/api/auth/users/${userId}`);
      
      const data = response.data;

      if (data.success) {
        toast.success("Admin deleted successfully");
        await fetchUsers(); // Refresh the users list
      } else {
        toast.error(data.message || "Failed to delete admin");
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to delete admin";
      toast.error(errorMessage);
      console.error("Error deleting admin:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const clearFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setVerificationFilter("all");
  };

  const getStats = () => {
    const active = users.filter(u => u.isActive).length;
    const inactive = users.filter(u => !u.isActive).length;
    const verified = users.filter(u => u.emailVerified).length;
    const unverified = users.filter(u => !u.emailVerified).length;
    
    return { active, inactive, verified, unverified };
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admins...</p>
        </div>
      </div>
    );
  }

  const stats = getStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Management</h1>
        </div>
        {isAdmin() && (
          <Button 
            onClick={() => router.push("users/create-user")} 
            className="flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add Admin</span>
          </Button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{stats.active}</div>
          <div className="text-sm text-gray-600">Active</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-red-600">{stats.inactive}</div>
          <div className="text-sm text-gray-600">Inactive</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{stats.verified}</div>
          <div className="text-sm text-gray-600">Verified</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-600">{stats.unverified}</div>
          <div className="text-sm text-gray-600">Unverified</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 p-4 bg-gray-50 rounded-lg">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>

          <Select value={verificationFilter} onValueChange={setVerificationFilter}>
            <SelectTrigger className="w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Verification</SelectItem>
              <SelectItem value="verified">Verified</SelectItem>
              <SelectItem value="unverified">Unverified</SelectItem>
            </SelectContent>
          </Select>

          {(searchQuery || statusFilter !== "all" || verificationFilter !== "all") && (
            <Button variant="outline" onClick={clearFilters} size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* Unverified users warning */}
      {stats.unverified > 0 && (
        <div className="flex items-center gap-3 p-4 bg-orange-50 border border-orange-200 rounded-lg">
          <AlertCircle className="h-5 w-5 text-orange-600 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-orange-800">
              {stats.unverified} admin(s) have unverified email addresses
            </p>
            <p className="text-xs text-orange-700 mt-1">
              Unverified admins may have limited functionality. They should check their email for verification instructions.
            </p>
          </div>
        </div>
      )}

      {/* Users List */}
      <div className="grid gap-6">
        {filteredUsers.map((userItem) => (
          <UserCard
            key={userItem._id}
            user={userItem}
            onUpdatePermissions={handleUpdatePermissions}
            onUpdateStatus={handleUpdateStatus}
            onDelete={handleDeleteUser}
            isUpdating={isUpdating}
            isAdmin={isAdmin()}
            currentUserId={user?.id}
          />
        ))}
      </div>

      {/* Empty States */}
      {filteredUsers.length === 0 && users.length > 0 && (
        <div className="text-center py-12">
          <User2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No admins match your filters
          </h3>
          <p className="text-gray-500 mb-4">
            Try adjusting your search criteria or clearing the filters.
          </p>
          <Button variant="outline" onClick={clearFilters}>
            Clear Filters
          </Button>
        </div>
      )}

      {users.length === 0 && (
        <div className="text-center py-12">
          <User2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No admins found
          </h3>
          <p className="text-gray-500 mb-4">
            Get started by creating your first admin account.
          </p>
          {isAdmin() && (
            <Button onClick={() => router.push("/dashboard/users/create-user")}>
              <Plus className="h-4 w-4 mr-2" />
              Create First Admin
            </Button>
          )}
        </div>
      )}
    </div>
  );
}