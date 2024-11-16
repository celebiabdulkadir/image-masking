"use client";
import React from "react";
import { BiExport } from "react-icons/bi";

const ExportComponent = ({
  canvasRef,
  disabled,
}: {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  disabled: boolean;
}) => {
  const exportCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = "masked-image.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <button
      onClick={exportCanvas}
      disabled={disabled}
      className={`px-4 flex gap-2 items-center py-2 rounded ${
        disabled
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-blue-500 text-white hover:bg-blue-600"
      }`}
    >
      <BiExport /> <span> Export </span>
    </button>
  );
};

export default ExportComponent;
