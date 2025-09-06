// services/tourSync.js
import Tour from '../models/tourModel.js';
import { Departure } from '../models/bookingModel.js';

/**
 * Recalculate a tour's price and nextDeparture based on upcoming departures.
 * - price: cheapest upcoming departure price (null if none)
 * - nextDeparture: date of the earliest upcoming departure (null if none)
 */
export async function updateTourPricingAndNextDeparture(tourId) {
  if (!tourId) return;

  // find upcoming departures for the tour (date >= now) with statuses we consider bookable
  const upcoming = await Departure.find({
    tripId: tourId,
    date: { $gte: new Date() },
    status: { $in: ['AVAILABLE', 'LIMITED'] }
  })
    .sort({ date: 1 })
    .lean();

  if (!upcoming || upcoming.length === 0) {
    // No upcoming departures -> null the fields
    await Tour.findByIdAndUpdate(tourId, {
      price: null,
      nextDeparture: null
    }, { new: true }).exec();
    return;
  }

  // cheapest price among upcoming departures
  const cheapestPrice = upcoming.reduce((min, d) => {
    return (d.price != null && d.price < min) ? d.price : min;
  }, upcoming[0].price);

  // earliest upcoming departure
  const nextDepartureDate = upcoming[0].date;

  // Update tour doc (write derived fields so other callers can read them quickly)
  await Tour.findByIdAndUpdate(tourId, {
    price: cheapestPrice,
    nextDeparture: nextDepartureDate
  }, { new: true }).exec();
}
