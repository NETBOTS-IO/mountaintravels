import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata = {
  title: "Booking Information | Mountain Travels Pakistan",
  description:
    "General booking information, cancellations, participant responsibilities, and liability details.",
};

export default function BookingInfoPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground pt-32 pb-24">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header Section */}
        <header className="mb-16">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-foreground leading-tight">
            General Booking Information
          </h1>
          <p className="text-xl text-muted-foreground font-light leading-relaxed mt-4">
            Essential guidelines, booking requirements, cancellation policies,
            and participant responsibilities.
          </p>
        </header>

        {/* Content Section using Accordions */}
        <section className="bg-card border border-border p-8 md:p-12 shadow-xl">
          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem
              value="what-to-bring"
              className="border-b border-border py-2"
            >
              <AccordionTrigger className="font-display font-bold text-xl hover:text-primary transition-colors text-left py-4">
                What to Bring
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground font-light text-base leading-relaxed pt-2 pb-6 space-y-4">
                <p>
                  Mountain Travels Pakistan (MTP) ensures that all essential
                  accommodations, meals, and transportation needs are covered,
                  as detailed in our specific tour itineraries (with any
                  exceptions duly notified).
                </p>
                <p>
                  For our trekking and climbing programs, participants are
                  required to bring their personal equipment, suitable mountain
                  attire, and necessary medical supplies. A comprehensive
                  packing list will be provided once your reservation is
                  confirmed and the deposit is received.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="booking-confirmation"
              className="border-b border-border py-2"
            >
              <AccordionTrigger className="font-display font-bold text-xl hover:text-primary transition-colors text-left py-4">
                Booking Confirmation
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground font-light text-base leading-relaxed pt-2 pb-6 space-y-4">
                <p>
                  Bookings can be made by mailing or faxing a program
                  registration form together with a deposit (certified cheque,
                  cash or money order) of $100 (US).
                </p>
                <p>
                  The balance of the tour price is due and payable 8 weeks prior
                  to the tour departure date. Tour programs booked within the 8
                  week period are due and payable in full at the time of
                  booking.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="refund-cancellation"
              className="border-b border-border py-2"
            >
              <AccordionTrigger className="font-display font-bold text-xl hover:text-primary transition-colors text-left py-4">
                Refund and Cancellation Policy
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground font-light text-base leading-relaxed pt-2 pb-6 space-y-4">
                <p>
                  All cancellations must be confirmed in writing by fax, mail or
                  e-mail directly to MTP. Cancellations made prior to receipt of
                  final payment are subject to a $50 (US) processing fee.
                </p>
                <p>
                  Cancellations made after final payment but prior to 30 days
                  before departure date will be subject to a refund equal to 50%
                  of the total tour program cost. Cancellations made less than
                  30 days prior to departure will be subject to a 100% deduction
                  of prior deposits/ payments.
                </p>
                <p>
                  We would be pleased to transfer all monies received, less than
                  $50 (US) processing fee, should you wish to book a different
                  tour program or departure date, subject to space availability.
                  No refund(s) will be given for any unused portion of the trip
                  with respect to air and ground transportation, meals,
                  accommodation and tour services.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="participant-responsibilities"
              className="border-b border-border py-2"
            >
              <AccordionTrigger className="font-display font-bold text-xl hover:text-primary transition-colors text-left py-4">
                Participant Responsibilities
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground font-light text-base leading-relaxed pt-2 pb-6 space-y-4">
                <p>
                  It is the responsibility of each individual participant to
                  have adequate medical, cancellation and accident insurance
                  coverage, in the event that it is required. Travel visas,
                  medical vaccinations and other such required documents are to
                  be arranged by the participant prior to departure.
                </p>
                <p>
                  MTP reserves the right to cancel your trip if it is not
                  satisfied that you have:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Adequate insurance coverage;</li>
                  <li>
                    Demonstrated good physical health and responsible behaviour
                    on the tour, in order that undue harm not be taken with the
                    health and safety of yourself and other participant(s).
                  </li>
                </ul>
                <p className="mt-4">
                  Upon the start of the journey, participant(s) are to respect
                  and abide by the expressed authority of the local tour leader
                  concerning all matters of travel logistics throughout the
                  itinerary dates.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="limitations-liabilities"
              className="border-none py-2"
            >
              <AccordionTrigger className="font-display font-bold text-xl hover:text-primary transition-colors text-left py-4">
                Limitations/Liabilities
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground font-light text-base leading-relaxed pt-2 pb-6 space-y-4">
                <p>
                  While Mountain Travels Pakistan [MTP] makes every effort to
                  assure the highest quality tour programs, MTP shall not, in
                  any event whatsoever, be responsible in any way for personal
                  injury, loss or damage to baggage and/or personal property,
                  illness or death, or for any damages or claims sustained by
                  the participant(s) arising out of the participant's
                  involvement in our tours.
                </p>
                <p>
                  Upon booking with MTP, you accept and understand that there is
                  an element of risk and hazard to partaking in adventure
                  programs of this nature. Any and all matters of unforeseen
                  circumstances may occur, resulting in routing, mode of
                  transport, accommodation and unfulfilled portions of the
                  itinerary.
                </p>
                <p>
                  MTP will not be responsible for itinerary delays, changes and
                  cancellations and resulting expenses incurred by
                  participant(s) due to inclement weather, natural disasters
                  (i.e. landslides, avalanches, earthquakes, flooding, etc),
                  mechanical breakdowns, flight cancellations, political unrest
                  and local strikes. Such changes, substitutions and
                  cancellations made necessary due to the above-noted and
                  related conditions may be made by MTP at any time and without
                  notice.
                </p>
                <p className="font-medium text-foreground">
                  Participant(s) booked and confirmed on a MTP program are
                  required to sign the booking form signifying acceptance of all
                  terms and conditions as outlined from time to time.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </div>
    </div>
  );
}
