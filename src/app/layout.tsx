import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Image Mask",
  description: "Image Mask",
};

const poppins = Poppins({
  weight: ["400", "600"], // Include multiple weights for variety.
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.className} bg-gray-100 text-gray-800`}>
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] px-4">
          {children}
        </main>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
