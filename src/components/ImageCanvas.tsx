"use client";

import React, { useEffect, useRef, useState } from "react";
import UploadComponent from "./UploadButton";
import { Position, DrawingMode, FreehandPath, BrushPath } from "@/types/types";
import ToolBar from "./ToolBar";

const ImageCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [hasSelection, setHasSelection] = useState<boolean>(false);
  const [mode, setMode] = useState<DrawingMode>("rectangle");
  const [startPos, setStartPos] = useState<Position | null>(null);
  const [endPos, setEndPos] = useState<Position | null>(null);

  const [freehandPath, setFreehandPath] = useState<FreehandPath>([]);
  const [brushPaths, setBrushPaths] = useState<BrushPath>([]);
  const [currentPath, setCurrentPath] = useState<FreehandPath>([]);

  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      let canvasWidth, canvasHeight;

      if (screenWidth < 768) {
        canvasWidth = screenWidth * 0.9;
        canvasHeight =
          canvasWidth / (image ? image.width / image.height : 16 / 9);
      } else {
        canvasHeight = screenHeight * 0.6;
        canvasWidth =
          canvasHeight * (image ? image.width / image.height : 16 / 9);
      }

      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (image) {
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        redrawBrushPaths(ctx);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [image, brushPaths]);

  const handleImageUpload = (img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    let canvasWidth, canvasHeight;

    if (screenWidth < 768) {
      canvasWidth = screenWidth * 0.9;
      canvasHeight = canvasWidth / (img.width / img.height);
    } else {
      canvasHeight = screenHeight * 0.6;
      canvasWidth = canvasHeight * (img.width / img.height);
    }

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    setImage(img);
  };

  const redrawBrushPaths = (ctx: CanvasRenderingContext2D) => {
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "rgba(34, 139, 34, 0.7)";
    ctx.lineWidth = 10;

    brushPaths.forEach((path) => {
      ctx.beginPath();
      ctx.moveTo(path[0].x, path[0].y);
      path.forEach((point) => {
        ctx.lineTo(point.x, point.y);
      });
      ctx.stroke();
    });
  };

  const resetCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas || !image) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    redrawBrushPaths(ctx);
  };

  const resetAllModes = () => {
    setFreehandPath([]);
    setBrushPaths([]);
    setCurrentPath([]);
    setStartPos(null);
    setEndPos(null);
    setHasSelection(false);
    resetCanvas();
  };

  const startDrawing = (x: number, y: number) => {
    if (mode === "rectangle") {
      setStartPos({ x, y });
    } else if (mode === "freehand") {
      setFreehandPath([{ x, y }]);
    } else if (mode === "brushing") {
      setCurrentPath([{ x, y }]);
    }
    setIsDrawing(true);
  };

  const draw = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas || !isDrawing || !image) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    // Update endPos for rectangle mode
    setEndPos({ x, y });

    if (mode === "rectangle" && startPos) {
      const rectWidth = x - startPos.x;
      const rectHeight = y - startPos.y;

      ctx.fillStyle = "rgba(144, 238, 144, 0.3)";
      ctx.strokeStyle = "rgba(34, 139, 34, 0.7)";
      ctx.lineWidth = 2;

      ctx.fillRect(startPos.x, startPos.y, rectWidth, rectHeight);
      ctx.strokeRect(startPos.x, startPos.y, rectWidth, rectHeight);
      setHasSelection(true);
    } else if (mode === "freehand" && freehandPath.length > 0) {
      ctx.beginPath();
      ctx.moveTo(freehandPath[0].x, freehandPath[0].y);
      freehandPath.forEach((point) => {
        ctx.lineTo(point.x, point.y);
      });
      ctx.lineTo(x, y);
      ctx.closePath();

      ctx.fillStyle = "rgba(144, 238, 144, 0.3)";
      ctx.strokeStyle = "rgba(34, 139, 34, 0.7)";
      ctx.lineWidth = 2;

      ctx.fill();
      ctx.stroke();

      setFreehandPath((prev) => [...prev, { x, y }]);
      setHasSelection(true);
    } else if (mode === "brushing") {
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = "rgba(34, 139, 34, 0.7)";
      ctx.lineWidth = 10;

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
  const stopDrawing = () => {
    setIsDrawing(false);

    if (mode === "brushing" && currentPath.length > 0) {
      setBrushPaths((prev) => [...prev, currentPath]);
      setCurrentPath([]);
    }
    // Remove the freehand path clearing
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    startDrawing(x, y);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    draw(x, y);
  };

  const handleMouseUp = stopDrawing;
  const exportBinaryMask = () => {
    if (!image) return;

    // Create a temporary canvas with original image dimensions
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = image.width; // Use original image width
    tempCanvas.height = image.height; // Use original image height
    const tempCtx = tempCanvas.getContext("2d");
    if (!tempCtx) return;

    // Fill with white background
    tempCtx.fillStyle = "#FFFFFF";
    tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

    // Calculate scale factor between canvas and original image
    const canvas = canvasRef.current;
    if (!canvas) return;
    const scaleX = image.width / canvas.width;
    const scaleY = image.height / canvas.height;

    // Set black color for selections
    tempCtx.fillStyle = "#000000";
    tempCtx.strokeStyle = "#000000";

    // Draw rectangle selection if exists
    if (mode === "rectangle" && startPos && endPos) {
      const rectWidth = (endPos.x - startPos.x) * scaleX;
      const rectHeight = (endPos.y - startPos.y) * scaleY;
      tempCtx.fillRect(
        startPos.x * scaleX,
        startPos.y * scaleY,
        rectWidth,
        rectHeight
      );
    }

    // Draw freehand selection if exists
    if (mode === "freehand" && freehandPath.length > 0) {
      tempCtx.beginPath();
      tempCtx.moveTo(freehandPath[0].x * scaleX, freehandPath[0].y * scaleY);
      freehandPath.forEach((point) => {
        tempCtx.lineTo(point.x * scaleX, point.y * scaleY);
      });
      tempCtx.closePath();
      tempCtx.fill();
      tempCtx.stroke();
    }

    // Draw brush strokes
    if (brushPaths.length > 0) {
      tempCtx.lineCap = "round";
      tempCtx.lineJoin = "round";
      tempCtx.lineWidth = 10 * scaleX; // Scale brush size too

      brushPaths.forEach((path) => {
        if (path.length > 0) {
          tempCtx.beginPath();
          tempCtx.moveTo(path[0].x * scaleX, path[0].y * scaleY);
          path.forEach((point) => {
            tempCtx.lineTo(point.x * scaleX, point.y * scaleY);
          });
          tempCtx.stroke();
        }
      });
    }

    // Export the binary mask
    const link = document.createElement("a");
    link.download = "binary_mask.png";
    link.href = tempCanvas.toDataURL("image/png");
    link.click();
  };

  const changeMode = (newMode: "rectangle" | "freehand" | "brushing") => {
    resetAllModes();
    setMode(newMode);
  };

  return (
    <div className="flex flex-col items-center w-full gap-2">
      <UploadComponent onImageUpload={handleImageUpload} />
      {image && (
        <ToolBar
          mode={mode}
          hasSelection={hasSelection}
          changeMode={changeMode}
          resetAllModes={resetAllModes}
          exportBinaryMask={exportBinaryMask}
        />
      )}
      <canvas
        ref={canvasRef}
        className="max-w-full rounded-lg"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
    </div>
  );
};

export default ImageCanvas;
