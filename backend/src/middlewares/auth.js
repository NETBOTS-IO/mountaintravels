import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import authService from '../services/authService.js';

// JWT secret from environment or default
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware to verify JWT token
export const authenticateToken = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access token is required',
        error: 'MISSING_TOKEN'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Get admin from database
    const admin = await User.findById(decoded.userId).select('-password');
    
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Admin not found',
        error: 'ADMIN_NOT_FOUND'
      });
    }

    // Check if admin is active
    if (!admin.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Account is deactivated',
        error: 'ACCOUNT_DEACTIVATED'
      });
    }

    // Add admin to request object
    req.user = admin;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token',
        error: 'INVALID_TOKEN'
      });
    } else if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token has expired',
        error: 'TOKEN_EXPIRED'
      });
    } else {
      return res.status(500).json({
        success: false,
        message: 'Authentication error',
        error: 'AUTH_ERROR'
      });
    }
  }
};

// Middleware to check if admin is authenticated (simplified since all users are admins)
export const requireAdmin = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required',
        error: 'AUTHENTICATION_REQUIRED'
      });
    }

    // Since all authenticated users are admins, just verify they're authenticated
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Authorization error',
      error: 'AUTHORIZATION_ERROR'
    });
  }
};

// Middleware to check specific permission
export const requirePermission = (permission) => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Authentication required',
          error: 'AUTHENTICATION_REQUIRED'
        });
      }

      // Check if admin has the required permission
      if (!req.user.hasPermission(permission)) {
        return res.status(403).json({
          success: false,
          message: `Permission denied: ${permission} access required`,
          error: 'PERMISSION_DENIED'
        });
      }

      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Permission check error',
        error: 'PERMISSION_CHECK_ERROR'
      });
    }
  };
};

// Middleware to check multiple permissions (any of them)
export const requireAnyPermission = (permissions) => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Authentication required',
          error: 'AUTHENTICATION_REQUIRED'
        });
      }

      // Check if admin has any of the required permissions
      const hasAnyPermission = permissions.some(permission => 
        req.user.hasPermission(permission)
      );

      if (!hasAnyPermission) {
        return res.status(403).json({
          success: false,
          message: `Permission denied: Access to at least one of [${permissions.join(', ')}] required`,
          error: 'PERMISSION_DENIED'
        });
      }

      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Permission check error',
        error: 'PERMISSION_CHECK_ERROR'
      });
    }
  };
};

// Middleware to check multiple permissions (all of them)
export const requireAllPermissions = (permissions) => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Authentication required',
          error: 'AUTHENTICATION_REQUIRED'
        });
      }

      // Check if admin has all required permissions
      const hasAllPermissions = permissions.every(permission => 
        req.user.hasPermission(permission)
      );

      if (!hasAllPermissions) {
        return res.status(403).json({
          success: false,
          message: `Permission denied: Access to all [${permissions.join(', ')}] required`,
          error: 'PERMISSION_DENIED'
        });
      }

      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Permission check error',
        error: 'PERMISSION_CHECK_ERROR'
      });
    }
  };
};

// Middleware to check user management permission
export const requireUserManagement = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required',
        error: 'AUTHENTICATION_REQUIRED'
      });
    }

    if (!req.user.hasPermission('userManagement')) {
      return res.status(403).json({
        success: false,
        message: 'User management permission required',
        error: 'USER_MANAGEMENT_REQUIRED'
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Permission check error',
      error: 'PERMISSION_CHECK_ERROR'
    });
  }
};

// Middleware to check if admin can access their own resource or has user management permission
export const requireOwnershipOrUserManagement = (getResourceOwnerId) => {
  return async (req, res, next) => {
    try {
      // If admin has user management permission, allow access
      if (req.user.hasPermission('userManagement')) {
        return next();
      }

      // Otherwise, check ownership
      const resourceOwnerId = await getResourceOwnerId(req);
      if (!resourceOwnerId) {
        return res.status(404).json({ 
          success: false, 
          message: 'Resource not found',
          error: 'RESOURCE_NOT_FOUND'
        });
      }

      if (resourceOwnerId.toString() !== req.user._id.toString()) {
        return res.status(403).json({ 
          success: false, 
          message: 'Access denied - insufficient permissions or ownership required',
          error: 'ACCESS_DENIED'
        });
      }

      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Authorization check error',
        error: 'AUTHORIZATION_ERROR'
      });
    }
  };
};

// Middleware to refresh token
export const refreshToken = async (req, res, next) => {
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

// Optional authentication middleware (doesn't block if no token)
export const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (token) {
      try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const admin = await User.findById(decoded.userId).select('-password');
        
        if (admin && admin.isActive) {
          req.user = admin;
        }
      } catch (error) {
        // Token is invalid, but we don't block the request
        console.log('Optional auth failed:', error.message);
      }
    }

    next();
  } catch (error) {
    // Continue without authentication
    next();
  }
};

// Rate limiting middleware for authentication endpoints
export const authRateLimit = (req, res, next) => {
  // This is a basic implementation
  // In production, you might want to use a more sophisticated rate limiting library
  
  const clientIP = req.ip || req.connection.remoteAddress;
  const endpoint = req.path;
  
  // Store rate limit data in memory (in production, use Redis or database)
  if (!global.rateLimitStore) {
    global.rateLimitStore = new Map();
  }
  
  const key = `${clientIP}:${endpoint}`;
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxAttempts = 5;
  
  const attempts = global.rateLimitStore.get(key) || [];
  const validAttempts = attempts.filter(timestamp => now - timestamp < windowMs);
  
  if (validAttempts.length >= maxAttempts) {
    return res.status(429).json({
      success: false,
      message: 'Too many attempts. Please try again later.',
      error: 'RATE_LIMIT_EXCEEDED'
    });
  }
  
  validAttempts.push(now);
  global.rateLimitStore.set(key, validAttempts);
  
  next();
};