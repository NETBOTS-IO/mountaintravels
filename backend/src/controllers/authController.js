import authService from '../services/authService.js';
import { validationResult } from 'express-validator';

// Admin login
export const login = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { email, password } = req.body;

    // Call auth service
    const result = await authService.login(email, password);

    res.json({
      success: true,
      message: 'Login successful',
      data: result
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message || 'Login failed',
      error: 'LOGIN_FAILED'
    });
  }
};

// Refresh access token
export const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        message: 'Refresh token is required',
        error: 'MISSING_REFRESH_TOKEN'
      });
    }

    const result = await authService.refreshToken(refreshToken);

    res.json({
      success: true,
      message: 'Token refreshed successfully',
      data: result
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message || 'Failed to refresh token',
      error: 'TOKEN_REFRESH_FAILED'
    });
  }
};

// Get current admin profile
export const getProfile = async (req, res) => {
  try {
    const admin = await authService.getAdminById(req.user._id, req.user._id);

    res.json({
      success: true,
      message: 'Profile retrieved successfully',
      data: { user: admin }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to get profile',
      error: 'PROFILE_RETRIEVAL_FAILED'
    });
  }
};

// Update admin profile
export const updateProfile = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { firstName, lastName } = req.body;
    const result = await authService.updateProfile(req.user._id, { firstName, lastName });

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to update profile',
      error: 'PROFILE_UPDATE_FAILED'
    });
  }
};

// Change password
export const changePassword = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { currentPassword, newPassword } = req.body;
    const result = await authService.changePassword(req.user._id, currentPassword, newPassword);

    res.json({
      success: true,
      message: result.message,
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to change password',
      error: 'PASSWORD_CHANGE_FAILED'
    });
  }
};

// Forgot password
export const forgotPassword = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { email } = req.body;
    const result = await authService.forgotPassword(email);

    res.json({
      success: true,
      message: result.message,
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to process forgot password request',
      error: 'FORGOT_PASSWORD_FAILED'
    });
  }
};

// Reset password
export const resetPassword = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { token, newPassword } = req.body;
    const result = await authService.resetPassword(token, newPassword);

    res.json({
      success: true,
      message: result.message,
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to reset password',
      error: 'PASSWORD_RESET_FAILED'
    });
  }
};

// Create new admin (admin only)
export const createAdmin = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const adminData = req.body;
    const result = await authService.createAdmin(adminData, req.user._id);

    res.status(201).json({
      success: true,
      message: 'Admin created successfully',
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to create admin',
      error: 'ADMIN_CREATION_FAILED'
    });
  }
};

// Get all admins (requires userManagement permission)
export const getAllAdmins = async (req, res) => {
  try {
    const admins = await authService.getAllAdmins(req.user._id);

    res.json({
      success: true,
      message: 'Admins retrieved successfully',
      data: { users: admins }
    });
  } catch (error) {
    res.status(403).json({
      success: false,
      message: error.message || 'Failed to get admins',
      error: 'ADMINS_RETRIEVAL_FAILED'
    });
  }
};

// Get admin by ID
export const getAdminById = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await authService.getAdminById(id, req.user._id);

    res.json({
      success: true,
      message: 'Admin retrieved successfully',
      data: { user: admin }
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message || 'Failed to get admin',
      error: 'ADMIN_RETRIEVAL_FAILED'
    });
  }
};

// Update admin permissions (requires userManagement permission)
export const updateAdminPermissions = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { id } = req.params;
    const { permissions } = req.body;
    const result = await authService.updateAdminPermissions(id, permissions, req.user._id);

    res.json({
      success: true,
      message: 'Admin permissions updated successfully',
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to update admin permissions',
      error: 'PERMISSIONS_UPDATE_FAILED'
    });
  }
};

// Update admin status (requires userManagement permission)
export const updateAdminStatus = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { id } = req.params;
    const { isActive } = req.body;
    const result = await authService.updateAdminStatus(id, isActive, req.user._id);

    res.json({
      success: true,
      message: `Admin ${isActive ? 'activated' : 'deactivated'} successfully`,
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to update admin status',
      error: 'ADMIN_STATUS_UPDATE_FAILED'
    });
  }
};

// Delete admin (requires userManagement permission)
export const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await authService.deleteAdmin(id, req.user._id);

    res.json({
      success: true,
      message: result.message,
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to delete admin',
      error: 'ADMIN_DELETION_FAILED'
    });
  }
};

// Get admin permissions
export const getAdminPermissions = async (req, res) => {
  try {
    const admin = await authService.getAdminById(req.user._id, req.user._id);
    const permissions = admin.getPermissions();

    res.json({
      success: true,
      message: 'Permissions retrieved successfully',
      data: { permissions }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to get permissions',
      error: 'PERMISSIONS_RETRIEVAL_FAILED'
    });
  }
};

// Verify permission for a specific resource
export const verifyPermission = async (req, res) => {
  try {
    const { permission } = req.params;
    const hasPermission = await authService.verifyPermission(req.user._id, permission);

    res.json({
      success: true,
      message: 'Permission verification completed',
      data: { 
        hasPermission,
        permission,
        userId: req.user._id
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to verify permission',
      error: 'PERMISSION_VERIFICATION_FAILED'
    });
  }
};

// Logout (client-side token removal)
export const logout = async (req, res) => {
  try {
    // In a stateless JWT system, logout is handled client-side
    // But we can log the logout event for audit purposes
    
    res.json({
      success: true,
      message: 'Logout successful',
      data: { message: 'Please remove tokens from client storage' }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Logout failed',
      error: 'LOGOUT_FAILED'
    });
  }
};

// Email verification endpoints
export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.body;
    const result = await authService.verifyEmail(token);

    res.json({
      success: true,
      message: result.message,
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || 'Email verification failed',
      error: 'EMAIL_VERIFICATION_FAILED'
    });
  }
};

export const resendVerification = async (req, res) => {
  try {
    const { email } = req.body;
    await authService.resendVerification(email);

    res.json({
      success: true,
      message: 'Verification email sent successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to resend verification email',
      error: 'RESEND_VERIFICATION_FAILED'
    });
  }
};

// Backward compatibility - keep original method names but map to admin methods
export const createUser = createAdmin;
export const getAllUsers = getAllAdmins;
export const getUserById = getAdminById;
export const updateUserPermissions = updateAdminPermissions;
export const updateUserStatus = updateAdminStatus;
export const deleteUser = deleteAdmin;
export const getUserPermissions = getAdminPermissions;