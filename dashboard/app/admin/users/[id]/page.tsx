"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  User2,
  Mail,
  Shield,
  Lock,
  Edit,
  CheckCircle,
  XCircle,
  AlertTriangle,
  MailCheck,
  Clock,
} from "lucide-react";
import { useAuthStore, apiClient } from "@/store/authStore";
import { toast } from "react-hot-toast";
import { User } from "@/lib/types";
import { useParams } from "next/navigation";

const AdminProfilePage = () => {
  const { updateProfile, changePassword, isAdmin, hasAllPermissions } =
    useAuthStore();
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const { id } = useParams();

  // Profile form data
  const [profileForm, setProfileForm] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
  });

  // Password form data
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleProfileUpdate = async () => {
    if (!profileForm.firstName.trim() || !profileForm.lastName.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsUpdating(true);
    const success = await updateProfile(profileForm);

    if (success) {
      toast.success("Profile updated successfully");
      setShowEditDialog(false);
    } else {
      toast.error("Failed to update profile");
    }
    setIsUpdating(false);
  };

  const getUserById = async (id: string) => {
    try {
          setIsLoading(true);
          const { data } = await apiClient.get<{
            success: boolean;
            data: { user: User };
            message?: string;
          }>(`/api/auth/users/${id}`);
    
          if (data.success) {
            setUser(data.data.user);
            setProfileForm({
              firstName: data.data.user.firstName,
              lastName: data.data.user.lastName,
            });
          } else {
            toast.error(data.message || "Failed to fetch user");
          }
        } catch (error: any) {
          const errorMessage = error.response?.data?.message || "Failed to fetch user";
          toast.error(errorMessage);
          console.error("Error fetching user:", error);
        } finally {
          setIsLoading(false);
        }
  };

  const handlePasswordChange = async () => {
    if (
      !passwordForm.currentPassword ||
      !passwordForm.newPassword ||
      !passwordForm.confirmPassword
    ) {
      toast.error("Please fill in all password fields");
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      toast.error("New password must be at least 8 characters long");
      return;
    }

    setIsUpdating(true);
    const success = await changePassword(
      passwordForm.currentPassword,
      passwordForm.newPassword
    );

    if (success) {
      toast.success("Password changed successfully");
      setShowPasswordDialog(false);
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } else {
      toast.error("Failed to change password");
    }
    setIsUpdating(false);
  };

  const resendVerificationEmail = async () => {
    if (!user?.email) return;

    try {
      setIsUpdating(true);
      const response = await apiClient.post<any>(
        "/api/auth/resend-verification",
        {
          email: user.email,
        }
      );

      if (response.data.success) {
        toast.success("Verification email sent successfully");
      } else {
        toast.error("Failed to send verification email");
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to send verification email"
      );
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    if (id) getUserById(id as string);
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading user...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-gray-600">No user found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Profile</h1>
          <p className="text-gray-600 mt-2">
            Manage your account settings and preferences
          </p>
        </div>
      </div>

      {/* Email Verification Alert */}
      {!user.emailVerified && (
        <Alert className="border-orange-200 bg-orange-50">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800">
            <div className="flex items-center justify-between">
              <span>
                Your email address is not verified. Please check your inbox for
                verification instructions.
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={resendVerificationEmail}
                disabled={isUpdating}
                className="ml-4"
              >
                Resend Email
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Profile Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <User2 className="h-5 w-5" />
                    <span>Profile Information</span>
                  </CardTitle>
                  <CardDescription>
                    Your basic account information and details
                  </CardDescription>
                </div>
                <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle className="ml-2 mb-2">
                        Edit Profile
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 mx-2">
                      <div className="space-y-1">
                        <Label htmlFor="edit-firstName">First Name</Label>
                        <Input
                          id="edit-firstName"
                          value={profileForm.firstName}
                          onChange={(e) =>
                            setProfileForm((prev) => ({
                              ...prev,
                              firstName: e.target.value,
                            }))
                          }
                          placeholder="Enter first name"
                          disabled={isUpdating}
                        />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="edit-lastName">Last Name</Label>
                        <Input
                          id="edit-lastName"
                          value={profileForm.lastName}
                          onChange={(e) =>
                            setProfileForm((prev) => ({
                              ...prev,
                              lastName: e.target.value,
                            }))
                          }
                          placeholder="Enter last name"
                          disabled={isUpdating}
                        />
                      </div>
                      <div className="flex space-x-2 pt-4">
                        <Button
                          onClick={handleProfileUpdate}
                          disabled={isUpdating}
                          className="flex-1"
                        >
                          {isUpdating ? "Saving..." : "Save Changes"}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setShowEditDialog(false)}
                          className="flex-1"
                          disabled={isUpdating}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600">
                    Full Name
                  </Label>
                  <p className="text-lg font-medium">{user?.fullName}</p>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-600">
                  Email Address
                </Label>
                <div className="flex items-center space-x-2 mt-1">
                  {/* <Mail className="h-4 w-4 text-gray-400" /> */}
                  <p className="text-lg font-medium">{user?.email}</p>
                  {user?.emailVerified ? (
                    <MailCheck className="h-4 w-4 text-green-500" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-orange-500" />
                  )}
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-600">
                  Account Status
                </Label>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge variant={user?.isActive ? "default" : "destructive"}>
                    {user?.isActive ? "Active" : "Inactive"}
                  </Badge>
                  <Badge variant="default">
                    <Shield className="h-3 w-3 mr-1" />
                    {isAdmin() ? "Admin" : "User"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lock className="h-5 w-5" />
                <span>Security Settings</span>
              </CardTitle>
              <CardDescription>
                Manage your account security and authentication
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">Password</p>
                  <p className="text-sm text-gray-600">
                    Last changed:{" "}
                    {user?.updatedAt
                      ? new Date(user.updatedAt).toLocaleDateString()
                      : "Unknown"}
                  </p>
                </div>
                <Dialog
                  open={showPasswordDialog}
                  onOpenChange={setShowPasswordDialog}
                >
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <Lock className="h-4 w-4 mr-2" />
                      Change Password
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle className="ml-2 mb-2">
                        Change Password
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 mx-2">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">
                          Current Password
                        </Label>
                        <Input
                          id="current-password"
                          type="password"
                          value={passwordForm.currentPassword}
                          onChange={(e) =>
                            setPasswordForm((prev) => ({
                              ...prev,
                              currentPassword: e.target.value,
                            }))
                          }
                          placeholder="Enter current password"
                          disabled={isUpdating}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input
                          id="new-password"
                          type="password"
                          value={passwordForm.newPassword}
                          onChange={(e) =>
                            setPasswordForm((prev) => ({
                              ...prev,
                              newPassword: e.target.value,
                            }))
                          }
                          placeholder="Enter new password (min 8 characters)"
                          disabled={isUpdating}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">
                          Confirm New Password
                        </Label>
                        <Input
                          id="confirm-password"
                          type="password"
                          value={passwordForm.confirmPassword}
                          onChange={(e) =>
                            setPasswordForm((prev) => ({
                              ...prev,
                              confirmPassword: e.target.value,
                            }))
                          }
                          placeholder="Confirm new password"
                          disabled={isUpdating}
                        />
                      </div>
                      <div className="flex space-x-2 pt-4">
                        <Button
                          onClick={handlePasswordChange}
                          disabled={isUpdating}
                          className="flex-1"
                        >
                          {isUpdating ? "Changing..." : "Change Password"}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setShowPasswordDialog(false);
                            setPasswordForm({
                              currentPassword: "",
                              newPassword: "",
                              confirmPassword: "",
                            });
                          }}
                          className="flex-1"
                          disabled={isUpdating}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>

          {/* Permissions Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Your Permissions</span>
              </CardTitle>
              <CardDescription>
                Current access levels and capabilities assigned to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {Object.entries(user.permissions).map(([key, value]) => (
                  <div
                    key={key}
                    className={`flex items-center space-x-2 p-3 rounded-lg border ${
                      value
                        ? "bg-green-50 border-green-200"
                        : "bg-gray-50 border-gray-200"
                    }`}
                  >
                    {value ? (
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-4 w-4 text-gray-400 flex-shrink-0" />
                    )}
                    <span
                      className={`text-sm capitalize ${
                        value ? "text-green-700" : "text-gray-600"
                      }`}
                    >
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </span>
                  </div>
                ))}
              </div>
              {!hasAllPermissions && (
              <div className="mt-4 text-sm text-gray-500">
                Contact your administrator if you need additional permissions.
              </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Account Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Account Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <User2 className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-medium text-lg">{user?.fullName}</h3>
                <p className="text-sm text-gray-600">{user?.email}</p>
                <div className="flex justify-center space-x-2 mt-2">
                  <Badge variant="default">
                    <Shield className="h-3 w-3 mr-1" />
                    Admin
                  </Badge>
                  {user.emailVerified ? (
                    <Badge variant="default" className="bg-green-600">
                      <MailCheck className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  ) : (
                    <Badge variant="destructive">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      Unverified
                    </Badge>
                  )}
                </div>
              </div>

              <Separator />

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Account Status:</span>
                  <span
                    className={`font-medium ${
                      user.isActive ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {user.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Member Since:</span>
                  <span className="font-medium">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                </div>
                {user.lastLogin && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Last Login:</span>
                    <span className="font-medium">
                      {new Date(user.lastLogin).toLocaleDateString()}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Active Permissions:</span>
                  <span className="font-medium">
                    {Object.values(user.permissions).filter(Boolean).length}/8
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => setShowEditDialog(true)}
                disabled={isUpdating}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => setShowPasswordDialog(true)}
                disabled={isUpdating}
              >
                <Lock className="h-4 w-4 mr-2" />
                Change Password
              </Button>
              {!user?.emailVerified && (
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={resendVerificationEmail}
                  disabled={isUpdating}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Resend Verification
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Activity Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>Recent Activity</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Profile Updated:</span>
                  <span className="text-gray-900">
                    {new Date(user.updatedAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Account Created:</span>
                  <span className="text-gray-900">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                </div>
                {user?.lastLogin && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Last Login:</span>
                    <span className="text-gray-900">
                      {new Date(user.lastLogin).toLocaleString()}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminProfilePage;
