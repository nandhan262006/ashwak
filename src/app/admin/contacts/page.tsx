"use client";

import { useEffect, useState } from "react";
import { HiEnvelope, HiPhone, HiCalendar, HiTrash, HiEye } from "react-icons/hi2";
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
    fetch("/api/admin/contacts").then((r) => r.json()).then(setContacts);
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
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Contact Submissions</h1>
        <p className="text-white/40 text-sm mt-1">View and manage inquiry messages</p>
      </div>

      {/* Contacts list */}
      <div className="space-y-3">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className={`bg-[#111111] border rounded-2xl p-5 transition-all hover:border-[#D4AF37]/30 ${
              contact.isRead ? "border-white/5" : "border-[#D4AF37]/30"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] font-semibold text-sm">
                    {contact.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-white font-medium">{contact.name}</h3>
                      {!contact.isRead && <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />}
                    </div>
                    <div className="flex items-center gap-3 text-white/40 text-xs mt-0.5">
                      <span className="flex items-center gap-1">
                        <HiEnvelope className="w-3 h-3" />
                        {contact.email}
                      </span>
                      {contact.phone && (
                        <span className="flex items-center gap-1">
                          <HiPhone className="w-3 h-3" />
                          {contact.phone}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <p className="text-white/60 text-sm line-clamp-2 ml-13">{contact.message}</p>
                <div className="flex items-center gap-4 mt-3 ml-13">
                  {contact.eventType && (
                    <span className="text-xs px-2.5 py-1 bg-white/5 text-white/60 rounded-lg capitalize">
                      {contact.eventType}
                    </span>
                  )}
                  {contact.date && (
                    <span className="flex items-center gap-1 text-xs text-white/40">
                      <HiCalendar className="w-3 h-3" />
                      {contact.date}
                    </span>
                  )}
                  <span className="text-xs text-white/30">
                    {new Date(contact.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setViewContact(contact);
                    if (!contact.isRead) markRead(contact.id);
                  }}
                  className="p-2 bg-white/5 text-white/60 rounded-xl hover:bg-white/10 hover:text-white transition-colors"
                >
                  <HiEye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDeleteId(contact.id)}
                  className="p-2 bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500/20 transition-colors"
                >
                  <HiTrash className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {contacts.length === 0 && (
        <div className="text-center py-16 bg-[#111111] border border-white/5 rounded-2xl">
          <HiEnvelope className="w-12 h-12 text-white/20 mx-auto mb-4" />
          <p className="text-white/40">No contact submissions yet</p>
        </div>
      )}

      <DeleteConfirm open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} title="Delete this contact?" loading={loading} />

      {/* View modal */}
      {viewContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setViewContact(null)}>
          <div className="w-full max-w-lg bg-[#111111] border border-white/5 rounded-2xl p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Contact Details</h2>
              <button onClick={() => setViewContact(null)} className="text-white/40 hover:text-white">
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] font-semibold text-lg">
                  {viewContact.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-white font-medium">{viewContact.name}</h3>
                  <p className="text-white/40 text-sm">{viewContact.email}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {viewContact.phone && (
                  <div className="bg-[#0c0c0c] rounded-xl p-3">
                    <div className="text-white/40 text-xs mb-1">Phone</div>
                    <div className="text-white text-sm">{viewContact.phone}</div>
                  </div>
                )}
                {viewContact.eventType && (
                  <div className="bg-[#0c0c0c] rounded-xl p-3">
                    <div className="text-white/40 text-xs mb-1">Event Type</div>
                    <div className="text-white text-sm capitalize">{viewContact.eventType}</div>
                  </div>
                )}
                {viewContact.date && (
                  <div className="bg-[#0c0c0c] rounded-xl p-3">
                    <div className="text-white/40 text-xs mb-1">Event Date</div>
                    <div className="text-white text-sm">{viewContact.date}</div>
                  </div>
                )}
                <div className="bg-[#0c0c0c] rounded-xl p-3">
                  <div className="text-white/40 text-xs mb-1">Submitted</div>
                  <div className="text-white text-sm">{new Date(viewContact.createdAt).toLocaleDateString()}</div>
                </div>
              </div>
              <div className="bg-[#0c0c0c] rounded-xl p-4">
                <div className="text-white/40 text-xs mb-2">Message</div>
                <p className="text-white text-sm whitespace-pre-wrap">{viewContact.message}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
