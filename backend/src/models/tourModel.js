import mongoose from 'mongoose';

const whyChooseSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String }
}, { _id: false });

const itinerarySchema = new mongoose.Schema({
  day: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  activities: [{ type: String }],
  accommodation: { type: String },
  meals: [{ type: String }],
  location: { type: String },
  duration: { type: String },
  type: { type: String },
  highlights: [{ type: String }],
  images: [{ type: String }]
}, { _id: false });

const tourSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true // This allows MongoDB to automatically generate it
  },
  name: { type: String, required: true, trim: true },
  country: { type: String },
  location: { type: String },
  category: { type: String, required: true },
  days: { type: Number, min: 1 },
  difficulty: { type: String, enum: ['Easy', 'Moderate', 'Challenging', 'Expert'] },
  tourType: { type: String, enum: ['Luxary', 'Hardcore'] },
  groupSize: { type: String },
  rating: { type: Number, min: 0, max: 5 },
  reviews: { type: Number, min: 0 },
  price: { type: Number, min: 0 },
  originalPrice: { type: Number, min: 0 },
  images: [{ type: String }],
  // availability: { type: Boolean, default: false, required: true },
  nextDeparture: { type: Date },
  features: [{ type: String }],
  highlights: [{ type: String }],
  inclusions: [{ type: String }],
  exclusions: [{ type: String }],
  shortDescription: { type: String },
  longDescription: { type: String },
  overview: { type: String },
  whyChoose: [whyChooseSchema],
  physicalRequirements: { type: String },
  distance: { type: String },
  hours: { type: String },
  bestTime: { type: String },
  itineraries: [itinerarySchema],
  featured: { type: Boolean, default: false },
  tags: [{ type: String }],
  relatedTrips: [{ type: String }],
  destination: { type: String },
  faqs: [{ question: String, answer: String }],
  termsAndConditions: [{ type: String }],
  policies: [{ type: String }],
  map: { latitude: Number, longitude: Number },
  // BOOKING-RELATED ADDITIONS
  maxCapacity: { 
    type: Number, 
    default: 20,
    min: 1,
    max: 50
  },
  minimumBooking: {
    type: Number,
    default: 1,
    min: 1
  },
  bookingDeadline: {
    type: Number, // Days before departure
    default: 7,
    min: 0
  },
  cancellationPolicy: {
    type: String,
    default: "Free cancellation up to 7 days before departure"
  },
  paymentTerms: {
    deposit: {
      type: Number,
      default: 30, // Percentage
      min: 0,
      max: 100
    },
    fullPaymentDays: {
      type: Number,
      default: 30, // Days before departure
      min: 0
    }
  },
  bookingStatus: {
    type: String,
    enum: ['OPEN', 'CLOSED', 'SUSPENDED'],
    default: 'OPEN'
  },
}, {
  timestamps: true
});

// BOOKING-RELATED METHODS
tourSchema.methods.isBookingOpen = function() {
  return this.availability && this.bookingStatus === 'OPEN';
};

tourSchema.methods.getBookingDeadlineDate = function(departureDate) {
  if (!departureDate) return null;
  const deadline = new Date(departureDate);
  deadline.setDate(deadline.getDate() - this.bookingDeadline);
  return deadline;
};

// Virtual for getting active departures count
tourSchema.virtual('activeDeparturesCount', {
  ref: 'Departure',
  localField: '_id',
  foreignField: 'tripId',
  count: true,
  match: { 
    date: { $gte: new Date() },
    status: { $in: ['AVAILABLE', 'LIMITED'] }
  }
});

// Virtual for getting total bookings count
tourSchema.virtual('totalBookingsCount', {
  ref: 'Booking',
  localField: '_id',
  foreignField: 'tripId',
  count: true,
  match: { 
    status: { $in: ['PENDING', 'CONFIRMED', 'COMPLETED'] }
  }
});

// Index for better booking queries
tourSchema.index({ category: 1, availability: 1, bookingStatus: 1 });
tourSchema.index({ price: 1 });
tourSchema.index({ rating: -1 });
tourSchema.index({ nextDeparture: 1 });

export default mongoose.model('Tour', tourSchema); 