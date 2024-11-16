"use client";
import React, { useRef, useState } from "react";

const UploadComponent = ({
  onImageUpload,
  onRemoveImage,
  hasImage, // Prop to control button visibility
}: {
  onImageUpload: (image: HTMLImageElement) => void;
  onRemoveImage: () => void;
  hasImage: boolean; // Indicates if an image is selected
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null); // Reference for the file input

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleRemoveImage = () => {
    // Clear the file input value
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset the file input
    }
    onRemoveImage(); // Notify the parent component
  };

  return (
    <div className="flex flex-row items-center justify-center">
      <input
        ref={fileInputRef} // Attach the ref to the file input
        type="file"
        accept="image/png, image/jpeg, image/jpg"
        onChange={handleImageUpload}
        className="mb-4"
      />

      {/* Conditional rendering of the Remove button */}
      {hasImage && (
        <button
          disabled={!hasImage}
          onClick={handleRemoveImage}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Remove Image
        </button>
      )}
    </div>
  );
};

export default UploadComponent;
