export interface Position {
  x: number;
  y: number;
}

// Modes for drawing
export type DrawingMode = "rectangle" | "freehand" | "brushing";

// Path for freehand drawing and brushing
export type FreehandPath = Position[];
export type BrushPath = Position[][];
