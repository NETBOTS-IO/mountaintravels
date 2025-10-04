"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getTrustedCompanyById } from "@/lib/data-utils";
import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/Var";

export default function ViewCompanyPage() {
  const { id } = useParams<{ id: string }>();
  const [company, setCompany] = useState<any | null>(null);

  useEffect(() => {
    async function loadData() {
      if (id) {
        const res = await getTrustedCompanyById(id);
        if (res?.success) setCompany(res.data);
      }
    }
    loadData();
  }, [id]);

  if (!company) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <div className="mb-6">
        <Link href="/admin/trusted-companies">
          <Button variant="outline">← Back to Companies</Button>
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-4">{company.name}</h1>

      {company.image && (
        <img
          src={`${BASE_URL}${company.image}`}
          alt={company.name}
          className="w-48 h-24 object-contain rounded mb-4 border"
        />
      )}
    </div>
  );
}
