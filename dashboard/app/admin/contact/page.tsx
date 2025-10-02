"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { getContacts } from "@/lib/data-utils";

interface ContactEntry {
  _id: string;
  source: string;
  name: string;
  email: string;
  phone: string;
  interests: string;
  subject: string;
  message: string;
  createdAt: string;
}

export default function ContactPage() {
  const [contacts, setContacts] = useState<ContactEntry[]>([]);
  const [newsletterSubs, setNewsletterSubs] = useState<ContactEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadContacts() {
      try {
        setLoading(true);
        const res = await getContacts();
        if (res?.success) {
          // Separate contacts and newsletter
          const allData = res.data || [];
          setContacts(allData.filter((item: ContactEntry) => item.source === "CONTACT FORM"));
          setNewsletterSubs(allData.filter((item: ContactEntry) => item.source === "NEWSLETTER"));
        } else {
          setError("Failed to load contacts");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch contacts");
      } finally {
        setLoading(false);
      }
    }
    loadContacts();
  }, []);

  if (loading) return <p className="p-6">Loading contacts...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="p-6 space-y-12">
      <h1 className="text-2xl font-bold mb-6">Contact & Newsletter Submissions</h1>

      {/* Contact Form Submissions */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Contact Form Submissions</h2>
        {contacts.length === 0 ? (
          <p>No contact form submissions yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Email</th>
                  <th className="p-2 border">Phone</th>
                  <th className="p-2 border">Interests</th>
                  <th className="p-2 border">Subject</th>
                  <th className="p-2 border">Message</th>
                  <th className="p-2 border">Created At</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((entry) => (
                  <tr key={entry._id} className="hover:bg-gray-50">
                    <td className="p-2 border">{entry.name}</td>
                    <td className="p-2 border">{entry.email}</td>
                    <td className="p-2 border">{entry.phone || "-"}</td>
                    <td className="p-2 border capitalize">{entry.interests}</td>
                    <td className="p-2 border">{entry.subject}</td>
                    <td className="p-2 border">{entry.message}</td>
                    <td className="p-2 border">
                      {format(new Date(entry.createdAt), "PPpp")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Newsletter Subscriptions */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Newsletter Subscriptions</h2>
        {newsletterSubs.length === 0 ? (
          <p>No newsletter subscriptions yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-2 border">Email</th>
                  <th className="p-2 border">Subscribed At</th>
                </tr>
              </thead>
              <tbody>
                {newsletterSubs.map((entry) => (
                  <tr key={entry._id} className="hover:bg-gray-50">
                    <td className="p-2 border">{entry.email}</td>
                    <td className="p-2 border">
                      {format(new Date(entry.createdAt), "PPpp")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
