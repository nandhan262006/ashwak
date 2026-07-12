"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button, Card } from "flowbite-react";
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
    let ignore = false;
    fetch("/api/admin/gallery").then((r) => r.json()).then((data) => {
      if (!ignore) setItems(data);
    });
    return () => { ignore = true; };
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
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Gallery</h1>
        <Link href="/admin/gallery/new">
          <Button size="sm">Add Image</Button>
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <img src={item.src} alt={item.alt || item.title} className="h-48 w-full object-cover" />
            <div className="p-3">
              <p className="text-sm font-medium text-white truncate">{item.title}</p>
              <div className="mt-2 flex gap-2">
                <Link href={`/admin/gallery/${item.id}`}><Button size="xs" color="info">Edit</Button></Link>
                <Button size="xs" color="failure" onClick={() => setDeleteId(item.id)}>Delete</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <DeleteConfirm open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} title="Delete this image?" loading={loading} />
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
