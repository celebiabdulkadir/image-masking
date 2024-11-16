"use client";
import React, { useEffect, useRef, useState } from "react";
import UploadComponent from "./UploadButton";
import ExportComponent from "./ExportButton";

const ImageCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSelection, setHasSelection] = useState(false); // Tracks if a selection is made
  const [mode, setMode] = useState<"rectangle" | "freehand" | "brushing">(
    "rectangle"
  );
  const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(
    null
  ); // For rectangle selection
  const [freehandPath, setFreehandPath] = useState<
    Array<{ x: number; y: number }>
  >([]);
  const [brushPaths, setBrushPaths] = useState<
    Array<Array<{ x: number; y: number }>>
  >([]);
  const [currentPath, setCurrentPath] = useState<
    Array<{ x: number; y: number }>
  >([]);
  const [brushSize, setBrushSize] = useState(10); // Default brush size

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set default canvas height
    const canvasHeight = window.innerHeight / 1.75; // Fixed height
    const defaultAspectRatio = 16 / 9; // Default aspect ratio
    const canvasWidth = canvasHeight * defaultAspectRatio; // Width based on aspect ratio

    // Set canvas dimensions
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // Optionally add a background color
    ctx.fillStyle = "#FFFFFF"; // White background
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);
  const handleImageUpload = (img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Calculate canvas dimensions
    const canvasHeight = window.innerHeight / 1.75; // Half of the screen height
    const aspectRatio = img.width / img.height;
    const canvasWidth = canvasHeight * aspectRatio; // Width based on aspect ratio

    // Set canvas dimensions
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // Draw the image onto the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    setImage(img);
    setHasSelection(false); // Reset selection when a new image is uploaded
  };
  const handleRemoveImage = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
      }
    }
    setImage(null); // Clear the image state
    setHasSelection(false); // Reset selection state
  };

  const resetCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas || !image) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear the canvas and redraw the image
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  };

  const resetAllModes = () => {
    setFreehandPath([]);
    setBrushPaths([]);
    setCurrentPath([]);
    setStartPos(null);
    setHasSelection(false);
    resetCanvas();
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (mode === "rectangle") {
      setStartPos({ x, y });
    } else if (mode === "freehand") {
      setFreehandPath([{ x, y }]);
    } else if (mode === "brushing") {
      setCurrentPath([{ x, y }]);
    }
    setIsDrawing(true);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || !isDrawing || !image) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Clear and redraw the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    if (mode === "rectangle" && startPos) {
      // Draw rectangle selection
      const rectWidth = x - startPos.x;
      const rectHeight = y - startPos.y;

      ctx.fillStyle = "rgba(144, 238, 144, 0.3)"; // Light green fill
      ctx.strokeStyle = "rgba(34, 139, 34, 0.7)"; // Darker green stroke
      ctx.lineWidth = 2;

      ctx.fillRect(startPos.x, startPos.y, rectWidth, rectHeight);
      ctx.strokeRect(startPos.x, startPos.y, rectWidth, rectHeight);
      setHasSelection(true);
    } else if (mode === "freehand" && freehandPath.length > 0) {
      // Draw freehand selection with filled area
      ctx.beginPath();
      ctx.moveTo(freehandPath[0].x, freehandPath[0].y);
      freehandPath.forEach((point) => {
        ctx.lineTo(point.x, point.y);
      });
      ctx.lineTo(x, y); // Connect current mouse position
      ctx.closePath();

      ctx.fillStyle = "rgba(144, 238, 144, 0.3)"; // Light green fill
      ctx.strokeStyle = "rgba(34, 139, 34, 0.7)"; // Darker green stroke
      ctx.lineWidth = 2;

      ctx.fill(); // Fill the area
      ctx.stroke(); // Draw the outline

      setFreehandPath((prev) => [...prev, { x, y }]);
      setHasSelection(true);
    } else if (mode === "brushing") {
      // Redraw all brush paths
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = "rgba(34, 139, 34, 0.7)"; // Darker green stroke
      ctx.lineWidth = brushSize;

      brushPaths.forEach((path) => {
        ctx.beginPath();
        ctx.moveTo(path[0].x, path[0].y);
        path.forEach((point) => {
          ctx.lineTo(point.x, point.y);
        });
        ctx.stroke();
      });

      // Draw the current brush path
      if (currentPath.length > 0) {
        ctx.beginPath();
        ctx.moveTo(currentPath[0].x, currentPath[0].y);
        currentPath.forEach((point) => {
          ctx.lineTo(point.x, point.y);
        });
        ctx.lineTo(x, y);
        ctx.stroke();

        setCurrentPath((prev) => [...prev, { x, y }]);
        setHasSelection(true);
      }
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);

    // Save paths and reset temporary states
    if (mode === "freehand") {
      // Ensure the path is closed and filled
      setFreehandPath([]);
    } else if (mode === "brushing" && currentPath.length > 0) {
      setBrushPaths((prev) => [...prev, currentPath]);
      setCurrentPath([]);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <UploadComponent
        hasImage={!!image}
        onImageUpload={handleImageUpload}
        onRemoveImage={handleRemoveImage}
      />
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className=""
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />

      <div className="mt-4 flex space-x-4">
        <div className="flex space-x-4 ">
          <button
            onClick={() => {
              resetAllModes();
              setMode("rectangle");
            }}
            className={`px-4 py-2 rounded ${
              mode === "rectangle" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            Rectangle
          </button>
          <button
            onClick={() => {
              resetAllModes();
              setMode("freehand");
            }}
            className={`px-4 py-2 rounded ${
              mode === "freehand" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            Freehand
          </button>
          <button
            onClick={() => {
              resetAllModes();
              setMode("brushing");
            }}
            className={`px-4 py-2 rounded ${
              mode === "brushing" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            Brushing
          </button>
        </div>
        <button
          disabled={!hasSelection}
          onClick={resetAllModes}

          className={`bg-red-500 text-white px-4 py-2 rounded ${
            !hasSelection
              ? "bg-red-300 cursor-not-allowed"
              : "bg-red-500 text-white hover:bg-red-600"
          }`}
        >
          Delete Selection
        </button>
        <ExportComponent
          canvasRef={canvasRef}
          disabled={!image || !hasSelection}
        />
      </div>
    </div>
  );
};

export default ImageCanvas;
