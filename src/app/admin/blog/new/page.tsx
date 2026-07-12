"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, TextInput, Textarea, Label, Card } from "flowbite-react";
import FileUpload from "@/components/admin/FileUpload";
import Toast from "@/components/admin/Toast";

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function NewBlogPage() {
  const router = useRouter();
  const [form, setForm] = useState({ title: "", slug: "", excerpt: "", content: "", coverImage: "", isPublished: false });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  function handleTitleChange(value: string) {
    setForm({ ...form, title: value, slug: slugify(value) });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/admin/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setToast({ message: "Post created", type: "success" });
      setTimeout(() => router.push("/admin/blog"), 500);
    } catch {
      setToast({ message: "Failed to create post", type: "error" });
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl">
      <h1 className="mb-4 text-2xl font-bold text-white">New Blog Post</h1>
      <Card>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <Label htmlFor="title" className="mb-2 block">Title</Label>
            <TextInput id="title" required value={form.title} onChange={(e) => handleTitleChange(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="slug" className="mb-2 block">Slug</Label>
            <TextInput id="slug" required value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="excerpt" className="mb-2 block">Excerpt</Label>
            <Textarea id="excerpt" rows={2} value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="content" className="mb-2 block">Content</Label>
            <Textarea id="content" rows={10} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} />
          </div>
          <div>
            <Label className="mb-2 block">Cover Image</Label>
            {form.coverImage && <img src={form.coverImage} alt="Preview" className="mb-2 h-32 w-32 object-cover rounded" />}
            <FileUpload onUpload={(url) => setForm({ ...form, coverImage: url })} folder="blog" />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="isPublished" checked={form.isPublished} onChange={(e) => setForm({ ...form, isPublished: e.target.checked })} className="h-4 w-4" />
            <Label htmlFor="isPublished">Published</Label>
          </div>
          <Button type="submit" disabled={loading}>{loading ? "Creating..." : "Create Post"}</Button>
        </form>
      </Card>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
