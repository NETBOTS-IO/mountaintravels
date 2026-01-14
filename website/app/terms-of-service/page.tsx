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
      "We reserve the right to make changes to any tour if deemed necessary due to circumstances beyond our control or for the safety of our clients.",
  },
  {
    title: "8. Intellectual Property",
    content:
      "All content on our website, including text, graphics, logos, and images, is the property of Mountain Travels Pakistan and is protected by copyright laws.",
  },
  {
    title: "9. Governing Law",
    content:
      "These Terms of Service shall be governed by and construed in accordance with the laws of Pakistan.",
  },
  {
    title: "10. Changes to Terms",
    content:
      "We reserve the right to modify these Terms of Service at any time. Continued use of our services after changes indicates acceptance of the updated terms.",
  },
]

export default function TermsOfServicePage() {
  return (
    <section className="py-14 md:py-20 bg-trusted">
      <div className="container mx-auto px-4">
        {/* Big Card */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            Terms of Service
          </h1>

          <p className="mb-10 text-center text-muted-foreground">
            Last updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          {/* Terms Content */}
          <div className="space-y-8 text-gray-700 leading-relaxed">
            {termsOfService.map((term, index) => (
              <div key={index}>
                <h2 className="text-xl font-semibold mb-2">
                  {term.title}
                </h2>
                <p>{term.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
