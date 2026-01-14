import express from 'express';
import {
  login,
  refreshToken,
  getProfile,
  updateProfile,
  changePassword,
  forgotPassword,
  resetPassword,
  createAdmin,
  getAllAdmins,
  getAdminById,
  updateAdminPermissions,
  updateAdminStatus,
  deleteAdmin,
  getAdminPermissions,
  verifyPermission,
  logout,
  verifyEmail,
  resendVerification,
  // Backward compatibility aliases
  createUser,
  getAllUsers,
  getUserById,
  updateUserPermissions,
  updateUserStatus,
  deleteUser,
  getUserPermissions
} from '../controllers/authController.js';
import {
  authenticateToken,
  requireAdmin,
  requirePermission,
  authRateLimit,
  requireAllPermissions,
  requireAnyPermission,
  requireUserManagement
} from '../middlewares/auth.js';

import {
  loginValidation,
  profileUpdateValidation,
  passwordChangeValidation,
  forgotPasswordValidation,
  resetPasswordValidation,
  createAdminValidation,
  updatePermissionsValidation,
  updateStatusValidation,
  emailVerificationValidation,
  resendVerificationValidation
} from '../middlewares/validation.js';

const router = express.Router();

// Public routes (no authentication required)
router.post('/login', loginValidation,login);
router.post('/forgot-password', forgotPasswordValidation, authRateLimit, forgotPassword);
router.post('/reset-password', resetPasswordValidation, resetPassword);
router.post('/verify-email', emailVerificationValidation, verifyEmail);
router.post('/resend-verification', resendVerificationValidation, authRateLimit, resendVerification);

// Protected routes (authentication required)
router.use(authenticateToken); // Apply authentication middleware to all routes below

// Admin profile routes
router.get('/profile', getProfile);
router.put('/profile', profileUpdateValidation, updateProfile);
router.put('/change-password', passwordChangeValidation, changePassword);
router.get('/permissions', getAdminPermissions);
router.post('/logout', logout);

// Token refresh
router.post('/refresh-token', refreshToken);

// Permission verification
router.get('/verify-permission/:permission', verifyPermission);

// Admin management routes (requires userManagement permission)
router.post('/admins', createAdminValidation, requireUserManagement, createAdmin);
router.get('/admins', requireUserManagement, getAllAdmins);
router.get('/admins/:id', requireUserManagement, getAdminById);
router.put('/admins/:id/permissions', updatePermissionsValidation, requireUserManagement, updateAdminPermissions);
router.put('/admins/:id/status', updateStatusValidation, requireUserManagement, updateAdminStatus);
router.delete('/admins/:id', requireUserManagement, deleteAdmin);

// Backward compatibility routes (map to admin endpoints)
router.post('/users', createAdminValidation, requireUserManagement, createUser);
router.get('/users', requireUserManagement, getAllUsers);
router.get('/users/:id', requireUserManagement, getUserById);
router.put('/users/:id/permissions', updatePermissionsValidation, requireUserManagement, updateUserPermissions);
router.put('/users/:id/status', updateStatusValidation, requireUserManagement, updateUserStatus);
router.delete('/users/:id', requireUserManagement, deleteUser);
router.get('/user-permissions', getUserPermissions); // Alias for backward compatibility

// Permission-based feature access routes
router.get('/tours/access', requirePermission('tours'), (req, res) => {
  res.json({ 
    success: true, 
    message: 'Tours access granted',
    data: { hasAccess: true, feature: 'tours' }
  });
});

router.get('/blogs/access', requirePermission('blogs'), (req, res) => {
  res.json({ 
    success: true, 
    message: 'Blogs access granted',
    data: { hasAccess: true, feature: 'blogs' }
  });
});

router.get('/gallery/access', requirePermission('gallery'), (req, res) => {
  res.json({ 
    success: true, 
    message: 'Gallery access granted',
    data: { hasAccess: true, feature: 'gallery' }
  });
});

router.get('/testimonials/access', requirePermission('testimonials'), (req, res) => {
  res.json({ 
    success: true, 
    message: 'Testimonials access granted',
    data: { hasAccess: true, feature: 'testimonials' }
  });
});

router.get('/partner-feedbacks/access', requirePermission('partnerFeedbacks'), (req, res) => {
  res.json({ 
    success: true, 
    message: 'Partner feedbacks access granted',
    data: { hasAccess: true, feature: 'partnerFeedbacks' }
  });
});

router.get('/inquiries/access', requirePermission('inquiries'), (req, res) => {
  res.json({ 
    success: true, 
    message: 'Inquiries access granted',
    data: { hasAccess: true, feature: 'inquiries' }
  });
});

router.get('/system-settings/access', requirePermission('systemSettings'), (req, res) => {
  res.json({ 
    success: true, 
    message: 'System settings access granted',
    data: { hasAccess: true, feature: 'systemSettings' }
  });
});

router.get('/user-management/access', requirePermission('userManagement'), (req, res) => {
  res.json({ 
    success: true, 
    message: 'User management access granted',
    data: { hasAccess: true, feature: 'userManagement' }
  });
});

// Example of multiple permission requirements
router.get('/content-management/access', 
  requireAnyPermission(['tours', 'blogs', 'gallery']), 
  (req, res) => {
    res.json({ 
      success: true, 
      message: 'Content management access granted',
      data: { hasAccess: true, feature: 'contentManagement' }
    });
  }
);

// Example of requiring all permissions for super admin features
router.get('/super-admin/access', 
  requireAllPermissions(['userManagement', 'systemSettings']), 
  (req, res) => {
    res.json({ 
      success: true, 
      message: 'Super admin access granted',
      data: { hasAccess: true, feature: 'superAdmin' }
    });
  }
);

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Auth service is healthy',
    data: {
      timestamp: new Date().toISOString(),
      user: {
        id: req.user._id,
        email: req.user.email,
        role: req.user.role,
        isActive: req.user.isActive
      }
    }
  });
});

export default router;

// ## 🔧 API Endpoints

// ### Authentication
// - `POST /api/auth/login` - Admin login
// - `POST /api/auth/logout` - Admin logout  
// - `POST /api/auth/refresh-token` - Refresh access token
// - `POST /api/auth/forgot-password` - Request password reset
// - `POST /api/auth/reset-password` - Reset password with token
// - `POST /api/auth/verify-email` - Verify email with token
// - `POST /api/auth/resend-verification` - Resend verification email

// ### Admin Management (Requires userManagement Permission)
// - `GET /api/auth/admins` - Get all admins
// - `POST /api/auth/admins` - Create new admin
// - `GET /api/auth/admins/:id` - Get admin by ID
// - `PUT /api/auth/admins/:id/permissions` - Update admin permissions
// - `PUT /api/auth/admins/:id/status` - Activate/deactivate admin
// - `DELETE /api/auth/admins/:id` - Delete admin

// ### Admin Profile
// - `GET /api/auth/profile` - Get current admin profile
// - `PUT /api/auth/profile` - Update profile
// - `PUT /api/auth/change-password` - Change password
// - `GET /api/auth/permissions` - Get admin permissions
// - `GET /api/auth/verify-permission/:permission` - Verify specific permission

// ### Feature Access (Permission-Based)
// - `GET /api/auth/tours/access` - Check tours access
// - `GET /api/auth/blogs/access` - Check blogs access
// - `GET /api/auth/gallery/access` - Check gallery access
// - `GET /api/auth/testimonials/access` - Check testimonials access
// - `GET /api/auth/partner-feedbacks/access` - Check partner feedbacks access
// - `GET /api/auth/inquiries/access` - Check inquiries access
// - `GET /api/auth/system-settings/access` - Check system settings access
// - `GET /api/auth/user-management/access` - Check user management access

// ### Backward Compatibility
// - `GET /api/auth/users` - Alias for GET /api/auth/admins
// - `POST /api/auth/users` - Alias for POST /api/auth/admins
// - `PUT /api/auth/users/:id/permissions` - Alias for PUT /api/auth/admins/:id/permissions
// - `PUT /api/auth/users/:id/status` - Alias for PUT /api/auth/admins/:id/status
// - `DELETE /api/auth/users/:id` - Alias for DELETE /api/auth/admins/:id