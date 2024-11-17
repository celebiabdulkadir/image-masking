export default function HelpPage() {
  return (
    <div className="max-w-md overflow-auto py-24">
      <h1 className="text-3xl font-bold mb-4">Help</h1>
      <p className="text-gray-700">
        Welcome to the Help page. Here you can find answers to frequently asked
        questions and guidance on how to use our application.
      </p>

      <h2 className="text-xl font-bold mt-8 mb-4">FAQ</h2>
      <h3 className="text-lg font-bold mt-4 mb-2">What is this app for?</h3>
      <p className="text-gray-700">
        This app is a drawing tool that allows you to create and export
        rectangles, freehand drawings, and brushing effects.
      </p>

      <h3 className="text-lg font-bold mt-4 mb-2">How do I use the app?</h3>
      <p className="text-gray-700">
        You can select the drawing mode from the toolbar and start drawing on
        the canvas. You can also reset the drawing or export it as an image.
      </p>

      <h3 className="text-lg font-bold mt-4 mb-2">
        How do I export my drawing?
      </h3>
      <p className="text-gray-700">
        You can export your drawing by clicking on the export button in the
        toolbar. Make sure you have a selection on the canvas before exporting.
      </p>

      <h3 className="text-lg font-bold mt-4 mb-2">Can I undo my drawing?</h3>
      <p className="text-gray-700">
        Yes, you can undo your drawing by clicking on the reset button in the
        toolbar. This will clear all the drawings on the canvas.
      </p>
    </div>
  );
}
