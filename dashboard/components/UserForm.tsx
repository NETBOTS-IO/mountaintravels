"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CustomSwitch from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { CreateUserData } from "@/lib/types";
import { useRouter } from "next/navigation";
import { Settings, Shield, User, Mail, UserCheck, Globe, Info } from "lucide-react";

interface CreateUserFormProps {
  formData: CreateUserData;
  setFormData: React.Dispatch<React.SetStateAction<CreateUserData>>;
  onSubmit: (data: CreateUserData) => void;
  isLoading: boolean;
}

const CreateUserForm = ({
  formData,
  setFormData,
  onSubmit,
  isLoading,
}: CreateUserFormProps) => {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const updatePermission = (
    permission: keyof typeof formData.permissions,
    value: boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [permission]: value,
      },
    }));
  };

  // Validation helpers
  const isFormValid = () => {
    return (
      formData.email.trim() !== "" &&
      formData.firstName.trim() !== "" &&
      formData.lastName.trim() !== "" &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    );
  };

  const getActivePermissionsCount = () => {
    return Object.values(formData.permissions).filter(Boolean).length;
  };

  // Permission groups with icons and descriptions
  const permissionGroups = [
    {
      title: "Content Management",
      icon: <Globe className="h-4 w-4" />,
      description: "Manage tours, blogs, and media content",
      permissions: [
        {
          key: "tours",
          label: "Tours Management",
          description: "Create, edit, and manage tour packages and itineraries",
        },
        {
          key: "blogs",
          label: "Blog Management",
          description: "Write, edit, and publish blog posts and articles",
        },
        {
          key: "gallery",
          label: "Gallery Management",
          description: "Upload and manage images in the gallery section",
        },
        {
          key: "testimonials",
          label: "Testimonials Management",
          description: "Manage customer testimonials and reviews",
        },
      ],
    },
    {
      title: "Customer Relations",
      icon: <UserCheck className="h-4 w-4" />,
      description: "Handle customer feedback and inquiries",
      permissions: [
        {
          key: "partnerFeedbacks",
          label: "Partner Feedbacks",
          description: "View and respond to partner feedback and suggestions",
        },
        {
          key: "inquiries",
          label: "Customer Inquiries",
          description: "Handle customer questions, requests, and support tickets",
        },
      ],
    },
    {
      title: "System Administration",
      icon: <Settings className="h-4 w-4" />,
      description: "System and user management capabilities",
      permissions: [
        {
          key: "userManagement",
          label: "User Management",
          description: "Create, edit, and manage admin accounts and permissions",
        },
        {
          key: "systemSettings",
          label: "System Settings",
          description: "Configure application settings and system preferences",
        },
      ],
    },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-2">
          {/* Important Notice */}
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              All new accounts are created as Admin users. A temporary password will be generated 
              and sent via email. The user must verify their email and change their password on first login.
            </AlertDescription>
          </Alert>

          {/* Basic Information Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Admin Information</span>
              </CardTitle>
              <CardDescription>
                Enter the admin's personal details and account information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">
                    First Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        firstName: e.target.value,
                      }))
                    }
                    placeholder="Enter first name"
                    required
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">
                    Last Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        lastName: e.target.value,
                      }))
                    }
                    placeholder="Enter last name"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">
                  Email Address <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    placeholder="admin@example.com"
                    className="pl-10"
                    required
                    disabled={isLoading}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  A welcome email with temporary password will be sent to this address
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Permissions Cards */}
          <div className="space-y-2">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Admin Permissions</h3>
              <p className="text-sm text-gray-600 mt-1">
                Configure what this admin can access and modify in the system. All admins have basic dashboard access.
              </p>
            </div>

            {permissionGroups.map((group, groupIndex) => (
              <Card key={groupIndex}>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center space-x-2 text-base">
                    {group.icon}
                    <span>{group.title}</span>
                  </CardTitle>
                  <CardDescription>{group.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {group.permissions.map(({ key, label, description }) => (
                      <div
                        key={key}
                        className="flex items-start space-x-4 p-2 rounded-lg border bg-gray-50/50 hover:bg-gray-50 transition-colors"
                      >
                        <CustomSwitch
                          id={key}
                          checked={
                            formData.permissions[
                              key as keyof typeof formData.permissions
                            ]
                          }
                          onChange={(checked) =>
                            updatePermission(
                              key as keyof typeof formData.permissions,
                              checked
                            )
                          }
                          className="mt-1"
                          disabled={isLoading}
                        />
                        <div className="flex-1">
                          <Label
                            htmlFor={key}
                            className="text-sm font-medium"
                          >
                            {label}
                          </Label>
                          <p className="text-xs text-gray-600 mt-1">
                            {description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Summary Sidebar */}
        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle className="text-base">Admin Summary</CardTitle>
              <CardDescription>Review admin details before creating</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* User Info */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Name:</span>
                  <span className="font-medium text-right">
                    {formData.firstName || formData.lastName
                      ? `${formData.firstName} ${formData.lastName}`.trim()
                      : "Not set"}
                  </span>
                </div>
                <div className="flex justify-between items-start text-sm">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-medium text-right break-all max-w-32">
                    {formData.email || "Not set"}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Role:</span>
                  <Badge variant="default" className="flex items-center space-x-1">
                    <Shield className="h-3 w-3" />
                    <span>Admin</span>
                  </Badge>
                </div>
              </div>

              <Separator />

              {/* Permissions Summary */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm font-medium text-gray-900">
                    Permissions
                  </p>
                  <Badge variant="outline" className="text-xs">
                    {getActivePermissionsCount()}/8
                  </Badge>
                </div>
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {Object.entries(formData.permissions)
                    .filter(([, value]) => value)
                    .map(([key]) => (
                      <div
                        key={key}
                        className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded flex items-center justify-between"
                      >
                        <span>{key.replace(/([A-Z])/g, " $1").trim()}</span>
                        <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                      </div>
                    ))}
                  {getActivePermissionsCount() === 0 && (
                    <p className="text-xs text-gray-500 italic">
                      No permissions selected
                    </p>
                  )}
                </div>
              </div>
              <Separator />
              {/* Action Buttons */}
              <div className="space-y-2">
                <Button 
                  type="submit" 
                  disabled={isLoading || !isFormValid()} 
                  className="w-full"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Creating Admin...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Shield className="h-4 w-4" />
                      <span>Create Admin</span>
                    </div>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  className="w-full"
                  disabled={isLoading}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  );
};

export default CreateUserForm;