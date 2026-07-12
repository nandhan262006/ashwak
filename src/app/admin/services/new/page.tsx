"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, TextInput, Textarea, Label, Card } from "flowbite-react";
import FileUpload from "@/components/admin/FileUpload";
import Toast from "@/components/admin/Toast";

export default function NewServicePage() {
  const router = useRouter();
  const [form, setForm] = useState({ title: "", subtitle: "", description: "", image: "", sortOrder: 0, isActive: true });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/admin/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setToast({ message: "Service created", type: "success" });
      setTimeout(() => router.push("/admin/services"), 500);
    } catch {
      setToast({ message: "Failed to create service", type: "error" });
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl">
      <h1 className="mb-4 text-2xl font-bold text-white">New Service</h1>
      <Card>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <Label htmlFor="title" className="mb-2 block">Title</Label>
            <TextInput id="title" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="subtitle" className="mb-2 block">Subtitle</Label>
            <TextInput id="subtitle" value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="description" className="mb-2 block">Description</Label>
            <Textarea id="description" rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>
          <div>
            <Label className="mb-2 block">Image</Label>
            {form.image && <img src={form.image} alt="Preview" className="mb-2 h-32 w-32 object-cover rounded" />}
            <FileUpload onUpload={(url) => setForm({ ...form, image: url })} folder="services" />
          </div>
          <div>
            <Label htmlFor="sortOrder" className="mb-2 block">Sort Order</Label>
            <TextInput id="sortOrder" type="number" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) })} />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="isActive" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} className="h-4 w-4" />
            <Label htmlFor="isActive">Active</Label>
          </div>
          <Button type="submit" disabled={loading}>{loading ? "Creating..." : "Create Service"}</Button>
        </form>
      </Card>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
