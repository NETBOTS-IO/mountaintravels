import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function BookingInfoPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">General Booking Information</h1>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="what-to-bring">
          <AccordionTrigger>What to Bring</AccordionTrigger>
          <AccordionContent>
            <p>
              Mountain Travels Pakistan (MTP) ensures that all essential accommodations, meals, and transportation needs
              are covered, as detailed in our specific tour itineraries (with any exceptions duly notified). For our
              trekking and climbing programs, participants are required to bring their personal equipment, suitable
              mountain attire, and necessary medical supplies. A comprehensive packing list will be provided once your
              reservation is confirmed and the deposit is received.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="booking-confirmation">
          <AccordionTrigger>Booking Confirmation</AccordionTrigger>
          <AccordionContent>
            <p>
              Bookings can be made by mailing or faxing a program registration form together with a deposit (certified
              cheque, cash or money order) of $100 (US). The balance of the tour price is due and payable 8 weeks prior
              to the tour departure date. Tour programs booked within the 8 week period are due and payable in full at
              the time of booking.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="refund-cancellation">
          <AccordionTrigger>Refund and Cancellation Policy</AccordionTrigger>
          <AccordionContent>
            <p>
              All cancellations must be confirmed in writing by fax, mail or e-mail directly to MTP. Cancellations made
              prior to receipt of final payment are subject to a $50 (US) processing fee. Cancellations made after final
              payment but prior to 30 days before departure date will be subject to a refund equal to 50% of the total
              tour program cost. Cancellations made less than 30 days prior to departure will be subject to a 100%
              deduction of prior deposits/ payments. We would be pleased to transfer all monies received, less than $50
              (US) processing fee, however, should you wish to book a different tour program or departure date, subject
              to space availability. No refund(s) will be given for any unused portion of the trip with respect to air
              and ground transportation, meals, accommodation and tour services.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="participant-responsibilities">
          <AccordionTrigger>Participant Responsibilities</AccordionTrigger>
          <AccordionContent>
            <p>
              It is the responsibility of each individual participant to have adequate medical, cancellation and
              accident insurance coverage, in the event that it is required. Travel visas, medical vaccinations and
              other such required documents are to be arranged by the participant prior to departure. MTP reserves the
              right to cancel your trip if it is not satisfied what you have: (a) adequate insurance coverage; (b)
              demonstrated good physical health and responsible behaviour on the tour, in order that undue harm not be
              taken with the health and safety of yourself and other participant(s). Upon the start of the journey,
              participant(s) are to respect and abide by the expressed authority of the local tour leader concerning all
              matters of travel logistics throughout the itinerary dates.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="limitations-liabilities">
          <AccordionTrigger>Limitations/Liabilities</AccordionTrigger>
          <AccordionContent>
            <p>
              While Mountain Travels Pakistan [MTP] makes every effort to assure the highest quality tour programs. MTP
              shall not, in any event whatsoever, be responsible in any way for personal injury, loss or damage to
              baggage and/or personal property, illness or death, or for any damages or claims sustained by the
              participant(s) arising out of the participant's involvement in our tours. Upon booking with MTP, you
              accept and understand that there is an element of risk and hazard to partaking in adventure programs of
              this nature. Any and all matters of unforeseen circumstances may occur, resulting in routing, mode of
              transport, accommodation and unfulfilled portions of the itinerary. MTP will not be responsible for
              itinerary delays, changes and cancellations and resulting expenses incurred by participant(s) due to
              inclement weather, natural disasters (i.e. landslides, avalanches, earthquakes, flooding, etc), mechanical
              breakdowns, flight cancellations, political unrest and local strikes. Such changes, substitutions and
              cancellations made necessary due to the above-noted and related conditions may be made by MTP at any time
              and without notice. Participant(s) booked and confirmed on a MTP program are required to sign the booking
              form signifying acceptance of all terms and conditions as outlined from time to time.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

