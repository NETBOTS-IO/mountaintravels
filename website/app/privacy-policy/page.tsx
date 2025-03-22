import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const privacyPolicy = [
  {
    title: "1. Information We Collect",
    content:
      "We collect personal information that you provide to us, such as your name, email address, phone number, and travel preferences when you book a tour or sign up for our newsletter.",
  },
  {
    title: "2. How We Use Your Information",
    content:
      "We use your personal information to process your bookings, communicate with you about our services, and improve our offerings. We may also use your information for marketing purposes, but you can opt out at any time.",
  },
  {
    title: "3. Information Sharing and Disclosure",
    content:
      "We do not sell or rent your personal information to third parties. We may share your information with our trusted partners and service providers who assist us in operating our website and conducting our business.",
  },
  {
    title: "4. Data Security",
    content:
      "We implement a variety of security measures to maintain the safety of your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure.",
  },
  {
    title: "5. Cookies",
    content:
      "We use cookies to enhance your experience on our website. You can choose to have your computer warn you each time a cookie is being sent, or you can choose to turn off all cookies through your browser settings.",
  },
  {
    title: "6. Third-Party Links",
    content:
      "Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these third-party sites.",
  },
  {
    title: "7. Children's Privacy",
    content:
      "Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.",
  },
  {
    title: "8. Changes to This Privacy Policy",
    content:
      "We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.",
  },
  {
    title: "9. Your Rights",
    content:
      "You have the right to access, correct, or delete your personal information. You can contact us at any time to exercise these rights.",
  },
  {
    title: "10. Contact Us",
    content:
      "If you have any questions about this Privacy Policy, please contact us at privacy@mountaintravelspakistan.com.",
  },
]

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Privacy Policy</h1>
      <p className="mb-8 text-center text-lg">
        Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
      </p>
      <Accordion type="single" collapsible className="w-full">
        {privacyPolicy.map((policy, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-lg font-semibold">{policy.title}</AccordionTrigger>
            <AccordionContent className="text-base">{policy.content}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

