import express from 'express';
import { BookingController, DepartureController } from '../controllers/bookingController.js';
import {
  validateCreateBooking,
  validateUpdateBooking,
  validateCreateDeparture,
  validateObjectIdParam,
  validateBookingNumberParam,
  validateBookingQuery,
  validateCancelBooking,
  bookingRateLimit,
  sanitizeBookingInput
} from '../middlewares/validation.js';
// import { authenticateAdmin, authenticateUser } from '../middleware/auth.js'; // Implement as needed

const router = express.Router();

// Apply rate limiting to booking creation
router.use('/bookings', (req, res, next) => {
  // More lenient rate limit for GET requests (read operations)
  if (req.method === 'GET') {
    return bookingRateLimit(100, 15 * 60 * 1000)(req, res, next); // 100 requests per 15 minutes
  }
  // Stricter rate limit for POST/PUT/PATCH/DELETE requests (write operations)
  return bookingRateLimit(20, 15 * 60 * 1000)(req, res, next); // 20 requests per 15 minutes
});

// ============================================
// BOOKING ROUTES
// ============================================

/**
 * @route   POST /api/bookings
 * @desc    Create a new booking
 * @access  Public
 */
router.post('/bookings',
  sanitizeBookingInput,
  validateCreateBooking,
  BookingController.createBooking
);

/**
 * @route   GET /api/bookings
 * @desc    Get all bookings with filtering and pagination (admin only)
 * @access  Private/Admin
 */
router.get('/bookings',
  // authenticateAdmin, // Uncomment when auth is implemented
  validateBookingQuery,
  BookingController.getAllBookings
);

/**
 * @route   GET /api/bookings/stats
 * @desc    Get booking statistics (admin only)
 * @access  Private/Admin
 */
router.get('/bookings/stats',
  // authenticateAdmin, // Uncomment when auth is implemented
  BookingController.getBookingStats
);

/**
 * @route   GET /api/bookings/number/:bookingNumber
 * @desc    Get booking by booking number
 * @access  Public (could be protected with email verification)
 */
router.get('/bookings/number/:bookingNumber',
  validateBookingNumberParam,
  BookingController.getBookingByNumber
);

/**
 * @route   GET /api/bookings/customer/:email
 * @desc    Get all bookings for a customer by email
 * @access  Public (could be protected with email verification)
 */
router.get('/bookings/customer/:email',
  // Add email validation in params
  BookingController.getCustomerBookings
);

/**
 * @route   GET /api/bookings/:id
 * @desc    Get booking by ID (admin only)
 * @access  Private/Admin
 */
router.get('/bookings/:id',
  validateObjectIdParam('id'),
  // authenticateAdmin, // Uncomment when auth is implemented
  BookingController.getBooking
);

/**
 * @route   PATCH /api/bookings/:id
 * @desc    Update booking status (admin only)
 * @access  Private/Admin
 */
router.patch('/bookings/:id',
  validateObjectIdParam('id'),
  validateUpdateBooking,
  // authenticateAdmin, // Uncomment when auth is implemented
  BookingController.updateBooking
);

/**
 * @route   POST /api/bookings/:id/cancel
 * @desc    Cancel booking
 * @access  Private (user or admin)
 */
router.post('/bookings/:id/cancel',
  validateObjectIdParam('id'),
  validateCancelBooking,
  // Add authentication to ensure user can only cancel their own bookings
  BookingController.cancelBooking
);

// ============================================
// DEPARTURE ROUTES
// ============================================

/**
 * @route   POST /api/departures
 * @desc    Create a new departure (admin only)
 * @access  Private/Admin
 */
router.post('/departures',
  validateCreateDeparture,
  // authenticateAdmin, // Uncomment when auth is implemented
  DepartureController.createDeparture
);

/**
 * @route   GET /api/departures
 * @desc    Get all departures with filtering (admin only)
 * @access  Private/Admin
 */
router.get('/departures',
  // authenticateAdmin, // Uncomment when auth is implemented
  DepartureController.getAllDepartures
);

/**
 * @route   GET /api/trips/:tripId/departures
 * @desc    Get departures for a specific trip
 * @access  Public
 */
router.get('/trips/:tripId/departures',
  validateObjectIdParam('tripId'),
  DepartureController.getTripDepartures
);

/**
 * @route   PATCH /api/departures/:id
 * @desc    Update departure (admin only)
 * @access  Private/Admin
 */
router.patch('/departures/:id',
  validateObjectIdParam('id'),
  // authenticateAdmin, // Uncomment when auth is implemented
  DepartureController.updateDeparture
);

/**
 * @route   DELETE /api/departures/:id
 * @desc    Delete departure (admin only)
 * @access  Private/Admin
 */
router.delete('/departures/:id',
  validateObjectIdParam('id'),
  // authenticateAdmin, // Uncomment when auth is implemented
  DepartureController.deleteDeparture
);

// ============================================
// ERROR HANDLING MIDDLEWARE
// ============================================

// Global error handler for booking routes
router.use((error, req, res, next) => {
  console.error('Booking Route Error:', error);
  
  // Handle MongoDB/Mongoose errors
  if (error.name === 'ValidationError') {
    const errors = Object.values(error.errors).map(err => ({
      field: err.path,
      message: err.message
    }));
    
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors
    });
  }
  
  if (error.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: 'Invalid ID format'
    });
  }
  
  if (error.code === 11000) {
    const field = Object.keys(error.keyValue)[0];
    return res.status(400).json({
      success: false,
      message: `${field} already exists`
    });
  }
  
  // Handle custom errors
  if (error.name === 'BookingError') {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
  
  // Default error response
  res.status(error.status || 500).json({
    success: false,
    message: error.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
  });
});

export default router;