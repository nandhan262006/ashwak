"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, TextInput, Textarea, Label, Card } from "flowbite-react";
import Toast from "@/components/admin/Toast";

export default function NewGoogleReviewPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", text: "", rating: 5, date: "", sortOrder: 0, isActive: true });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/admin/google-reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setToast({ message: "Review created", type: "success" });
      setTimeout(() => router.push("/admin/google-reviews"), 500);
    } catch {
      setToast({ message: "Failed to create review", type: "error" });
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl">
      <h1 className="mb-4 text-2xl font-bold text-white">Add Google Review</h1>
      <Card>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <Label htmlFor="name" className="mb-2 block">Reviewer Name</Label>
            <TextInput id="name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="text" className="mb-2 block">Review Text</Label>
            <Textarea id="text" rows={4} required value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="rating" className="mb-2 block">Rating (1-5)</Label>
              <TextInput id="rating" type="number" min={1} max={5} value={form.rating} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })} />
            </div>
            <div>
              <Label htmlFor="date" className="mb-2 block">Date</Label>
              <TextInput id="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} placeholder="e.g. January 2026" />
            </div>
            <div>
              <Label htmlFor="sortOrder" className="mb-2 block">Sort Order</Label>
              <TextInput id="sortOrder" type="number" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) })} />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="isActive" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} className="h-4 w-4" />
            <Label htmlFor="isActive">Active</Label>
          </div>
          <Button type="submit" disabled={loading}>{loading ? "Creating..." : "Create Review"}</Button>
        </form>
      </Card>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
