import mongoose from 'mongoose';

// Departure Schema
const DepartureSchema = new mongoose.Schema({
  tripId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tour',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  maxSpots: {
    type: Number,
    required: true,
    default: 20,
  },
  spotsLeft: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['AVAILABLE', 'LIMITED', 'SOLD_OUT', 'CANCELLED'],
    default: 'AVAILABLE',
  },
}, {
  timestamps: true,
});

// Booking Schema
const BookingSchema = new mongoose.Schema({
  bookingNumber: {
    type: String,
    unique: true,
    required: true,
    default: function() {
      return 'BK' + Date.now() + Math.random().toString(36).substring(2, 7).toUpperCase();
    },
  },
  
  // Trip details
  tripId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tour',
    required: true,
  },
  departureId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Departure',
  },
  
  // Customer details
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  
  // Booking details
  travelers: {
    type: Number,
    required: true,
    min: 1,
    max: 20,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED'],
    default: 'PENDING',
  },
  
  // Payment details
  paymentStatus: {
    type: String,
    enum: ['PENDING', 'PAID', 'REFUNDED', 'FAILED'],
    default: 'PENDING',
  },
  paymentMethod: {
    type: String,
  },
  
  // Special requests
  specialRequests: {
    type: String,
    maxlength: 500,
  },
  
  // Additional tracking
  ipAddress: String,
  userAgent: String,
  
}, {
  timestamps: true,
});

// Indexes for better performance
BookingSchema.index({ bookingNumber: 1 });
BookingSchema.index({ email: 1 });
BookingSchema.index({ tripId: 1 });
BookingSchema.index({ status: 1 });
BookingSchema.index({ createdAt: -1 });

DepartureSchema.index({ tripId: 1, date: 1 }, { unique: true });
DepartureSchema.index({ date: 1 });
DepartureSchema.index({ status: 1 });

// Virtual for full name
BookingSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Pre-save middleware to ensure spotsLeft is set
DepartureSchema.pre('save', function(next) {
  if (this.isNew && this.spotsLeft === undefined) {
    this.spotsLeft = this.maxSpots;
  }
  next();
});

// Update status based on spots left
DepartureSchema.pre('save', function(next) {
  if (this.spotsLeft <= 0) {
    this.status = 'SOLD_OUT';
  } else if (this.spotsLeft <= 3) {
    this.status = 'LIMITED';
  } else if (this.status === 'SOLD_OUT' || this.status === 'LIMITED') {
    this.status = 'AVAILABLE';
  }
  next();
});

// Static method to find available departures
DepartureSchema.statics.findAvailable = function(tripId) {
  return this.find({
    tripId,
    date: { $gte: new Date() },
    status: { $in: ['AVAILABLE', 'LIMITED'] }
  }).sort({ date: 1 });
};

// Instance method to check availability
DepartureSchema.methods.hasAvailability = function(requestedSpots) {
  return this.status !== 'SOLD_OUT' && this.status !== 'CANCELLED';
};

// Static method to get booking stats
BookingSchema.statics.getStats = async function() {
  const pipeline = [
    {
      $group: {
        _id: null,
        totalBookings: { $sum: 1 },
        pendingBookings: {
          $sum: { $cond: [{ $eq: ['$status', 'PENDING'] }, 1, 0] }
        },
        confirmedBookings: {
          $sum: { $cond: [{ $eq: ['$status', 'CONFIRMED'] }, 1, 0] }
        },
        totalRevenue: {
          $sum: {
            $cond: [
              { $in: ['$status', ['CONFIRMED', 'COMPLETED']] },
              '$totalPrice',
              0
            ]
          }
        }
      }
    }
  ];
  
  const result = await this.aggregate(pipeline);
  return result[0] || {
    totalBookings: 0,
    pendingBookings: 0,
    confirmedBookings: 0,
    totalRevenue: 0
  };
};

// Export models
export const Departure = mongoose.model('Departure', DepartureSchema);
export const Booking = mongoose.model('Booking', BookingSchema);