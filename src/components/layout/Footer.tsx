import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-800 py-6 px-4 text-gray-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Left Section: Logo or App Name */}
        <div className="mb-4 md:mb-0 gap-2 flex flex-col">
          <Link className="text-xl font-bold text-white" href="/">
            <h2>Image Masking</h2>
          </Link>
          <p className="text-sm text-gray-400">
            Enhancing your creativity, one pixel at a time.
          </p>
        </div>

        {/* Center Section: Links */}
        <nav>
          <ul className="flex flex-col sm:flex-row  text-sm sm:text-base">
            <li>
              <Link
                href="/help"
                className="text-gray-300 hover:text-blue-400 transition-colors"
              >
                Help
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="text-gray-300 hover:text-blue-400 transition-colors"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-gray-300 hover:text-blue-400 transition-colors"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="mt-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Image Masking Application. All rights
        reserved.
      </div>
    </footer>
  );
};

export default Footer;
