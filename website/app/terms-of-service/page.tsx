import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const termsOfService = [
  {
    title: "1. Acceptance of Terms",
    content:
      "By accessing and using Mountain Travels Pakistan's services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.",
  },
  {
    title: "2. Use of Services",
    content:
      "You agree to use our services only for lawful purposes and in accordance with these Terms of Service. You are prohibited from using our services in any way that could damage, disable, overburden, or impair our servers or networks.",
  },
  {
    title: "3. Booking and Cancellation",
    content:
      "All bookings are subject to availability. Cancellation policies vary depending on the tour package. Please refer to the specific tour details for cancellation terms.",
  },
  {
    title: "4. Payment",
    content:
      "Payment terms are as specified in the booking process. All prices are subject to change without notice until your booking is confirmed.",
  },
  {
    title: "5. Liability",
    content:
      "Mountain Travels Pakistan is not liable for any direct, indirect, incidental, or consequential damages arising from the use of our services or participation in our tours.",
  },
  {
    title: "6. Travel Insurance",
    content:
      "We strongly recommend that all clients obtain comprehensive travel insurance. Mountain Travels Pakistan is not responsible for any losses or damages that could have been covered by travel insurance.",
  },
  {
    title: "7. Changes to Tours",
    content:
      "We reserve the right to make changes to any tour if we deem it necessary due to circumstances beyond our control or for the safety of our clients.",
  },
  {
    title: "8. Intellectual Property",
    content:
      "All content on our website, including text, graphics, logos, and images, is the property of Mountain Travels Pakistan and protected by copyright laws.",
  },
  {
    title: "9. Governing Law",
    content: "These Terms of Service shall be governed by and construed in accordance with the laws of Pakistan.",
  },
  {
    title: "10. Changes to Terms",
    content:
      "We reserve the right to modify these Terms of Service at any time. Your continued use of our services after any changes indicates your acceptance of the new terms.",
  },
]

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Terms of Service</h1>
      <p className="mb-8 text-center text-lg">
        Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
      </p>
      <Accordion type="single" collapsible className="w-full">
        {termsOfService.map((term, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-lg font-semibold">{term.title}</AccordionTrigger>
            <AccordionContent className="text-base">{term.content}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

