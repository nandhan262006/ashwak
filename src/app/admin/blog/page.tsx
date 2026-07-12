"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Table, TableHead, TableHeadCell, TableBody, TableRow, TableCell, Button, Badge } from "flowbite-react";
import DeleteConfirm from "@/components/admin/DeleteConfirm";
import Toast from "@/components/admin/Toast";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  isPublished: boolean;
  createdAt: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    let ignore = false;
    fetch("/api/admin/blog").then((r) => r.json()).then((data) => {
      if (!ignore) setPosts(data);
    });
    return () => { ignore = true; };
  }, []);

  const refetch = () => {
    fetch("/api/admin/blog").then((r) => r.json()).then(setPosts);
  };

  async function handleDelete() {
    if (!deleteId) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/blog/${deleteId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed");
      setToast({ message: "Post deleted", type: "success" });
      refetch();
    } catch {
      setToast({ message: "Failed to delete post", type: "error" });
    } finally {
      setLoading(false);
      setDeleteId(null);
    }
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Blog Posts</h1>
        <Link href="/admin/blog/new">
          <Button size="sm">Add Post</Button>
        </Link>
      </div>
      <Table>
        <TableHead>
          <TableHeadCell>Title</TableHeadCell>
          <TableHeadCell>Slug</TableHeadCell>
          <TableHeadCell>Status</TableHeadCell>
          <TableHeadCell>Actions</TableHeadCell>
        </TableHead>
        <TableBody>
          {posts.map((p) => (
            <TableRow key={p.id}>
              <TableCell>{p.title}</TableCell>
              <TableCell>{p.slug}</TableCell>
              <TableCell>
                {p.isPublished ? <Badge color="success">Published</Badge> : <Badge color="warning">Draft</Badge>}
              </TableCell>
              <TableCell className="flex gap-2">
                <Link href={`/admin/blog/${p.id}`}><Button size="xs" color="info">Edit</Button></Link>
                <Button size="xs" color="failure" onClick={() => setDeleteId(p.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <DeleteConfirm open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} title="Delete this post?" loading={loading} />
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
