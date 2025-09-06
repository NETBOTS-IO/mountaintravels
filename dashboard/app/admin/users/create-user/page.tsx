"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShieldPlus, Shield } from "lucide-react";
import type { CreateUserData } from "@/lib/types";
import { toast } from "react-hot-toast";
import CreateUserForm from "@/components/UserForm";
import { apiClient, useAuthStore } from "@/store/authStore";

const CreateUserPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { isAdmin, hasPermission } = useAuthStore();

  // Check permissions
  if (!isAdmin() && !hasPermission("userManagement")) {
    router.push("/admin/users");
    return null;
  }

  const [formData, setFormData] = useState<CreateUserData>({
    email: "",
    firstName: "",
    lastName: "",
    role: "admin",
    permissions: {
      tours: false,
      blogs: false,
      gallery: false,
      testimonials: false,
      partnerFeedbacks: false,
      inquiries: false,
      userManagement: false,
      systemSettings: false,
    },
  });

  const handleSubmit = async (data: CreateUserData) => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      // Validate required fields
      if (
        !data.email.trim() ||
        !data.firstName.trim() ||
        !data.lastName.trim()
      ) {
        toast.error("Please fill in all required fields");
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        toast.error("Please enter a valid email address");
        return;
      }

      // Prepare data for backend (remove role since backend assigns 'admin' automatically)
      const { role, ...adminData } = data;

      const response = await apiClient.post("/api/auth/users", adminData);

      if (response.status === 201 || response.status === 200) {
        toast.success(
          "Admin created successfully! Welcome email with temporary password has been sent.",
          { duration: 5000 }
        );
        router.push("/dashboard/users");
      } else {
        throw new Error(response.statusText || "Failed to create admin");
      }
    } catch (error: any) {
      console.error("Error creating admin:", error);

      // Handle specific error messages from backend
      if (error.response?.status === 400) {
        if (error.response.data?.message?.includes("Email already exists")) {
          toast.error("An admin with this email address already exists");
        } else if (
          error.response.data?.message?.includes("Validation failed")
        ) {
          toast.error("Please check all required fields and try again");
        } else {
          toast.error(
            error.response.data?.message || "Invalid admin data provided"
          );
        }
      } else if (error.response?.status === 401) {
        toast.error("Authentication failed. Please login again.");
        router.push("/login");
      } else if (error.response?.status === 403) {
        toast.error("You don't have permission to create admin accounts");
      } else if (error.response?.status === 409) {
        toast.error("An admin with this email already exists");
      } else if (error.response?.status >= 500) {
        toast.error("Server error occurred. Please try again later.");
      } else {
        toast.error(
          error.response?.data?.message || "Failed to create admin account"
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    // Check if form has unsaved changes
    const hasChanges =
      formData.email.trim() !== "" ||
      formData.firstName.trim() !== "" ||
      formData.lastName.trim() !== "" ||
      Object.values(formData.permissions).some(Boolean);

    if (hasChanges) {
      const confirmLeave = window.confirm(
        "You have unsaved changes. Are you sure you want to leave?"
      );
      if (!confirmLeave) return;
    }

    router.back();
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCancel}
            className="flex items-center space-x-2"
            disabled={isLoading}
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </Button>
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 flex items-center space-x-2">
            <ShieldPlus className="h-6 w-6" />
            <span>Create New Admin</span>
          </h1>
        </div>

        {/* Quick Info */}
        <div className="hidden sm:flex items-center space-x-3 text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <Shield className="h-4 w-4" />
            <span>Admin Role Only</span>
          </div>
        </div>
      </div>

      {/* Additional Info Banner */}
      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start space-x-3">
          <Shield className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-medium text-blue-900">
              Admin Account Creation Process
            </h3>
            <div className="text-sm text-blue-700 mt-1 space-y-1">
              <p>• All new accounts are created with Admin privileges</p>
              <p>
                • Welcome email with temporary password is sent automatically
              </p>
              <p>• User must verify email and change password on first login</p>
              <p>
                • Individual permissions can be configured to restrict access
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <CreateUserForm
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  );
};

export default CreateUserPage;
