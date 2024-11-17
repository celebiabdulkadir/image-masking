"use client";
import React from "react";

import { FaBrush, FaPen, FaSquare, FaUndo } from "react-icons/fa";
import { FaFileExport } from "react-icons/fa6";

import ConfirmModal from "./modals/ConfirmModal";
import Notification from "./notification/Notification";

interface ToolBarProps {
  mode: string;
  hasSelection: boolean;
  changeMode: (mode: "rectangle" | "freehand" | "brushing") => void;
  resetAllModes: () => void;
  exportBinaryMask: () => string | null; // Modify to return the image URL
}

const ToolBar: React.FC<ToolBarProps> = ({
  mode,
  hasSelection,
  changeMode,
  resetAllModes,
  exportBinaryMask,
}) => {
  const [confirmModalOpen, setConfirmModalOpen] = React.useState(false);
  const [notificationOpen, setNotificationOpen] = React.useState(false);
  const [previewImageUrl, setPreviewImageUrl] = React.useState<string | null>(
    null
  );

  const handleExport = () => {
    const imageUrl = exportBinaryMask(); // Get the binary mask preview URL
    if (imageUrl) {
      setPreviewImageUrl(imageUrl);
      setConfirmModalOpen(true);
    }
  };

  const onConfirm = () => {
    if (previewImageUrl) {
      const link = document.createElement("a");
      link.download = "binary_mask.png";
      link.href = previewImageUrl;
      link.click();
    }
    setConfirmModalOpen(false);
    setNotificationOpen(true); // Show notification after download
    setPreviewImageUrl(null);
  };

  return (
    <>
      {confirmModalOpen && (
        <ConfirmModal
          isOpen={confirmModalOpen}
          message="Are you sure you want to download this image?"
          onConfirm={onConfirm}
          onCancel={() => setConfirmModalOpen(false)}
          previewImageUrl={previewImageUrl || undefined} // Pass the preview image URL
        />
      )}
      {notificationOpen && (
        <Notification
          message="Masked Image has downloaded successfully!"
          type="success"
          duration={3000}
          onClose={() => setNotificationOpen(false)}
        />
      )}
      <div className="flex  sm:flex-row gap-2 justify-between w-full">
        <div className="flex gap-2">
          <button
            onClick={() => changeMode("rectangle")}
            className={`px-4 flex items-center gap-2 py-2 rounded-md md:w-32 ${
              mode === "rectangle" ? "bg-black text-white" : "bg-gray-200"
            }`}
          >
            <FaSquare />
            <span className="hidden md:block">Rectangle</span>
          </button>
          <button
            onClick={() => changeMode("freehand")}
            className={`px-4 py-2 flex gap-2 items-center rounded-md md:w-32 ${
              mode === "freehand" ? "bg-black text-white" : "bg-gray-200"
            }`}
          >
            <FaPen />
            <span className="hidden md:block">Freehand</span>
          </button>
          <button
            onClick={() => changeMode("brushing")}
            className={`px-4 py-2 flex gap-2 items-center rounded-md md:w-32 ${
              mode === "brushing" ? "bg-black text-white" : "bg-gray-200"
            }`}
          >
            <FaBrush />
            <span className="hidden md:block">Brushing</span>
          </button>
        </div>
        <div className="flex gap-2">
          <button
            disabled={!hasSelection}
            onClick={resetAllModes}
            className={`flex gap-2 items-center px-4 py-2 rounded-md md:w-32 ${
              !hasSelection
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gray-200 hover:text-white text-black hover:bg-black"
            }`}
          >
            <FaUndo />
            <span className="hidden md:block">Reset</span>
          </button>
          <button
            onClick={handleExport}
            disabled={!hasSelection}
            className={`px-4 py-2  flex gap-2 rounded-md md:w-32 items-center ${
              !hasSelection
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 "
            }`}
          >
            <FaFileExport /> <span className="hidden md:block">Export</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default ToolBar;
