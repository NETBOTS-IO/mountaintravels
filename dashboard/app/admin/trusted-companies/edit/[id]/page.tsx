"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getTrustedCompanyById } from "@/lib/data-utils";
import TrustedCompanyForm from "@/components/TrustedCompanyForm";
import { toast } from "react-hot-toast";

export default function EditCompanyPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [company, setCompany] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCompany() {
      try {
        const data = await getTrustedCompanyById(id);
        if (data?.success && data.data) {
          setCompany(data.data);
        } else {
          toast.error("Company not found");
          router.push("/admin/trusted-companies");
        }
      } catch (err) {
        toast.error("Failed to load company");
      } finally {
        setLoading(false);
      }
    }
    if (id) loadCompany();
  }, [id, router]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!company) return <p className="p-6">Company not found.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Trusted Company</h1>
      <TrustedCompanyForm companyId={company._id} initialData={company} />
    </div>
  );
}
