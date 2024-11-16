"use client";

import React, { useRef, useState, ChangeEvent, DragEvent } from "react";
import { FaUpload } from "react-icons/fa";

interface UploadComponentProps {
  onImageUpload: (image: HTMLImageElement) => void;
}

const UploadComponent = ({ onImageUpload }: UploadComponentProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file.");
      return;
    }

    const url = URL.createObjectURL(file);
    const img = new Image();
    img.src = url;
    img.onload = () => {
      onImageUpload(img);
    };
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        onImageUpload(img);
      };
    }
  };

  return (
    <div className="w-full">
      <div
        className={`border-2 border-dashed rounded-lg p-2 text-center transition-colors
          ${
            isDragging
              ? "border-blue-500 bg-blue-50"
              : "border-gray-200 hover:border-blue-300"
          }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center gap-4">
          <FaUpload />
          <div className="flex gap-4 items-center">
            <label htmlFor="file-upload" className="relative cursor-pointer">
              <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded hover:bg-blue-200 transition-colors">
                Choose File
              </span>
              <input
                id="file-upload"
                ref={fileInputRef}
                type="file"
                className="sr-only"
                accept="image/png, image/jpeg, image/jpg"
                onChange={handleImageUpload}
              />
            </label>
          </div>
          <p className="mt-2 text-sm text-gray-500">
            or drag and drop your image here
          </p>
        </div>
      </div>
    </div>
  );
};

export default UploadComponent;
