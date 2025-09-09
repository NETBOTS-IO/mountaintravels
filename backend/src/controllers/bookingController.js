import { BookingService, DepartureService } from '../services/bookingService.js';

export class BookingController {

  /**
   * Create a new booking
   * POST /api/bookings
   */
  static async createBooking(req, res) {
    try {
      const bookingData = {
        ...req.body,
        ipAddress: req.ip,
        userAgent: req.get('User-Agent')
      };
      
      const result = await BookingService.createBooking(bookingData);
      
      res.status(201).json({
        success: true,
        message: 'Booking created successfully',
        data: {
          bookingNumber: result.booking.bookingNumber,
          status: result.booking.status,
          totalPrice: result.booking.totalPrice,
          trip: result.booking.tripId?.name || 'Unknown Trip'
        }
      });
    } catch (error) {
      console.error('BookingController.createBooking error:', error);
      res.status(400).json({
        success: false,
        message: error.message || 'Failed to create booking'
      });
    }
  }

  /**
   * Get booking by ID
   * GET /api/bookings/:id
   */
  static async getBooking(req, res) {
    try {
      const { id } = req.params;
      const booking = await BookingService.getBooking(id);
      
      res.json({
        success: true,
        data: booking
      });
    } catch (error) {
      console.error('BookingController.getBooking error:', error);
      res.status(404).json({
        success: false,
        message: error.message || 'Booking not found'
      });
    }
  }

  /**
   * Get booking by booking number
   * GET /api/bookings/number/:bookingNumber
   */
  static async getBookingByNumber(req, res) {
    try {
      const { bookingNumber } = req.params;
      const booking = await BookingService.getBooking(bookingNumber, true);
      
      res.json({
        success: true,
        data: booking
      });
    } catch (error) {
      console.error('BookingController.getBookingByNumber error:', error);
      res.status(404).json({
        success: false,
        message: error.message || 'Booking not found'
      });
    }
  }

  /**
   * Get all bookings (admin only)
   * GET /api/bookings
   */
  static async getAllBookings(req, res) {
    try {
      const {
        page = 1,
        limit = 20,
        status,
        email,
        tripId,
        sortBy = 'createdAt',
        sortOrder = 'desc'
      } = req.query;

      const options = {
        page: parseInt(page),
        limit: parseInt(limit),
        status,
        email,
        tripId,
        sortBy,
        sortOrder
      };
      
      const result = await BookingService.getAllBookings(options);
      
      res.json({
        success: true,
        data: result.bookings,
        pagination: result.pagination
      });
    } catch (error) {
      console.error('BookingController.getAllBookings error:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to fetch bookings'
      });
    }
  }

  /**
   * Update booking status (admin only)
   * PATCH /api/bookings/:id
   */
  static async updateBooking(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;
      
      const booking = await BookingService.updateBooking(id, updateData);
      
      res.json({
        success: true,
        message: 'Booking updated successfully',
        data: booking
      });
    } catch (error) {
      console.error('BookingController.updateBooking error:', error);
      res.status(400).json({
        success: false,
        message: error.message || 'Failed to update booking'
      });
    }
  }

  /**
   * Cancel booking
   * POST /api/bookings/:id/cancel
   */
  static async cancelBooking(req, res) {
    try {
      const { id } = req.params;
      const { reason } = req.body;
      
      const booking = await BookingService.cancelBooking(id, reason);
      
      res.json({
        success: true,
        message: 'Booking cancelled successfully',
        data: booking
      });
    } catch (error) {
      console.error('BookingController.cancelBooking error:', error);
      res.status(400).json({
        success: false,
        message: error.message || 'Failed to cancel booking'
      });
    }
  }

  /**
   * Get booking statistics (admin only)
   * GET /api/bookings/stats
   */
  static async getBookingStats(req, res) {
    try {
      const stats = await BookingService.getBookingStats();
      
      res.json({
        success: true,
        data: stats
      });
    } catch (error) {
      console.error('BookingController.getBookingStats error:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to fetch statistics'
      });
    }
  }

  /**
   * Get bookings by email (customer lookup)
   * GET /api/bookings/customer/:email
   */
  static async getCustomerBookings(req, res) {
    try {
      const { email } = req.params;
      const bookings = await BookingService.getBookingsByEmail(email);
      
      res.json({
        success: true,
        data: bookings,
        count: bookings.length
      });
    } catch (error) {
      console.error('BookingController.getCustomerBookings error:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to fetch customer bookings'
      });
    }
  }
}

/**
 * Departure Controller - for managing trip departures
 */
export class DepartureController {

  /**
   * Create a new departure (admin only)
   * POST /api/departures
   */
  static async createDeparture(req, res) {
    try {
      const departureData = req.body;
      const departure = await DepartureService.createDeparture(departureData);
      
      res.status(201).json({
        success: true,
        message: 'Departure created successfully',
        data: departure
      });
    } catch (error) {
      console.error('DepartureController.createDeparture error:', error);
      res.status(400).json({
        success: false,
        message: error.message || 'Failed to create departure'
      });
    }
  }

  /**
   * Get departures for a trip
   * GET /api/trips/:tripId/departures
   */
  static async getTripDepartures(req, res) {
    try {
      const { tripId } = req.params;
      const departures = await DepartureService.getTripDepartures(tripId);
      
      res.json({
        success: true,
        data: departures,
        count: departures.length
      });
    } catch (error) {
      console.error('DepartureController.getTripDepartures error:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to fetch departures'
      });
    }
  }

  /**
   * Get all departures (admin only)
   * GET /api/departures
   */
  static async getAllDepartures(req, res) {
    try {
      const {
        page = 1,
        limit = 20,
        tripId,
        status,
        fromDate,
        toDate
      } = req.query;

      const options = {
        page: parseInt(page),
        limit: parseInt(limit),
        tripId,
        status,
        fromDate,
        toDate
      };
      
      const result = await DepartureService.getAllDepartures(options);
      
      res.json({
        success: true,
        data: result.departures,
        pagination: result.pagination
      });
    } catch (error) {
      console.error('DepartureController.getAllDepartures error:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to fetch departures'
      });
    }
  }

  /**
   * Update departure (admin only)
   * PATCH /api/departures/:id
   */
  static async updateDeparture(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;
      
      const departure = await DepartureService.updateDeparture(id, updateData);
      
      res.json({
        success: true,
        message: 'Departure updated successfully',
        data: departure
      });
    } catch (error) {
      console.error('DepartureController.updateDeparture error:', error);
      res.status(400).json({
        success: false,
        message: error.message || 'Failed to update departure'
      });
    }
  }

  /**
   * Delete departure (admin only)
   * DELETE /api/departures/:id
   */
  static async deleteDeparture(req, res) {
    try {
      const { id } = req.params;
      const result = await DepartureService.deleteDeparture(id);
      
      res.json({
        success: true,
        message: result.message
      });
    } catch (error) {
      console.error('DepartureController.deleteDeparture error:', error);
      res.status(400).json({
        success: false,
        message: error.message || 'Failed to delete departure'
      });
    }
  }
}