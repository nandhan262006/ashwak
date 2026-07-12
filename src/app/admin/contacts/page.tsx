"use client";

import { useEffect, useState } from "react";
import { Table, TableHead, TableHeadCell, TableBody, TableRow, TableCell, Button, Badge, Modal, ModalBody, ModalHeader } from "flowbite-react";
import DeleteConfirm from "@/components/admin/DeleteConfirm";
import Toast from "@/components/admin/Toast";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  date: string | null;
  eventType: string | null;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [viewContact, setViewContact] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    let ignore = false;
    fetch("/api/admin/contacts").then((r) => r.json()).then((data) => {
      if (!ignore) setContacts(data);
    });
    return () => { ignore = true; };
  }, []);

  const refetchContacts = () => {
    fetch("/api/admin/contacts").then((r) => r.json()).then(setContacts);
  };

  async function markRead(id: string) {
    await fetch(`/api/admin/contacts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isRead: true }),
    });
    refetchContacts();
    setViewContact((prev) => (prev && prev.id === id ? { ...prev, isRead: true } : prev));
  }

  async function handleDelete() {
    if (!deleteId) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/contacts/${deleteId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed");
      setToast({ message: "Contact deleted", type: "success" });
      refetchContacts();
    } catch {
      setToast({ message: "Failed to delete contact", type: "error" });
    } finally {
      setLoading(false);
      setDeleteId(null);
    }
  }

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold text-white">Contact Submissions</h1>
      <Table>
        <TableHead>
          <TableHeadCell>Name</TableHeadCell>
          <TableHeadCell>Email</TableHeadCell>
          <TableHeadCell>Event Type</TableHeadCell>
          <TableHeadCell>Status</TableHeadCell>
          <TableHeadCell>Actions</TableHeadCell>
        </TableHead>
        <TableBody>
          {contacts.map((c) => (
            <TableRow key={c.id}>
              <TableCell>{c.name}</TableCell>
              <TableCell>{c.email}</TableCell>
              <TableCell>{c.eventType || "-"}</TableCell>
              <TableCell>
                {c.isRead ? <Badge color="success">Read</Badge> : <Badge color="warning">Unread</Badge>}
              </TableCell>
              <TableCell className="flex gap-2">
                <Button size="xs" color="info" onClick={() => { setViewContact(c); if (!c.isRead) markRead(c.id); }}>View</Button>
                <Button size="xs" color="failure" onClick={() => setDeleteId(c.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <DeleteConfirm open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} title="Delete this contact?" loading={loading} />

      <Modal show={!!viewContact} onClose={() => setViewContact(null)} size="lg">
        <ModalHeader>Contact from {viewContact?.name}</ModalHeader>
        <ModalBody>
          {viewContact && (
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <p><strong>Email:</strong> {viewContact.email}</p>
              {viewContact.phone && <p><strong>Phone:</strong> {viewContact.phone}</p>}
              {viewContact.date && <p><strong>Date:</strong> {viewContact.date}</p>}
              {viewContact.eventType && <p><strong>Event Type:</strong> {viewContact.eventType}</p>}
              <p className="mt-4"><strong>Message:</strong></p>
              <p className="whitespace-pre-wrap">{viewContact.message}</p>
            </div>
          )}
        </ModalBody>
      </Modal>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
