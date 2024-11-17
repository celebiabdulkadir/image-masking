import Image from "next/image";
import React from "react";

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
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-xl w-full">
        <h2 className="text-xl font-bold text-gray-800 text-center mb-4">
          Confirmation
        </h2>

        {/* Responsive Image Container */}
        {previewImageUrl && (
          <div className="relative w-full flex justify-center mb-4">
            <div className="relative w-full max-w-[90%] max-h-[50vh] aspect-square">
              <Image
                className="rounded object-contain"
                src={previewImageUrl}
                alt="Preview"
                fill
              />
            </div>
          </div>
        )}

        <p className="text-gray-600 text-center mt-4 mb-6">{message}</p>

        <div className="flex justify-center space-x-4">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
            onClick={onConfirm}
          >
            Confirm
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
