import React, { useState } from "react";

const UploadComponent = ({
  onImageUpload,
}: {
  onImageUpload: (image: HTMLImageElement) => void;
}) => {
  // const [preview, setPreview] = useState<string | null>(null);

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
      // setPreview(url);
      onImageUpload(img);
    };
  };

  return (
    <div className="flex flex-col items-center">
      <input
        type="file"
        accept="image/png, image/jpeg, image/jpg"
        onChange={handleImageUpload}
        className="mb-4"
      />
      {/* {preview && (
        <img src={preview} alt="Preview" className="max-w-full max-h-96" />
      )} */}
    </div>
  );
};

export default UploadComponent;
