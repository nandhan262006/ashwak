"use client";

import { useEffect } from "react";
import { HiCheck, HiXMark } from "react-icons/hi2";

interface ToastProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

export default function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium shadow-lg">
      {type === "success" ? (
        <div className="flex items-center gap-3 bg-green-50 text-green-800 dark:bg-green-800 dark:text-green-200">
          <HiCheck className="h-5 w-5" />
          <span>{message}</span>
          <button onClick={onClose} className="ml-2"><HiXMark className="h-4 w-4" /></button>
        </div>
      ) : (
        <div className="flex items-center gap-3 bg-red-50 text-red-800 dark:bg-red-800 dark:text-red-200">
          <HiXMark className="h-5 w-5" />
          <span>{message}</span>
          <button onClick={onClose} className="ml-2"><HiXMark className="h-4 w-4" /></button>
        </div>
      )}
    </div>
  );
}
