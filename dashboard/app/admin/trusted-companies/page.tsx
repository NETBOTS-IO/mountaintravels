"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getTrustedCompanies, deleteTrustedCompany } from "@/lib/data-utils";
import { toast } from "react-hot-toast";
import { Eye, Pencil, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/Var";

export default function TrustedCompaniesListPage() {
  const [companies, setCompanies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await getTrustedCompanies();
        if (res && Array.isArray(res)) {
          setCompanies(res);
        } else if (res?.data && Array.isArray(res.data)) {
          setCompanies(res.data);
        } else {
          setCompanies([]);
        }
      } catch (err) {
        console.error("Error loading companies:", err);
        toast.error("Failed to load companies");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleDelete = async (id: string) => {
    const res = await deleteTrustedCompany(id);
    if (res) {
      toast.success("Company deleted");
      setCompanies((prev) => prev.filter((c) => c._id !== id));
    } else {
      toast.error("Failed to delete");
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <p>Loading trusted companies...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Trusted Companies</h1>
        <Link href="/admin/trusted-companies/add">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Company
          </Button>
        </Link>
      </div>

      {companies.length === 0 ? (
        <p>No trusted companies found</p>
      ) : (
        <ul className="space-y-4">
          {companies.map((c) => (
            <li
              key={c._id}
              className="border p-4 rounded flex justify-between items-center"
            >
              <div className="flex items-center gap-4">
                {c.image && (
                  <img
                    src={`${BASE_URL}${c.image}`}
                    alt={c.name}
                    className="w-20 h-10 object-contain border rounded"
                  />
                )}
                <p className="font-semibold">{c.name}</p>
              </div>
              <div className="flex space-x-3">
                <Link href={`/admin/trusted-companies/view/${c._id}`}>
                  <Eye className="w-5 h-5 text-blue-600 hover:text-blue-800 cursor-pointer" />
                </Link>
                <Link href={`/admin/trusted-companies/edit/${c._id}`}>
                  <Pencil className="w-5 h-5 text-green-600 hover:text-green-800 cursor-pointer" />
                </Link>
                <Trash2
                  className="w-5 h-5 text-red-600 hover:text-red-800 cursor-pointer"
                  onClick={() => handleDelete(c._id)}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
