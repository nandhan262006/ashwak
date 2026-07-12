"use client";

import { useEffect, useState } from "react";
import { Table, TableHead, TableHeadCell, TableBody, TableRow, TableCell, Button, TextInput, Label, Modal, ModalBody, ModalHeader, ModalFooter } from "flowbite-react";
import Toast from "@/components/admin/Toast";

interface Setting {
  id: string;
  key: string;
  value: string | null;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Setting[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editKey, setEditKey] = useState("");
  const [editValue, setEditValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    let ignore = false;
    fetch("/api/admin/settings").then((r) => r.json()).then((data) => {
      if (!ignore) setSettings(data);
    });
    return () => { ignore = true; };
  }, []);

  function openAdd() {
    setEditKey("");
    setEditValue("");
    setModalOpen(true);
  }

  function openEdit(s: Setting) {
    setEditKey(s.key);
    setEditValue(s.value || "");
    setModalOpen(true);
  }

  const refetch = () => {
    fetch("/api/admin/settings").then((r) => r.json()).then(setSettings);
  };

  async function handleSave() {
    if (!editKey) return;
    setLoading(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: editKey, value: editValue }),
      });
      if (!res.ok) throw new Error("Failed");
      setToast({ message: "Setting saved", type: "success" });
      refetch();
      setModalOpen(false);
    } catch {
      setToast({ message: "Failed to save setting", type: "error" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <Button size="sm" onClick={openAdd}>Add Setting</Button>
      </div>
      <Table>
        <TableHead>
          <TableHeadCell>Key</TableHeadCell>
          <TableHeadCell>Value</TableHeadCell>
          <TableHeadCell>Actions</TableHeadCell>
        </TableHead>
        <TableBody>
          {settings.map((s) => (
            <TableRow key={s.id}>
              <TableCell className="font-mono">{s.key}</TableCell>
              <TableCell className="max-w-md truncate">{s.value || "-"}</TableCell>
              <TableCell>
                <Button size="xs" color="info" onClick={() => openEdit(s)}>Edit</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Modal show={modalOpen} onClose={() => setModalOpen(false)}>
        <ModalHeader>{editKey ? "Edit Setting" : "Add Setting"}</ModalHeader>
        <ModalBody>
          <div className="flex flex-col gap-4">
            <div>
              <Label htmlFor="key" className="mb-2 block">Key</Label>
              <TextInput id="key" required value={editKey} onChange={(e) => setEditKey(e.target.value)} disabled={!!settings.find((s) => s.key === editKey)} />
            </div>
            <div>
              <Label htmlFor="value" className="mb-2 block">Value</Label>
              <TextInput id="value" value={editValue} onChange={(e) => setEditValue(e.target.value)} />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleSave} disabled={loading}>{loading ? "Saving..." : "Save"}</Button>
          <Button color="gray" onClick={() => setModalOpen(false)}>Cancel</Button>
        </ModalFooter>
      </Modal>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
