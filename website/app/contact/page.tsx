"use client"

import { useState } from "react"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { contactInfo, contactFormFields, faqCategories, officeLocations } from "@/data/contactContent"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import axios from "axios"
import { BASE_URL } from "@/app/Var"

export default function ContactPage() {
  const [formData, setFormData] = useState({})
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BASE_URL}/api/contacts/add`, {
        source: "CONTACT FORM",
        name: formData.name,          // ✅ required
        email: formData.email,        // ✅ required
        subject: formData.interest || "General Inquiry", // ✅ backend requires subject
        interests: formData.interest, // optional
        phone: formData.phone,        // optional
        message: formData.message,    // ✅ required
      });

      console.log("Contact form submitted:", formData);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error submitting contact form:", error);
    }
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{contactInfo.title}</h1>
          <p className="text-xl md:text-2xl">{contactInfo.subtitle}</p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="w-6 h-6 text-primary mr-4 mt-1" />
                  <div>
                    <h3 className="font-bold mb-1">Address</h3>
                    <p>{contactInfo.address.street}</p>
                    <p>
                      {contactInfo.address.city}, {contactInfo.address.country}
                    </p>
                    <a
                      href={contactInfo.address.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      View on Map
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="w-6 h-6 text-primary mr-4 mt-1" />
                  <div>
                    <h3 className="font-bold mb-1">Phone</h3>
                    <a href={`tel:${contactInfo.phone}`} className="hover:underline">
                      {contactInfo.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="w-6 h-6 text-primary mr-4 mt-1" />
                  <div>
                    <h3 className="font-bold mb-1">Email</h3>
                    <a href={`mailto:${contactInfo.email}`} className="hover:underline">
                      {contactInfo.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="w-6 h-6 text-primary mr-4 mt-1" />
                  <div>
                    <h3 className="font-bold mb-1">Business Hours</h3>
                    <p>{contactInfo.hours}</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-8">Contact Form</h2>
              <form onSubmit={handleSubmit} className="space-y-6">

                {/* Name */}
                <div>
                  <label htmlFor="name" className="block mb-2 font-medium">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    required
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block mb-2 font-medium">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    required
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block mb-2 font-medium">
                    Phone
                  </label>
                  <Input
                    type="text"
                    id="phone"
                    name="phone"
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </div>

                {/* Interest (used as Subject in backend) */}
                <div>
                  <label htmlFor="interest" className="block mb-2 font-medium">
                    Interest / Subject <span className="text-red-500">*</span>
                  </label>
                  <Select onValueChange={(value) => handleSelectChange("interest", value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="expedition">Expedition</SelectItem>
                      <SelectItem value="trekking">Trekking</SelectItem>
                      <SelectItem value="sightseeing">Sightseeing</SelectItem>
                      <SelectItem value="general">General Inquiry</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block mb-2 font-medium">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </div>

                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Offices</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {officeLocations.map((office, index) => (
              <div key={index} className="border rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">{office.city}</h3>
                <p className="mb-2">{office.address}</p>

                {/* Display multiple phone numbers */}
                {Array.isArray(office.phone) ? (
                  office.phone.map((phone, idx) => (
                    <p key={idx} className="mb-2">
                      <Phone className="inline-block w-4 h-4 mr-2" />
                      <a href={`tel:${phone}`} className="hover:underline">
                        {phone}
                      </a>
                    </p>
                  ))
                ) : (
                  <p className="mb-2">
                    <Phone className="inline-block w-4 h-4 mr-2" />
                    <a href={`tel:${office.phone}`} className="hover:underline">
                      {office.phone}
                    </a>
                  </p>
                )}

                {/* Display multiple emails */}
                {Array.isArray(office.email) ? (
                  office.email.map((email, idx) => (
                    <p key={idx} className="mb-2">
                      <Mail className="inline-block w-4 h-4 mr-2" />
                      <a href={`mailto:${email}`} className="hover:underline">
                        {email}
                      </a>
                    </p>
                  ))
                ) : (
                  <p className="mb-2">
                    <Mail className="inline-block w-4 h-4 mr-2" />
                    <a href={`mailto:${office.email}`} className="hover:underline">
                      {office.email}
                    </a>
                  </p>
                )}

                {office.mainOffice && (
                  <span className="bg-primary text-white px-2 py-1 rounded-full text-sm">Main Office</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {faqCategories.map((category, index) => (
              <div key={index}>
                <h3 className="text-xl font-bold mb-4">{category.category}</h3>
                <ul className="space-y-4">
                  {category.questions.map((faq, faqIndex) => (
                    <li key={faqIndex}>
                      <h4 className="font-bold mb-2">{faq.question}</h4>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thank you for contacting us!</DialogTitle>
            <DialogDescription>
              We have received your message and will get back to you as soon as possible.
            </DialogDescription>
          </DialogHeader>
          <Button onClick={() => setIsModalOpen(false)}>Close</Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}
