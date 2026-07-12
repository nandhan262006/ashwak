"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { HiPlus, HiPencilSquare, HiTrash } from "react-icons/hi2";
import DeleteConfirm from "@/components/admin/DeleteConfirm";
import Toast from "@/components/admin/Toast";

interface Service {
  id: string;
  title: string;
  subtitle: string | null;
  image: string | null;
  sortOrder: number;
  isActive: boolean;
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    fetch("/api/admin/services").then((r) => r.json()).then(setServices);
  }, []);

  const refetch = () => {
    fetch("/api/admin/services").then((r) => r.json()).then(setServices);
  };

  async function handleDelete() {
    if (!deleteId) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/services/${deleteId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed");
      setToast({ message: "Service deleted", type: "success" });
      refetch();
    } catch {
      setToast({ message: "Failed to delete service", type: "error" });
    } finally {
      setLoading(false);
      setDeleteId(null);
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Services</h1>
          <p className="text-white/40 text-sm mt-1">Manage your photography services</p>
        </div>
        <Link
          href="/admin/services/new"
          className="flex items-center gap-2 bg-[#D4AF37] text-[#0c0c0c] px-4 py-2.5 rounded-xl font-medium text-sm hover:opacity-90 transition-opacity"
        >
          <HiPlus className="w-4 h-4" />
          Add Service
        </Link>
      </div>

      {/* Services grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-[#111111] border border-white/5 rounded-2xl overflow-hidden hover:border-[#D4AF37]/30 transition-all"
          >
            {service.image ? (
              <div className="relative h-48">
                <Image src={service.image} alt={service.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
            ) : (
              <div className="h-48 bg-gradient-to-br from-[#D4AF37]/10 to-[#B8960E]/10 flex items-center justify-center">
                <span className="text-white/20 text-4xl">📷</span>
              </div>
            )}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-white font-medium">{service.title}</h3>
                  {service.subtitle && (
                    <p className="text-white/40 text-sm mt-0.5">{service.subtitle}</p>
                  )}
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${service.isActive ? "bg-green-500/20 text-green-400" : "bg-white/10 text-white/40"}`}>
                  {service.isActive ? "Active" : "Inactive"}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-4">
                <Link
                  href={`/admin/services/${service.id}`}
                  className="flex-1 flex items-center justify-center gap-2 bg-white/5 text-white px-3 py-2 rounded-xl text-sm hover:bg-white/10 transition-colors"
                >
                  <HiPencilSquare className="w-4 h-4" />
                  Edit
                </Link>
                <button
                  onClick={() => setDeleteId(service.id)}
                  className="flex items-center justify-center gap-2 bg-red-500/10 text-red-400 px-3 py-2 rounded-xl text-sm hover:bg-red-500/20 transition-colors"
                >
                  <HiTrash className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {services.length === 0 && (
        <div className="text-center py-16 bg-[#111111] border border-white/5 rounded-2xl">
          <p className="text-white/40 mb-4">No services yet</p>
          <Link
            href="/admin/services/new"
            className="inline-flex items-center gap-2 bg-[#D4AF37] text-[#0c0c0c] px-4 py-2.5 rounded-xl font-medium text-sm hover:opacity-90 transition-opacity"
          >
            <HiPlus className="w-4 h-4" />
            Add your first service
          </Link>
        </div>
      )}

      <DeleteConfirm open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} title="Delete this service?" loading={loading} />
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
