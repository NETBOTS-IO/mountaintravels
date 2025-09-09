"use client";

import TrustedCompanyForm from "@/components/TrustedCompanyForm";

export default function AddCompanyPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Add Trusted Company</h1>
      <TrustedCompanyForm />
    </div>
  );
}
