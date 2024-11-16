import React from "react";
import { BiBrush, BiRectangle } from "react-icons/bi";
import { FaUndo } from "react-icons/fa";
import { HiHandRaised } from "react-icons/hi2";
import { PiExportLight } from "react-icons/pi";

interface ToolBarProps {
  mode: string;
  hasSelection: boolean;
  changeMode: (mode: "rectangle" | "freehand" | "brushing") => void;
  resetAllModes: () => void;
  exportBinaryMask: () => void;
}

const ToolBar: React.FC<ToolBarProps> = ({
  mode,
  hasSelection,
  changeMode,
  resetAllModes,
  exportBinaryMask,
}) => {
  return (
    <div className="mt-4 flex flex-col sm:flex-row gap-2 w-full justify-center">
      <div className="flex flex-col sm:flex-row gap-2">
        <button
          onClick={() => changeMode("rectangle")}
          className={`px-4 flex items-center gap-2 py-2 rounded ${
            mode === "rectangle" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          <BiRectangle />
          <span>Rectangle</span>
        </button>
        <button
          onClick={() => changeMode("freehand")}
          className={`px-4 py-2 flex gap-2 items-center rounded ${
            mode === "freehand" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          <HiHandRaised />
          <span>Freehand</span>
        </button>
        <button
          onClick={() => changeMode("brushing")}
          className={`px-4 py-2 flex gap-2 items-center rounded ${
            mode === "brushing" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          <BiBrush />
          <span>Brushing</span>
        </button>
        <button
          disabled={!hasSelection}
          onClick={resetAllModes}
          className={`flex gap-2 items-center px-4 py-2 rounded ${
            !hasSelection
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-red-500 text-white hover:bg-red-600"
          }`}
        >
          <FaUndo />
          <span>Reset</span>
        </button>
      </div>

      <button
        onClick={exportBinaryMask}
        disabled={!hasSelection}
        className={`px-4 py-2 rounded flex gap-2 items-center ${
          !hasSelection
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-500 text-white hover:bg-green-600"
        }`}
      >
        <PiExportLight /> Export
      </button>
    </div>
  );
};

export default ToolBar;
