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

- **Live Link**: [http://image-masking-chi.vercel.app](http://image-masking-chi.vercel.app)

---

## How to Use

1. **Upload an Image**:
   - Click the "Choose File" button and select an image from your device.
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
   <img width="1461" alt="image" src="https://github.com/user-attachments/assets/377fa124-e009-402b-8ebc-4b03abcca5ef">
2. **Image Upload**:
   <img width="1467" alt="image" src="https://github.com/user-attachments/assets/6110e616-af4e-4814-9bd6-d9a59337d551">

3. **Annotation Example**:
  <img width="1352" alt="image" src="https://github.com/user-attachments/assets/dc12b3a4-869d-46ba-9007-433e6e7da8d4">

4. **Export Binary Mask**:
 <img width="1476" alt="image" src="https://github.com/user-attachments/assets/355c84e0-a0d9-4e50-9c98-4ec5e3a86ccc">

5. **Help Page**:
<img width="1420" alt="image" src="https://github.com/user-attachments/assets/487902c4-4274-487a-a67d-cbbf76a22c12">

6. **About Page**:
<img width="1443" alt="image" src="https://github.com/user-attachments/assets/f3f79155-7645-4af5-ae38-4eabacb0849d">

7. **Contact Page**:
<img width="1440" alt="image" src="https://github.com/user-attachments/assets/87038a41-15c8-4d5b-809a-01a8753ca420">

---

## Installation

To run this project locally, follow these steps:

### Prerequisites

Ensure you have the following installed:

- **Node.js**: v20 or above
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
