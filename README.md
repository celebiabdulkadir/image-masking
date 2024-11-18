# Image Masking Tool

The **Image Masking Tool** is a Next.js application designed for image annotation and masking. Users can upload images, draw selections (rectangles, freehand paths, and brush strokes), and export a binary mask of their edits for further use. It is built with a focus on interactivity, flexibility, and simplicity.

---

## Features

- **Upload Images**: Users can upload their own images for editing.
- **Draw Modes**:
  - **Rectangle**: Create rectangular selections on the image.
  - **Freehand**: Draw custom paths using freehand mode.
  - **Brushing**: Paint over the image with a brush tool.
- **Responsive Canvas**: The canvas adapts to screen sizes, ensuring a seamless experience across devices.
- **Export Binary Mask**: Users can export their edits as a binary mask in PNG format.
- **Reset Tools**: Easily clear selections or switch between drawing modes.
- **Touch Support**: Fully functional on touch devices for easy annotation.

---

## Demo

- **Live Link**: [http://image-masking-chi.vercel.app](#)

---

## How to Use

1. **Upload an Image**:
   - Click the "Upload" button and select an image from your device.
2. **Choose a Drawing Mode**:
   - Use the toolbar to select between `Rectangle`, `Freehand`, or `Brush` modes.
3. **Draw on the Canvas**:
   - Interact with the canvas by clicking or dragging your mouse (or finger on touch devices).
4. **Export Binary Mask**:
   - Once your edits are done, use the toolbar to export the binary mask as a PNG file.
5. **Reset or Change Modes**:
   - Clear your edits or switch between drawing modes at any time.

---

## Screens

1. **Home Page**:
   _(Add a screenshot of the initial page with placeholder image and upload button)_
2. **Image Upload**:
   _(Add a screenshot showing an uploaded image with tools visible)_

3. **Annotation Example**:
   _(Add a screenshot of the canvas with drawn annotations in different modes)_

4. **Export Binary Mask**:
   _(Add a screenshot of the binary mask output)_
5. **Help Page**:
_(Add a screenshot of the help page output)_
6. **About Page**:
_(Add a screenshot of the about page output)_
7. **Contact Page**:
_(Add a screenshot of the help page output)_

---

## Installation

To run this project locally, follow these steps:

### Prerequisites

Ensure you have the following installed:

- **Node.js**: v14 or above
- **npm** or **yarn**

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/celebiabdulkadir/image-masking.git
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
4. Open the application in your browser:
   ```bash
   http://localhost:3000
   ```
