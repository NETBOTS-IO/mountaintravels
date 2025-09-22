import mongoose from 'mongoose';
import Tour from '../models/tourModel.js';
import { Departure, Booking } from '../models/bookingModel.js';
import { sendBookingEmails, sendBookingConfirmationEmail } from '../utils/email.js';
import { updateTourPricingAndNextDeparture } from './tourSync.js';

export class BookingService {
  
  /**
   * Create a new booking
   */
  static async createBooking(bookingData) {
    const session = await mongoose.startSession();
    
    try {
      await session.startTransaction();
      
      // Validate trip exists and is available
      const trip = await Tour.findById(bookingData.tripId).session(session);
      if (!trip) {
        throw new Error('Trip not found');
      }

      if (!trip.availability) {
        throw new Error('Trip is not available for booking');
      }

      // Validate departure if provided
      let departure = null;
      let finalPrice = trip.price;

      if (bookingData.departureId) {
        departure = await Departure.findById(bookingData.departureId).session(session);
        if (!departure) {
          throw new Error('Departure not found');
        }

        if (!departure.hasAvailability(bookingData.travelers)) {
          throw new Error(`Only ${departure.spotsLeft} spots available for this departure`);
        }

        finalPrice = departure.price;
      }

      // Calculate total price
      const totalPrice = finalPrice * bookingData.travelers;

      // Create the booking
      const booking = new Booking({
        tripId: bookingData.tripId,
        departureId: bookingData.departureId,
        firstName: bookingData.firstName,
        lastName: bookingData.lastName,
        email: bookingData.email,
        phone: bookingData.phone,
        travelers: bookingData.travelers,
        totalPrice,
        specialRequests: bookingData.specialRequests,
        status: 'PENDING',
        paymentStatus: 'PENDING'
      });

      await booking.save({ session });

      // Update departure spots if departure is selected
      if (departure) {
        departure.spotsLeft -= bookingData.travelers;
        await departure.save({ session });
      }

      await session.commitTransaction();

      // Populate the booking for response
      await booking.populate([
        { path: 'tripId', select: 'name price' },
        { path: 'departureId', select: 'date price' }
      ]);

      // Send confirmation emails (don't await to avoid blocking)
      setImmediate(async () => {
        try {
          await sendBookingEmails({
            booking: booking.toObject(),
            user: {
              firstName: booking.firstName,
              lastName: booking.lastName,
              email: booking.email
            },
            trip: booking.tripId,
            departure: booking.departureId
          });
        } catch (emailError) {
          console.error('Failed to send booking emails:', emailError);
        }
      });

      return {
        success: true,
        booking: booking.toObject(),
        message: 'Booking created successfully'
      };

    } catch (error) {
      await session.abortTransaction();
      console.error('BookingService.createBooking error:', error);
      throw new Error(error.message || 'Failed to create booking');
    } finally {
      await session.endSession();
    }
  }

  /**
   * Get booking by ID or booking number
   */
  static async getBooking(identifier, isBookingNumber = false) {
    try {
      const query = isBookingNumber 
        ? { bookingNumber: identifier }
        : { _id: identifier };

      const booking = await Booking.findOne(query)
        .populate('tripId', 'name price duration')
        .populate('departureId', 'date price spotsLeft status')
        .lean();

      if (!booking) {
        throw new Error('Booking not found');
      }

      return booking;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch booking');
    }
  }

  /**
   * Get all bookings with pagination and filtering
   */
  static async getAllBookings(options = {}) {
    try {
      const {
        page = 1,
        limit = 20,
        status,
        email,
        tripId,
        sortBy = 'createdAt',
        sortOrder = 'desc'
      } = options;

      const skip = (page - 1) * limit;
      
      // Build filter query
      const filter = {};
      if (status) filter.status = status;
      if (email) filter.email = { $regex: email, $options: 'i' };
      if (tripId) filter.tripId = tripId;

      // Build sort object
      const sort = {};
      sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

      const [bookings, total] = await Promise.all([
        Booking.find(filter)
          .populate('tripId', 'name')
          .populate('departureId', 'date price')
          .sort(sort)
          .skip(skip)
          .limit(limit)
          .lean(),
        Booking.countDocuments(filter)
      ]);

      return {
        bookings,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
          hasNextPage: page < Math.ceil(total / limit),
          hasPrevPage: page > 1
        }
      };
    } catch (error) {
      throw new Error('Failed to fetch bookings');
    }
  }

  /**
   * Update booking status
   */
  static async updateBooking(bookingId, updateData) {
    try {
      const existingBooking = await Booking.findById(bookingId)
        .populate('tripId', 'name')
        .populate('departureId', 'date price');

      if (!existingBooking) {
        throw new Error('Booking not found');
      }

      const updatedBooking = await Booking.findByIdAndUpdate(
        bookingId,
        updateData,
        { new: true, runValidators: true }
      )
        .populate('tripId', 'name')
        .populate('departureId', 'date price');

      // Send confirmation email if status changed to CONFIRMED
      if (updateData.status === 'CONFIRMED' && existingBooking.status !== 'CONFIRMED') {
        setImmediate(async () => {
          try {
            await sendBookingConfirmationEmail({
              booking: updatedBooking.toObject(),
              user: {
                firstName: updatedBooking.firstName,
                lastName: updatedBooking.lastName,
                email: updatedBooking.email
              },
              trip: updatedBooking.tripId,
              departure: updatedBooking.departureId
            });
          } catch (emailError) {
            console.error('Failed to send confirmation email:', emailError);
          }
        });
      }

      return updatedBooking.toObject();
    } catch (error) {
      throw new Error(error.message || 'Failed to update booking');
    }
  }

  /**
   * Cancel booking
   */
  static async cancelBooking(bookingId, reason = '') {
    const session = await mongoose.startSession();
    
    try {
      await session.startTransaction();

      const booking = await Booking.findById(bookingId)
        .populate('departureId')
        .session(session);

      if (!booking) {
        throw new Error('Booking not found');
      }

      if (booking.status === 'CANCELLED') {
        throw new Error('Booking is already cancelled');
      }

      // Update booking status
      booking.status = 'CANCELLED';
      booking.paymentStatus = 'REFUNDED';
      booking.specialRequests = booking.specialRequests 
        ? `${booking.specialRequests}\n\nCancellation reason: ${reason}`
        : `Cancellation reason: ${reason}`;

      await booking.save({ session });

      // Restore departure spots if applicable
      if (booking.departureId) {
        const departure = booking.departureId;
        departure.spotsLeft += booking.travelers;
        await departure.save({ session });
      }

      await session.commitTransaction();
      
      return booking.toObject();
    } catch (error) {
      await session.abortTransaction();
      throw new Error(error.message || 'Failed to cancel booking');
    } finally {
      await session.endSession();
    }
  }

  /**
   * Get booking statistics for admin dashboard
   */
  static async getBookingStats() {
    try {
      const stats = await Booking.getStats();
      
      // Get recent bookings
      const recentBookings = await Booking.find()
        .populate('tripId', 'name')
        .sort({ createdAt: -1 })
        .limit(5)
        .lean();

      return {
        ...stats,
        recentBookings
      };
    } catch (error) {
      throw new Error('Failed to fetch booking statistics');
    }
  }

  /**
   * Get bookings by email (for customer lookup)
   */
  static async getBookingsByEmail(email) {
    try {
      const bookings = await Booking.find({ email: email.toLowerCase() })
        .populate('tripId', 'name price')
        .populate('departureId', 'date price')
        .sort({ createdAt: -1 })
        .lean();

      return bookings;
    } catch (error) {
      throw new Error('Failed to fetch customer bookings');
    }
  }
}

/**
 * Departure Service - for managing trip departures
 */
export class DepartureService {
  
  /**
   * Create a new departure
   */
  static async createDeparture(departureData) {
    try {
      // Validate trip exists
      const trip = await Tour.findById(departureData.tripId);
      if (!trip) {
        throw new Error('Trip not found');
      }

      // Check if departure date already exists for this trip
      const existingDeparture = await Departure.findOne({
        tripId: departureData.tripId,
        date: new Date(departureData.date)
      });

      if (existingDeparture) {
        throw new Error('Departure date already exists for this trip');
      }

      const departure = new Departure({
        tripId: departureData.tripId,
        date: new Date(departureData.date),
        price: departureData.price,
        maxSpots: departureData.maxSpots,
        spotsLeft: departureData.maxSpots,
        status: departureData.status || 'AVAILABLE'
      });

      await departure.save();
      await departure.populate('tripId', 'name');

      await updateTourPricingAndNextDeparture(departure.tripId);

      return departure.toObject();
    } catch (error) {
      throw new Error(error.message || 'Failed to create departure');
    }
  }

  /**
   * Get departures for a trip
   */
  static async getTripDepartures(tripId) {
    try {
      const departures = await Departure.findAvailable(tripId)
        .populate('tripId', 'name')
        .lean();

      // Add booking count for each departure
      const departuresWithBookings = await Promise.all(
        departures.map(async (departure) => {
          const bookingCount = await Booking.countDocuments({
            departureId: departure._id,
            status: { $in: ['PENDING', 'CONFIRMED'] }
          });
          
          return {
            ...departure,
            bookingCount
          };
        })
      );

      return departuresWithBookings;
    } catch (error) {
      throw new Error('Failed to fetch departures');
    }
  }

  /**
   * Update departure
   */
  static async updateDeparture(departureId, updateData) {
    try {
      const departure = await Departure.findByIdAndUpdate(
        departureId,
        updateData,
        { new: true, runValidators: true }
      )
        .populate('tripId', 'name')
        .lean();

      if (!departure) {
        throw new Error('Departure not found');
      }

      await updateTourPricingAndNextDeparture(departure.tripId);

      return departure;
    } catch (error) {
      throw new Error(error.message || 'Failed to update departure');
    }
  }

  /**
   * Delete departure (only if no bookings)
   */
  static async deleteDeparture(departureId) {
    try {
      const bookingCount = await Booking.countDocuments({
        departureId,
        status: { $in: ['PENDING', 'CONFIRMED'] }
      });

      if (bookingCount > 0) {
        throw new Error('Cannot delete departure with existing bookings');
      }

      const departure = await Departure.findByIdAndDelete(departureId);
      if (!departure) {
        throw new Error('Departure not found');
      }

      await updateTourPricingAndNextDeparture(departure.tripId);

      return { success: true, message: 'Departure deleted successfully' };
    } catch (error) {
      throw new Error(error.message || 'Failed to delete departure');
    }
  }

  /**
   * Get all departures with pagination
   */
  static async getAllDepartures(options = {}) {
    try {
      const {
        page = 1,
        limit = 20,
        tripId,
        status,
        fromDate,
        toDate
      } = options;

      const skip = (page - 1) * limit;
      
      const filter = {};
      if (tripId) filter.tripId = tripId;
      if (status) filter.status = status;
      if (fromDate || toDate) {
        filter.date = {};
        if (fromDate) filter.date.$gte = new Date(fromDate);
        if (toDate) filter.date.$lte = new Date(toDate);
      }

      const [departures, total] = await Promise.all([
        Departure.find(filter)
          .populate('tripId', 'name')
          .sort({ date: 1 })
          .skip(skip)
          .limit(limit)
          .lean(),
        Departure.countDocuments(filter)
      ]);

      return {
        departures,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      };
    } catch (error) {
      throw new Error('Failed to fetch departures');
    }
  }
}