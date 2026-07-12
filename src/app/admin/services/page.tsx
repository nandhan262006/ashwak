"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Table, TableHead, TableHeadCell, TableBody, TableRow, TableCell, Button } from "flowbite-react";
import DeleteConfirm from "@/components/admin/DeleteConfirm";
import Toast from "@/components/admin/Toast";

interface Service {
  id: string;
  title: string;
  subtitle: string | null;
  sortOrder: number;
  isActive: boolean;
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    let ignore = false;
    fetch("/api/admin/services").then((r) => r.json()).then((data) => {
      if (!ignore) setServices(data);
    });
    return () => { ignore = true; };
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
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Services</h1>
        <Link href="/admin/services/new">
          <Button size="sm">Add Service</Button>
        </Link>
      </div>
      <Table>
        <TableHead>
          <TableHeadCell>Title</TableHeadCell>
          <TableHeadCell>Subtitle</TableHeadCell>
          <TableHeadCell>Order</TableHeadCell>
          <TableHeadCell>Active</TableHeadCell>
          <TableHeadCell>Actions</TableHeadCell>
        </TableHead>
        <TableBody>
          {services.map((s) => (
            <TableRow key={s.id}>
              <TableCell>{s.title}</TableCell>
              <TableCell>{s.subtitle || "-"}</TableCell>
              <TableCell>{s.sortOrder}</TableCell>
              <TableCell>{s.isActive ? "Yes" : "No"}</TableCell>
              <TableCell className="flex gap-2">
                <Link href={`/admin/services/${s.id}`}><Button size="xs" color="info">Edit</Button></Link>
                <Button size="xs" color="failure" onClick={() => setDeleteId(s.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <DeleteConfirm open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} title="Delete this service?" loading={loading} />
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
