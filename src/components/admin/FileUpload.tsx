"use client";

import { useRef, useState } from "react";
import { Button } from "flowbite-react";
import { HiArrowUpTray } from "react-icons/hi2";

interface FileUploadProps {
  onUpload: (url: string) => void;
  folder?: string;
  accept?: string;
}

export default function FileUpload({ onUpload, folder = "uploads", accept = "image/*" }: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      onUpload(data.url);
    } catch {
      alert("Upload failed. Please try again.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div>
      <input ref={inputRef} type="file" accept={accept} onChange={handleChange} className="hidden" />
      <Button size="sm" color="gray" onClick={() => inputRef.current?.click()} disabled={uploading}>
        <HiArrowUpTray className="mr-2 h-4 w-4" />
        {uploading ? "Uploading..." : "Upload File"}
      </Button>
    </div>
  );
}
