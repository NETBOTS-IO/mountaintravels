import { body, check, param, query } from "express-validator";

//---------- User Validation ----------
export const loginValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('password')
    .isLength({ min: 1 })
    .withMessage('Password is required')
];

export const profileUpdateValidation = [
  body('firstName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2 and 50 characters'),
  body('lastName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be between 2 and 50 characters')
];

export const passwordChangeValidation = [
  body('currentPassword')
    .isLength({ min: 1 })
    .withMessage('Current password is required'),
  body('newPassword')
    .isLength({ min: 8 })
    .withMessage('New password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('New password must contain at least one uppercase letter, one lowercase letter, one number, and one special character')
];

export const forgotPasswordValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address')
];

export const resetPasswordValidation = [
  body('token')
    .isLength({ min: 1 })
    .withMessage('Reset token is required'),
  body('newPassword')
    .isLength({ min: 8 })
    .withMessage('New password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('New password must contain at least one uppercase letter, one lowercase letter, one number, and one special character')
];

export const createAdminValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('firstName')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2 and 50 characters'),
  body('lastName')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be between 2 and 50 characters'),
  body('permissions')
    .optional()
    .isObject()
    .withMessage('Permissions must be an object')
];

export const updatePermissionsValidation = [
  body('permissions')
    .isObject()
    .withMessage('Permissions must be an object'),
  body('permissions.tours')
    .optional()
    .isBoolean()
    .withMessage('Tours permission must be a boolean'),
  body('permissions.blogs')
    .optional()
    .isBoolean()
    .withMessage('Blogs permission must be a boolean'),
  body('permissions.gallery')
    .optional()
    .isBoolean()
    .withMessage('Gallery permission must be a boolean'),
  body('permissions.testimonials')
    .optional()
    .isBoolean()
    .withMessage('Testimonials permission must be a boolean'),
  body('permissions.partnerFeedbacks')
    .optional()
    .isBoolean()
    .withMessage('Partner feedbacks permission must be a boolean'),
  body('permissions.inquiries')
    .optional()
    .isBoolean()
    .withMessage('Inquiries permission must be a boolean'),
  body('permissions.userManagement')
    .optional()
    .isBoolean()
    .withMessage('User management permission must be a boolean'),
  body('permissions.systemSettings')
    .optional()
    .isBoolean()
    .withMessage('System settings permission must be a boolean')
];

export const updateStatusValidation = [
  body('isActive')
    .isBoolean()
    .withMessage('isActive must be a boolean value')
];

export const emailVerificationValidation = [
  body('token')
    .isLength({ min: 1 })
    .withMessage('Verification token is required')
];

export const resendVerificationValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address')
];

//---------- Tour Validation ----------
export const tourValidation = [
  body().custom((value, { req }) => {
    let tourData;
    // Accept both form-data (tourData) and raw JSON
    if (req.body.tourData) {
      try {
        tourData = JSON.parse(req.body.tourData);
      } catch (error) {
        throw new Error("Invalid tour data format");
      }
    } else {
      tourData = req.body;
    }

    if (!tourData.name) throw new Error("Name is required");
    if (!tourData.category) throw new Error("Category is required");
    if (!tourData.location) throw new Error("Location is required");
    if (!tourData.days && !tourData.duration)
      throw new Error("Days or duration is required");
    if (!tourData.groupSize) throw new Error("Group size is required");
    if (!tourData.difficulty) throw new Error("Difficulty is required");
    if (tourData.price === undefined || tourData.price < 0)
      throw new Error("Valid price is required");
    if (!tourData.bestTime) throw new Error("Best time is required");
    if (!tourData.shortDescription && !tourData.longDescription)
      throw new Error(
        "At least one description (shortDescription or longDescription) is required"
      );
    if (!tourData.itineraries || !tourData.itineraries.length)
      throw new Error("At least one itinerary is required");

    // Validate each itinerary
    tourData.itineraries.forEach((itinerary, index) => {
      if (!itinerary.day)
        throw new Error(`Day number is required for itinerary ${index + 1}`);
      if (!itinerary.title)
        throw new Error(`Title is required for itinerary ${index + 1}`);
      if (!itinerary.description)
        throw new Error(`Description is required for itinerary ${index + 1}`);
    });

    return true;
  }),
];

//---------- Blog Validation ----------
export const blogValidation = [
  // Title: required, max 100 chars
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ max: 100 })
    .withMessage("Title must be less than 100 characters"),

  // Summary: optional, max 300 chars
  body("summary")
    .notEmpty()
    .withMessage("Summary is required")
    .isLength({ max: 300 })
    .withMessage("Summary must be less than 300 characters"),

  // Author: required object with name, designation, and description
  body("author")
    .notEmpty()
    .withMessage("Author is required")
    .custom((value) => {
      if (typeof value !== "object" || value === null) {
        throw new Error("Author must be an object");
      }
      if (!value.name || typeof value.name !== "string") {
        throw new Error("Author name is required and must be a string");
      }
      if (!value.designation || typeof value.designation !== "string") {
        throw new Error("Author designation is required and must be a string");
      }
      if (!value.description || typeof value.description !== "string") {
        throw new Error("Author description is required and must be a string");
      }
      if (value.image && typeof value.image !== "string") {
        throw new Error("Author image must be a string if provided");
      }
      return true;
    }),

  // Category: required
  body("category").notEmpty().withMessage("Category is required"),

  // Tags: optional array of strings
  body("tags")
    .optional()
    .isArray()
    .withMessage("Tags should be an array of strings"),

  body("tags.*").optional().isString().withMessage("Each tag must be a string"),

  // Cover Image: required (sent from frontend form submission)
  check("coverImage").custom((value, { req }) => {
    if (!req.files || !req.files.coverImage || !req.files.coverImage[0]) {
      throw new Error("Cover image is required");
    }
    return true;
  }),

  // Author Image: optional (sent from frontend form submission)
  check("authorImage").optional(),

  // Content: Editor.js blocks required
  body("content")
    .notEmpty()
    .withMessage("Content is required")
    .custom((value) => {
      if (
        typeof value !== "object" ||
        !value.blocks ||
        !Array.isArray(value.blocks) ||
        value.blocks.length === 0
      ) {
        throw new Error(
          "Content must be a valid Editor.js structure with at least one block"
        );
      }

      for (const block of value.blocks) {
        if (
          !block.type ||
          typeof block.type !== "string" ||
          typeof block.data !== "object"
        ) {
          throw new Error("Each block must have a valid type and data");
        }
      }

      return true;
    }),
];

//---------- Inquiry Validation ----------
export const inquiryValidation = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("subject").notEmpty().withMessage("Subject is required"),
  body("message").notEmpty().withMessage("Message is required"),
];

//---------- Contact Validation ----------
export const contactValidation = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("subject").notEmpty().withMessage("Subject is required"),
  body("message").notEmpty().withMessage("Message is required"),
];

//---------- Gallery Validation ----------
export const galleryValidation = [
  body("title").notEmpty().withMessage("Title is required"),
  body("category").notEmpty().withMessage("Category is required"),
  body().custom((value, { req }) => {
    // Check for files uploaded via multer
    if (req.files && req.files.src && req.files.src.length > 0) {
      return true;
    }
    // Check for URLs in body (for non-file uploads)
    let src = req.body.src;
    if (typeof src === "string") src = [src];
    if (Array.isArray(src) && src.length > 0) {
      return true;
    }
    throw new Error("At least one image is required");
  }),
  body("location").optional().isString(),
  body("date").optional().isString(),
  body("description").optional().isString(),
  body("photographer").optional().isString(),
];

//---------- Testimonial Validation ----------
export const testimonialValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ max: 100 })
    .withMessage("Name cannot exceed 100 characters")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Name can only contain letters and spaces"),

  body("designation")
    .trim()
    .notEmpty()
    .withMessage("Designation is required")
    .isLength({ max: 150 })
    .withMessage("Designation cannot exceed 150 characters"),

  body("location")
    .trim()
    .notEmpty()
    .withMessage("Location is required")
    .isLength({ max: 100 })
    .withMessage("Location cannot exceed 100 characters"),

  body("rating")
    .isFloat({ min: 1, max: 5 })
    .withMessage("Rating must be between 1 and 5")
    .custom((value) => {
      if ((value * 2) % 1 !== 0) {
        throw new Error(
          "Rating must be a whole number or half value (e.g., 4.5)"
        );
      }
      return true;
    }),

  body("feedback")
    .trim()
    .notEmpty()
    .withMessage("Feedback is required")
    .isLength({ min: 10, max: 1000 })
    .withMessage("Feedback must be between 10 and 1000 characters"),

  body("image")
    .optional()
    .trim()
    .matches(/\.(jpg|jpeg|png|gif|webp)$/i)
    .withMessage(
      "Image must be a valid image file (jpg, jpeg, png, gif, webp)"
    ),

  body("tripName")
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage("Trip name cannot exceed 200 characters"),

  body("tripDate")
    .optional()
    .isISO8601()
    .withMessage("Trip date must be a valid date")
    .custom((value) => {
      if (new Date(value) > new Date()) {
        throw new Error("Trip date cannot be in the future");
      }
      return true;
    }),

  body("verified")
    .optional()
    .isBoolean()
    .withMessage("Verified must be a boolean value"),

  body("highlights")
    .optional()
    .isArray()
    .withMessage("Highlights must be an array")
    .custom((highlights) => {
      if (highlights.length > 10) {
        throw new Error("Cannot have more than 10 highlights");
      }
      for (let highlight of highlights) {
        if (typeof highlight !== "string" || highlight.length > 100) {
          throw new Error(
            "Each highlight must be a string with max 100 characters"
          );
        }
      }
      return true;
    }),
];

//---------- Booking Validation ----------
export const validateCreateBooking = [
  body('tripId')
    .notEmpty()
    .withMessage('Trip ID is required')
    .withMessage('Invalid Trip ID format'),
    
  body('departureId')
    .optional()
    .custom((value) => {
      if (value && !isValidObjectId(value)) {
        throw new Error('Invalid Departure ID format');
      }
      return true;
    }),
    
  body('firstName')
    .trim()
    .notEmpty()
    .withMessage('First name is required')
    .isLength({ min: 1, max: 50 })
    .withMessage('First name must be between 1 and 50 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('First name can only contain letters and spaces'),
    
  body('lastName')
    .trim()
    .notEmpty()
    .withMessage('Last name is required')
    .isLength({ min: 1, max: 50 })
    .withMessage('Last name must be between 1 and 50 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Last name can only contain letters and spaces'),
    
  body('email')
    .trim()
    .isEmail()
    .withMessage('Invalid email address')
    .normalizeEmail()
    .isLength({ max: 100 })
    .withMessage('Email must be less than 100 characters'),
    
  body('phone')
    .optional()
    .trim()
    .isMobilePhone('any', { strictMode: false })
    .withMessage('Invalid phone number format'),
    
  body('travelers')
    .isInt({ min: 1, max: 20 })
    .withMessage('Number of travelers must be between 1 and 20'),
    
  body('specialRequests')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Special requests must be less than 500 characters'),
];

// Update booking validation rules
export const validateUpdateBooking = [
  body('status')
    .optional()
    .isIn(['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED'])
    .withMessage('Invalid booking status'),
    
  body('paymentStatus')
    .optional()
    .isIn(['PENDING', 'PAID', 'REFUNDED', 'FAILED'])
    .withMessage('Invalid payment status'),
    
  body('paymentMethod')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('Payment method must be less than 50 characters'),
    
  body('specialRequests')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Special requests must be less than 500 characters'),
];

// Departure validation rules
export const validateCreateDeparture = [
  body('tripId')
    .notEmpty()
    .withMessage('Trip ID is required')
    .withMessage('Invalid Trip ID format'),
    
  body('date')
    .isISO8601()
    .withMessage('Invalid date format (use ISO 8601)')
    .custom((value) => {
      const date = new Date(value);
      const now = new Date();
      if (date <= now) {
        throw new Error('Departure date must be in the future');
      }
      return true;
    }),
    
  body('price')
    .isFloat({ min: 0.01 })
    .withMessage('Price must be a positive number'),
    
  body('maxSpots')
    .isInt({ min: 1, max: 50 })
    .withMessage('Max spots must be between 1 and 50'),
    
  body('status')
    .optional()
    .isIn(['AVAILABLE', 'LIMITED', 'SOLD_OUT', 'CANCELLED'])
    .withMessage('Invalid departure status'),
];

// Parameter validation rules
export const validateObjectIdParam = (paramName = 'id') => [
  param(paramName)
    .isMongoId()
    .withMessage(`Invalid ${paramName} format`),
];

export const validateBookingNumberParam = [
  param('bookingNumber')
    .notEmpty()
    .withMessage('Booking number is required')
    .isLength({ min: 5, max: 20 })
    .withMessage('Invalid booking number format'),
];

// Query parameter validation
export const validateBookingQuery = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
    
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
    
  query('status')
    .optional()
    .isIn(['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED'])
    .withMessage('Invalid status filter'),
    
  query('email')
    .optional()
    .isEmail()
    .withMessage('Invalid email format'),
];

// Cancel booking validation
export const validateCancelBooking = [
  body('reason')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Cancellation reason must be less than 200 characters'),
];

// Rate limiting helper (basic implementation)
const requestCounts = new Map();

export const bookingRateLimit = (maxRequests = 5, windowMs = 60 * 60 * 1000) => {
  return (req, res, next) => {
    const clientIP = req.ip || req.connection.remoteAddress;
    const now = Date.now();
    
    if (!requestCounts.has(clientIP)) {
      requestCounts.set(clientIP, { count: 1, resetTime: now + windowMs });
      return next();
    }
    
    const clientData = requestCounts.get(clientIP);
    
    if (now > clientData.resetTime) {
      clientData.count = 1;
      clientData.resetTime = now + windowMs;
      return next();
    }
    
    if (clientData.count >= maxRequests) {
      return res.status(429).json({
        success: false,
        message: 'Too many booking requests. Please try again later.',
        retryAfter: Math.ceil((clientData.resetTime - now) / 1000)
      });
    }
    
    clientData.count++;
    next();
  };
};

// Input sanitization middleware
export const sanitizeBookingInput = (req, res, next) => {
  const sanitizeString = (str) => {
    if (typeof str !== 'string') return str;
    return str.trim().replace(/[<>]/g, '');
  };
  
  if (req.body) {
    if (req.body.firstName) req.body.firstName = sanitizeString(req.body.firstName);
    if (req.body.lastName) req.body.lastName = sanitizeString(req.body.lastName);
    if (req.body.specialRequests) req.body.specialRequests = sanitizeString(req.body.specialRequests);
    if (req.body.phone) req.body.phone = sanitizeString(req.body.phone);
  }
  
  next();
};
