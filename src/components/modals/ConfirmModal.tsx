"use client";
import Image from "next/image";
import React, { useRef } from "react";
import useClickOutside from "@/hooks/useClickOutside";

interface ConfirmModalProps {
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  previewImageUrl?: string; // Image URL for preview
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  message,
  onConfirm,
  onCancel,
  previewImageUrl,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useClickOutside(modalRef, onCancel);

  if (!isOpen) {
    return null; // Render nothing if modal is not open
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-lg p-4 max-w-xl w-full mx-4"
      >
        <h2 className="text-xl font-bold text-gray-800 text-center mb-4">
          Confirmation
        </h2>

        {/* Responsive Image Container */}
        {previewImageUrl && (
          <div className="relative w-full h-[60vh]  ">
            <Image
              className="rounded object-contain"
              src={previewImageUrl}
              alt="Preview"
              fill
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
        )}

        <p className="text-gray-600 text-center mb-6">{message}</p>

        <div className="flex justify-center space-x-4">
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
