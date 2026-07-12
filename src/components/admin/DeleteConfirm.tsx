"use client";

import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";

interface DeleteConfirmProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  loading?: boolean;
}

export default function DeleteConfirm({ open, onClose, onConfirm, title, loading }: DeleteConfirmProps) {
  return (
    <Modal show={open} onClose={onClose} size="md" popup>
      <ModalHeader />
      <ModalBody>
        <div className="text-center">
          <HiOutlineExclamationTriangle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">{title}</h3>
          <div className="flex justify-center gap-4">
            <Button color="failure" onClick={onConfirm} disabled={loading}>
              {loading ? "Deleting..." : "Yes, I'm sure"}
            </Button>
            <Button color="gray" onClick={onClose} disabled={loading}>
              No, cancel
            </Button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
}
