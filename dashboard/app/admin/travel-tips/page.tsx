"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getTravelTips, deleteTravelTip } from "@/lib/data-utils";
import { toast } from "react-hot-toast";
import { Eye, Pencil, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TravelTipsListPage() {
  const [tips, setTips] = useState<any[]>([]);

  useEffect(() => {
    async function loadData() {
      const data = await getTravelTips();
      if (data) setTips(data);
    }
    loadData();
  }, []);

  const handleDelete = async (id: string) => {
    const res = await deleteTravelTip(id);
    if (res) {
      toast.success("Travel Tip deleted");
      setTips(tips.filter((t) => t._id !== id));
    } else {
      toast.error("Failed to delete");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Travel Tips</h1>
        <Link href="/admin/travel-tips/add">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Travel Tip
          </Button>
        </Link>
      </div>

      {tips.length === 0 ? (
        <p>No travel tips found</p>
      ) : (
        <ul className="space-y-4">
          {tips.map((tip) => (
            <li
              key={tip._id}
              className="border p-4 rounded flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{tip.title}</p>
                <p className="text-sm text-gray-500">{tip.excerpt}</p>
              </div>
              <div className="flex space-x-3">
                <Link href={`/admin/travel-tips/view/${tip._id}`}>
                  <Eye className="w-5 h-5 text-blue-600 hover:text-blue-800 cursor-pointer" />
                </Link>
                <Link href={`/admin/travel-tips/edit/${tip._id}`}>
                  <Pencil className="w-5 h-5 text-green-600 hover:text-green-800 cursor-pointer" />
                </Link>
                <Trash2
                  className="w-5 h-5 text-red-600 hover:text-red-800 cursor-pointer"
                  onClick={() => handleDelete(tip._id)}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
