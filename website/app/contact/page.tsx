"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  Send,
  CheckCircle,
  Home,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  contactIntro,
  officeLocations,
  officeHours,
  quickContacts,
  faqs,
} from "@/data/contactContent";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API request
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setSubmitSuccess(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground pt-24 pb-20">
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 py-4 max-w-5xl">
        <nav className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
          <Link
            href="/"
            className="hover:text-primary flex items-center gap-1 transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            Home
          </Link>
          <ChevronRight className="w-3 h-3 shrink-0" />
          <span className="text-foreground font-semibold">Contact Us</span>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="relative pb-12 bg-background overflow-hidden">
        <div className="container mx-auto px-4 z-10 relative max-w-5xl">
          <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-foreground max-w-3xl leading-tight">
            {contactIntro.title}
          </h1>
          <p className="text-base md:text-lg text-muted-foreground font-light leading-relaxed max-w-3xl mt-4">
            {contactIntro.description}
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-12 border-t border-border bg-muted/10">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-7 bg-card border border-border p-6 rounded-lg shadow-sm">
              <h2 className="font-display text-2xl font-bold mb-6 text-foreground">
                Send Us a Message
              </h2>
              {submitSuccess ? (
                <div className="bg-primary/10 border border-primary text-foreground p-6 rounded-lg flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg text-primary">
                      Message Sent Successfully!
                    </h3>
                    <p className="text-sm font-light mt-1 text-muted-foreground">
                      Thank you for contacting Mountain Travels Pakistan. Our
                      travel specialists will review your message and get back
                      to you within 24 hours.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label
                        htmlFor="name"
                        className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                      >
                        Full Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                        className="bg-background"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label
                        htmlFor="email"
                        className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                      >
                        Email Address
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                        className="bg-background"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label
                      htmlFor="subject"
                      className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                    >
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Planning a customized trip"
                      required
                      className="bg-background"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label
                      htmlFor="message"
                      className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                    >
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your travel plans..."
                      rows={5}
                      required
                      className="bg-background resize-none"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 py-4 text-sm font-semibold"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-5 space-y-6">
              {/* Office details */}
              <div className="bg-card border border-border p-6 rounded-lg shadow-sm space-y-6">
                <h3 className="font-display font-bold text-lg text-primary flex items-center gap-2 border-b border-border pb-3">
                  <MapPin className="w-5 h-5" />
                  Our Offices
                </h3>
                <div className="space-y-5">
                  {officeLocations.map((loc, idx) => (
                    <div key={idx} className="space-y-1 text-sm font-light">
                      <p className="font-bold text-foreground">{loc.title}</p>
                      <p className="text-muted-foreground text-xs leading-relaxed">
                        {loc.address}
                      </p>
                      <p className="text-xs font-medium text-foreground">
                        Phone: {loc.phone}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-border">
                  <p className="text-xs font-semibold text-foreground uppercase tracking-wider mb-1">
                    Office Hours
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {officeHours.days}: {officeHours.hours}
                  </p>
                  <p className="text-xs text-primary font-medium mt-1">
                    {officeHours.note}
                  </p>
                </div>
              </div>

              {/* Quick Contacts */}
              <div className="bg-card border border-border p-6 rounded-lg shadow-sm">
                <h3 className="font-display font-bold text-lg mb-4 text-primary flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Direct Contacts
                </h3>
                <div className="space-y-4">
                  <a
                    href={`https://wa.me/${quickContacts.whatsapp.replace(/\+/g, "").replace(/\s/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-foreground">
                        WhatsApp Support
                      </p>
                      <p>{quickContacts.whatsapp}</p>
                    </div>
                  </a>
                  <a
                    href={`mailto:${quickContacts.email}`}
                    className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-foreground">
                        General Support
                      </p>
                      <p className="break-all">{quickContacts.email}</p>
                    </div>
                  </a>
                  <a
                    href={`mailto:${quickContacts.secondaryEmail}`}
                    className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border-2 border-primary/20 group-hover:border-primary transition-colors">
                      <Image
                        src="/assets/team/staff1.webp"
                        alt="Ghulam Ahmad, Founder & Chairman"
                        width={40}
                        height={40}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-foreground">
                        Ghulam Ahmad
                      </p>
                      <p className="text-[10px] uppercase tracking-wider text-primary mb-0.5">
                        Founder & Chairman
                      </p>
                      <p className="break-all text-xs">
                        {quickContacts.secondaryEmail}
                      </p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="font-display text-3xl font-bold text-foreground mb-10 text-center">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="w-full space-y-2">
            {faqs.map((faq, idx) => (
              <AccordionItem
                key={idx}
                value={`item-${idx}`}
                className="border-b border-border py-1"
              >
                <AccordionTrigger className="font-display font-semibold text-base hover:text-primary transition-colors text-left py-3">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground font-light text-sm leading-relaxed pt-1 pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
}
