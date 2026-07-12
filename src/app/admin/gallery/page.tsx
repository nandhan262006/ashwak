"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { HiPlus, HiPencilSquare, HiTrash, HiArrowUpTray } from "react-icons/hi2";
import DeleteConfirm from "@/components/admin/DeleteConfirm";
import Toast from "@/components/admin/Toast";

interface GalleryItem {
  id: string;
  title: string;
  src: string;
  alt: string | null;
  span: string | null;
  isActive: boolean;
}

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    fetch("/api/admin/gallery").then((r) => r.json()).then(setItems);
  }, []);

  const refetch = () => {
    fetch("/api/admin/gallery").then((r) => r.json()).then(setItems);
  };

  async function handleDelete() {
    if (!deleteId) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/gallery/${deleteId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed");
      setToast({ message: "Image deleted", type: "success" });
      refetch();
    } catch {
      setToast({ message: "Failed to delete image", type: "error" });
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
          <h1 className="text-2xl font-bold text-white">Gallery</h1>
          <p className="text-white/40 text-sm mt-1">Manage your portfolio images</p>
        </div>
        <Link
          href="/admin/gallery/new"
          className="flex items-center gap-2 bg-[#D4AF37] text-[#0c0c0c] px-4 py-2.5 rounded-xl font-medium text-sm hover:opacity-90 transition-opacity"
        >
          <HiPlus className="w-4 h-4" />
          Add Image
        </Link>
      </div>

      {/* Gallery grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="group bg-[#111111] border border-white/5 rounded-2xl overflow-hidden hover:border-[#D4AF37]/30 transition-all"
          >
            <div className="relative aspect-square">
              <Image src={item.src} alt={item.alt || item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <div className="w-full flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium truncate">{item.title}</p>
                    <p className="text-white/50 text-xs">{item.span || "Default"}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/gallery/${item.id}`}
                      className="p-2 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors"
                    >
                      <HiPencilSquare className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => setDeleteId(item.id)}
                      className="p-2 bg-red-500/20 text-red-400 rounded-xl hover:bg-red-500/30 transition-colors"
                    >
                      <HiTrash className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
              {!item.isActive && (
                <div className="absolute top-3 left-3 px-2 py-1 bg-white/10 text-white/50 text-xs rounded-full">
                  Inactive
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <div className="text-center py-16 bg-[#111111] border border-white/5 rounded-2xl">
          <div className="w-16 h-16 mx-auto rounded-full bg-white/5 flex items-center justify-center mb-4">
            <HiArrowUpTray className="w-8 h-8 text-white/30" />
          </div>
          <p className="text-white/40 mb-4">No gallery images yet</p>
          <Link
            href="/admin/gallery/new"
            className="inline-flex items-center gap-2 bg-[#D4AF37] text-[#0c0c0c] px-4 py-2.5 rounded-xl font-medium text-sm hover:opacity-90 transition-opacity"
          >
            <HiPlus className="w-4 h-4" />
            Add your first image
          </Link>
        </div>
      )}

      <DeleteConfirm open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} title="Delete this image?" loading={loading} />
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}