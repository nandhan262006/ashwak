"use client";

import { useEffect, useState } from "react";
import { Button, TextInput, Textarea, Label, Card } from "flowbite-react";
import FileUpload from "@/components/admin/FileUpload";
import Toast from "@/components/admin/Toast";

export default function AboutPage() {
  const [form, setForm] = useState({ title: "", content: "", image: "", tags: "" });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    fetch("/api/admin/about")
      .then((r) => r.json())
      .then((item) => {
        if (item) setForm({ title: item.title || "", content: item.content || "", image: item.image || "", tags: item.tags || "" });
      })
      .finally(() => setFetching(false));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/admin/about", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setToast({ message: "About section saved", type: "success" });
    } catch {
      setToast({ message: "Failed to save about section", type: "error" });
    } finally {
      setLoading(false);
    }
  }

  if (fetching) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl">
      <h1 className="mb-4 text-2xl font-bold text-white">About Section</h1>
      <Card>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <Label htmlFor="title" className="mb-2 block">Title</Label>
            <TextInput id="title" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="content" className="mb-2 block">Content</Label>
            <Textarea id="content" rows={8} required value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} />
          </div>
          <div>
            <Label className="mb-2 block">Image</Label>
            {form.image && <img src={form.image} alt="Preview" className="mb-2 h-32 w-32 object-cover rounded" />}
            <FileUpload onUpload={(url) => setForm({ ...form, image: url })} folder="about" />
          </div>
          <div>
            <Label htmlFor="tags" className="mb-2 block">Tags (comma-separated)</Label>
            <TextInput id="tags" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} />
          </div>
          <Button type="submit" disabled={loading}>{loading ? "Saving..." : "Save"}</Button>
        </form>
      </Card>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
