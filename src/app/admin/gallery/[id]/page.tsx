"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { Button, TextInput, Label, Card, Select } from "flowbite-react";
import FileUpload from "@/components/admin/FileUpload";
import Toast from "@/components/admin/Toast";

export default function EditGalleryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [form, setForm] = useState({ title: "", src: "", alt: "", span: "col-span-1 row-span-1", sortOrder: 0, isActive: true });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    fetch(`/api/admin/gallery/${id}`)
      .then((r) => r.json())
      .then((item) => {
        if (item && !item.error) setForm({ title: item.title, src: item.src, alt: item.alt || "", span: item.span || "col-span-1 row-span-1", sortOrder: item.sortOrder, isActive: item.isActive });
      })
      .finally(() => setFetching(false));
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/gallery/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setToast({ message: "Image updated", type: "success" });
      setTimeout(() => router.push("/admin/gallery"), 500);
    } catch {
      setToast({ message: "Failed to update image", type: "error" });
      setLoading(false);
    }
  }

  if (fetching) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl">
      <h1 className="mb-4 text-2xl font-bold text-white">Edit Gallery Image</h1>
      <Card>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <Label htmlFor="title" className="mb-2 block">Title</Label>
            <TextInput id="title" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </div>
          <div>
            <Label className="mb-2 block">Image</Label>
            {form.src && <img src={form.src} alt="Preview" className="mb-2 h-32 w-32 object-cover rounded" />}
            <FileUpload onUpload={(url) => setForm({ ...form, src: url })} folder="gallery" />
          </div>
          <div>
            <Label htmlFor="alt" className="mb-2 block">Alt Text</Label>
            <TextInput id="alt" value={form.alt} onChange={(e) => setForm({ ...form, alt: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="span" className="mb-2 block">Span</Label>
            <Select id="span" value={form.span} onChange={(e) => setForm({ ...form, span: e.target.value })}>
              <option value="col-span-1 row-span-1">1x1</option>
              <option value="col-span-2 row-span-1">2x1</option>
              <option value="col-span-1 row-span-2">1x2</option>
              <option value="col-span-2 row-span-2">2x2</option>
            </Select>
          </div>
          <div>
            <Label htmlFor="sortOrder" className="mb-2 block">Sort Order</Label>
            <TextInput id="sortOrder" type="number" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) })} />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="isActive" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} className="h-4 w-4" />
            <Label htmlFor="isActive">Active</Label>
          </div>
          <Button type="submit" disabled={loading}>{loading ? "Updating..." : "Update Image"}</Button>
        </form>
      </Card>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
