export default function BookingInfoPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <h1 className="text-4xl font-bold mb-12 text-center">
        General Booking Information
      </h1>

      <div className="space-y-10">
        {/* What to Bring */}
        <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">
          <h2 className="text-2xl font-semibold mb-4">What to Bring</h2>
          <p className="text-gray-700 leading-relaxed">
            Mountain Travels Pakistan (MTP) ensures that all essential accommodations,
            meals, and transportation needs are covered, as detailed in our specific tour
            itineraries (with any exceptions duly notified). For our trekking and climbing
            programs, participants are required to bring their personal equipment, suitable
            mountain attire, and necessary medical supplies. A comprehensive packing list
            will be provided once your reservation is confirmed and the deposit is received.
          </p>
        </div>

        {/* Booking Confirmation */}
        <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">
          <h2 className="text-2xl font-semibold mb-4">Booking Confirmation</h2>
          <p className="text-gray-700 leading-relaxed">
            Bookings can be made by mailing or faxing a program registration form together
            with a deposit (certified cheque, cash or money order) of $100 (US). The balance
            of the tour price is due and payable 8 weeks prior to the tour departure date.
            Tour programs booked within the 8-week period are due and payable in full at
            the time of booking.
          </p>
        </div>

        {/* Refund and Cancellation */}
        <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">
          <h2 className="text-2xl font-semibold mb-4">
            Refund and Cancellation Policy
          </h2>
          <p className="text-gray-700 leading-relaxed">
            All cancellations must be confirmed in writing by fax, mail or e-mail directly
            to MTP. Cancellations made prior to receipt of final payment are subject to a
            $50 (US) processing fee. Cancellations made after final payment but prior to
            30 days before departure date will be subject to a refund equal to 50% of the
            total tour program cost. Cancellations made less than 30 days prior to
            departure will be subject to a 100% deduction of prior deposits/payments.
          </p>
          <p className="text-gray-700 leading-relaxed mt-3">
            No refund(s) will be given for any unused portion of the trip with respect to
            air and ground transportation, meals, accommodation and tour services.
          </p>
        </div>

        {/* Participant Responsibilities */}
        <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">
          <h2 className="text-2xl font-semibold mb-4">
            Participant Responsibilities
          </h2>
          <p className="text-gray-700 leading-relaxed">
            It is the responsibility of each participant to have adequate medical,
            cancellation and accident insurance coverage. Travel visas, medical
            vaccinations and other required documents are to be arranged by the
            participant prior to departure.
          </p>
          <p className="text-gray-700 leading-relaxed mt-3">
            MTP reserves the right to cancel your trip if adequate insurance, physical
            health, or responsible behavior is not demonstrated. Participants must
            respect the authority of the local tour leader concerning all matters of
            travel logistics throughout the itinerary.
          </p>
        </div>

        {/* Limitations / Liabilities */}
        <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">
          <h2 className="text-2xl font-semibold mb-4">
            Limitations & Liabilities
          </h2>
          <p className="text-gray-700 leading-relaxed">
            While Mountain Travels Pakistan (MTP) makes every effort to assure the highest
            quality tour programs, MTP shall not be responsible for personal injury, loss
            or damage to baggage or personal property, illness, or death arising from
            participation in our tours.
          </p>
          <p className="text-gray-700 leading-relaxed mt-3">
            Adventure travel involves inherent risks. MTP will not be responsible for
            delays, changes or cancellations caused by weather, natural disasters,
            mechanical breakdowns, political unrest or other unforeseen circumstances.
            Participants are required to accept all terms and conditions upon booking.
          </p>
        </div>
      </div>
    </div>
  )
}
