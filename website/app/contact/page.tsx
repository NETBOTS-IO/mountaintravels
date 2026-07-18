"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  contactInfo,
  faqCategories,
  officeLocations,
} from "@/data/contactContent";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import axios from "axios";
import { BASE_URL } from "@/app/Var";

export default function ContactPage() {
  const [formData, setFormData] = useState<any>({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({ ...prevData, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prevData: any) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post(`${BASE_URL}/api/contacts/add`, {
        source: "CONTACT FORM",
        name: formData.name,
        email: formData.email,
        subject: formData.interest || "General Inquiry",
        interests: formData.interest,
        phone: formData.phone,
        message: formData.message,
      });

      setIsModalOpen(true);
    } catch (error) {
      console.error("Error submitting contact form:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground pt-32 pb-24">
      {/* Hero Section */}
      <section className="relative pb-20 bg-background overflow-hidden">
        <div className="container mx-auto px-4 z-10 relative">
          <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tighter text-foreground max-w-4xl leading-tight">
            {contactInfo.title}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed max-w-3xl mt-6">
            {contactInfo.subtitle}
          </p>
        </div>
      </section>

      {/* Contact Details & Form */}
      <section className="py-16 border-t border-border bg-muted/10">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            {/* Quick Contact Info */}
            <div className="lg:col-span-5 space-y-12">
              <h2 className="font-display text-3xl font-bold tracking-tight">
                Get in Touch
              </h2>
              <div className="space-y-8 font-light text-base text-muted-foreground">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h3 className="font-display font-bold text-foreground text-lg mb-1">
                      Address
                    </h3>
                    <p className="whitespace-pre-line">
                      {contactInfo.address.street}
                    </p>
                    <p>
                      {contactInfo.address.city}, {contactInfo.address.country}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h3 className="font-display font-bold text-foreground text-lg mb-1">
                      Phone
                    </h3>
                    <a
                      href={`tel:${contactInfo.phone}`}
                      className="hover:underline text-foreground"
                    >
                      {contactInfo.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h3 className="font-display font-bold text-foreground text-lg mb-1">
                      Email
                    </h3>
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="hover:underline text-foreground"
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h3 className="font-display font-bold text-foreground text-lg mb-1">
                      Business Hours
                    </h3>
                    <p className="text-foreground">{contactInfo.hours}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Container */}
            <div className="lg:col-span-7 bg-card border border-border p-8 md:p-12 shadow-xl">
              <h2 className="font-display text-3xl font-bold tracking-tight mb-8">
                Send a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-semibold text-foreground/80"
                    >
                      Name <span className="text-primary">*</span>
                    </label>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      required
                      onChange={handleInputChange}
                      className="w-full h-12 bg-background border-border text-foreground focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-semibold text-foreground/80"
                    >
                      Email Address <span className="text-primary">*</span>
                    </label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      required
                      onChange={handleInputChange}
                      className="w-full h-12 bg-background border-border text-foreground focus:ring-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block mb-2 text-sm font-semibold text-foreground/80"
                    >
                      Phone Number
                    </label>
                    <Input
                      type="text"
                      id="phone"
                      name="phone"
                      onChange={handleInputChange}
                      className="w-full h-12 bg-background border-border text-foreground focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="interest"
                      className="block mb-2 text-sm font-semibold text-foreground/80"
                    >
                      I am interested in <span className="text-primary">*</span>
                    </label>
                    <Select
                      onValueChange={(value) =>
                        handleSelectChange("interest", value)
                      }
                    >
                      <SelectTrigger className="w-full h-12 bg-background border-border text-foreground focus:ring-primary">
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
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block mb-2 text-sm font-semibold text-foreground/80"
                  >
                    Your Message <span className="text-primary">*</span>
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    onChange={handleInputChange}
                    className="w-full min-h-[150px] bg-background border-border text-foreground focus:ring-primary"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full py-6 text-base font-semibold"
                >
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="font-display text-4xl font-bold tracking-tighter text-foreground mb-16 text-center">
            Our Offices
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {officeLocations.map((office, index) => (
              <div
                key={index}
                className="bg-card border border-border p-8 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-display text-2xl font-bold text-foreground">
                    {office.city}
                  </h3>
                  {office.mainOffice && (
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                      Main Office
                    </span>
                  )}
                </div>
                <p className="text-muted-foreground font-light leading-relaxed mb-6">
                  {office.address}
                </p>

                <div className="space-y-3 pt-6 border-t border-border text-muted-foreground font-light">
                  {Array.isArray(office.phone) ? (
                    office.phone.map((phone, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-primary shrink-0" />
                        <a
                          href={`tel:${phone}`}
                          className="hover:underline hover:text-foreground"
                        >
                          {phone}
                        </a>
                      </div>
                    ))
                  ) : (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-primary shrink-0" />
                      <a
                        href={`tel:${office.phone}`}
                        className="hover:underline hover:text-foreground"
                      >
                        {office.phone}
                      </a>
                    </div>
                  )}

                  {Array.isArray(office.email) ? (
                    office.email.map((email, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-primary shrink-0" />
                        <a
                          href={`mailto:${email}`}
                          className="hover:underline hover:text-foreground"
                        >
                          {email}
                        </a>
                      </div>
                    ))
                  ) : (
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-primary shrink-0" />
                      <a
                        href={`mailto:${office.email}`}
                        className="hover:underline hover:text-foreground"
                      >
                        {office.email}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-24 bg-muted/50 border-t border-border">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="font-display text-4xl font-bold tracking-tighter text-foreground mb-16 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-12">
            {faqCategories.map((category, index) => (
              <div key={index} className="space-y-6">
                <h3 className="font-display text-2xl font-bold text-primary border-b border-border pb-2">
                  {category.category}
                </h3>
                <Accordion
                  type="single"
                  collapsible
                  className="w-full space-y-4"
                >
                  {category.questions.map((faq, faqIndex) => (
                    <AccordionItem
                      key={faqIndex}
                      value={`faq-${index}-${faqIndex}`}
                      className="border-b border-border py-2 bg-background/50 px-4"
                    >
                      <AccordionTrigger className="font-display font-bold text-lg hover:text-primary transition-colors text-left py-4">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground font-light text-base leading-relaxed pt-2 pb-6">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl font-bold">
              Thank you for contacting us!
            </DialogTitle>
            <DialogDescription className="text-base font-light mt-2">
              We have received your message and will get back to you as soon as
              possible.
            </DialogDescription>
          </DialogHeader>
          <div className="pt-4 flex justify-end">
            <Button onClick={() => setIsModalOpen(false)} className="px-6">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
