"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import CustomSwitch  from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Edit, 
  Trash2, 
  User2, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Mail,
  MailCheck 
} from "lucide-react";
import type { User } from "@/lib/types";

interface UserCardProps {
  user: User;
  onUpdatePermissions: (userId: string, permissions: any) => void;
  onUpdateStatus: (userId: string, isActive: boolean) => void;
  onDelete: (userId: string) => void;
  isUpdating: boolean;
  isAdmin: boolean;
  currentUserId?: string;
}

const UserCard = ({
  user,
  onUpdatePermissions,
  onUpdateStatus,
  onDelete,
  isUpdating,
  isAdmin,
  currentUserId,
}: UserCardProps) => {
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [editingPermissions, setEditingPermissions] = useState(
    user.permissions
  );

  const handleSavePermissions = () => {
    onUpdatePermissions(user._id, editingPermissions);
    setShowEditDialog(false);
  };

  const handleDeleteUser = () => {
    onDelete(user._id);
    setShowDeleteDialog(false);
  };

  const updatePermission = (
    permission: keyof typeof editingPermissions,
    value: boolean
  ) => {
    setEditingPermissions((prev) => ({
      ...prev,
      [permission]: value,
    }));
  };

  const formatPermissionLabel = (key: string) => {
    return key.replace(/([A-Z])/g, " $1").trim();
  };

  const getStatusBadgeVariant = (isActive: boolean) => {
    return isActive ? "default" : "destructive";
  };

  const isCurrentUser = user._id === currentUserId;
  // const canModify = isAdmin && !isCurrentUser;

  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
              <User2 className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <CardTitle>{user.fullName}</CardTitle>
                {isCurrentUser && (
                  <Badge variant="outline" className="text-xs">You</Badge>
                )}
              </div>
              <div className="flex items-center space-x-2 mt-1">
                <p className="text-sm text-gray-600">{user.email}</p>
                {user.emailVerified ? (
                  <MailCheck className="h-4 w-4 text-green-500">Email verified</MailCheck>
                ) : (
                  <Mail className="h-4 w-4 text-gray-400">Email not verified</Mail>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="default">
              {isAdmin ? "Admin" : "User"}
            </Badge>
            <Badge variant={getStatusBadgeVariant(user.isActive)}>
              {user.isActive ? "Active" : "Inactive"}
            </Badge>
            {!user.emailVerified && (
              <Badge variant="outline" className="text-orange-600">
                Unverified
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium mb-2 block">Permissions</Label>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(user.permissions).map(([key, value]) => (
                <div key={key} className="flex items-center space-x-2">
                  {value ? (
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  ) : (
                    <XCircle className="h-4 w-4 text-gray-400 flex-shrink-0" />
                  )}
                  <span className="text-sm text-gray-600 capitalize">
                    {formatPermissionLabel(key)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t">
            <div className="text-sm text-gray-500">
              <div>Created: {new Date(user.createdAt).toLocaleDateString()} | {new Date(user.createdAt).toLocaleTimeString()}</div>
              {user.lastLogin && (
                <div>Last login: {new Date(user.lastLogin).toLocaleDateString()} | {new Date(user.lastLogin).toLocaleTimeString()}</div>
              )}
            </div>

            {/* {canModify && ( */}
              <div className="flex items-center space-x-2">
                {/* Edit Dialog */}
                <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" disabled={isUpdating}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Edit Admin Permissions</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium mb-3 block">
                          Permissions for {user.fullName}
                        </Label>
                        <div className="space-y-3">
                          {Object.entries(editingPermissions).map(
                            ([key, value]) => (
                              <div
                                key={key}
                                className="flex items-center justify-between p-2 border rounded-lg"
                              >
                                <Label
                                  htmlFor={`edit-${key}`}
                                  className="text-sm capitalize cursor-pointer flex-1"
                                >
                                  {formatPermissionLabel(key)}
                                </Label>
                                <CustomSwitch
                                  id={`edit-${key}`}
                                  checked={value}
                                  onChange={(checked) =>
                                    updatePermission(
                                      key as keyof typeof editingPermissions,
                                      checked
                                    )
                                  }
                                />
                              </div>
                            )
                          )}
                        </div>
                      </div>

                      <div className="flex space-x-2 pt-4">
                        <Button
                          onClick={handleSavePermissions}
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

                {/* Status Toggle Button */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onUpdateStatus(user._id, !user.isActive)}
                  disabled={isUpdating}
                >
                  {user.isActive ? "Deactivate" : "Activate"}
                </Button>

                {/* Delete Dialog */}
                <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                  <DialogTrigger asChild>
                    <Button
                      variant="destructive"
                      size="sm"
                      disabled={isUpdating}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle className="flex items-center space-x-2">
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                        <span>Delete Admin</span>
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <p className="text-sm text-gray-600">
                        Are you sure you want to delete <strong>{user.fullName}</strong>? 
                        This action cannot be undone and will permanently remove the admin 
                        and all associated data.
                      </p>
                      <div className="flex space-x-2 pt-4">
                        <Button
                          variant="destructive"
                          onClick={handleDeleteUser}
                          disabled={isUpdating}
                          className="flex-1"
                        >
                          {isUpdating ? "Deleting..." : "Delete Admin"}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setShowDeleteDialog(false)}
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
            {/* )} */}
            
            {/* {isCurrentUser && (
              <div className="text-xs text-gray-500 italic">
                Cannot modify your own account
              </div>
            )} */}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserCard;