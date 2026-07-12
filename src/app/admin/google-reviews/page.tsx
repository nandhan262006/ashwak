"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Table, TableHead, TableHeadCell, TableBody, TableRow, TableCell, Button } from "flowbite-react";
import DeleteConfirm from "@/components/admin/DeleteConfirm";
import Toast from "@/components/admin/Toast";

interface Review {
  id: string;
  name: string;
  text: string;
  rating: number;
  date: string | null;
  isActive: boolean;
  sortOrder: number;
}

export default function GoogleReviewsPage() {
  const [items, setItems] = useState<Review[]>([]);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    let ignore = false;
    fetch("/api/admin/google-reviews").then((r) => r.json()).then((data) => {
      if (!ignore) setItems(data);
    });
    return () => { ignore = true; };
  }, []);

  const refetch = () => {
    fetch("/api/admin/google-reviews").then((r) => r.json()).then(setItems);
  };

  async function handleDelete() {
    if (!deleteId) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/google-reviews/${deleteId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed");
      setToast({ message: "Review deleted", type: "success" });
      refetch();
    } catch {
      setToast({ message: "Failed to delete review", type: "error" });
    } finally {
      setLoading(false);
      setDeleteId(null);
    }
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Google Reviews</h1>
        <Link href="/admin/google-reviews/new">
          <Button size="sm">Add Review</Button>
        </Link>
      </div>
      <Table>
        <TableHead>
          <TableHeadCell>Name</TableHeadCell>
          <TableHeadCell>Rating</TableHeadCell>
          <TableHeadCell>Date</TableHeadCell>
          <TableHeadCell>Active</TableHeadCell>
          <TableHeadCell>Actions</TableHeadCell>
        </TableHead>
        <TableBody>
          {items.map((r) => (
            <TableRow key={r.id}>
              <TableCell>{r.name}</TableCell>
              <TableCell>{r.rating}/5</TableCell>
              <TableCell>{r.date || "-"}</TableCell>
              <TableCell>{r.isActive ? "Yes" : "No"}</TableCell>
              <TableCell className="flex gap-2">
                <Link href={`/admin/google-reviews/${r.id}`}><Button size="xs" color="info">Edit</Button></Link>
                <Button size="xs" color="failure" onClick={() => setDeleteId(r.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <DeleteConfirm open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} title="Delete this review?" loading={loading} />
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
