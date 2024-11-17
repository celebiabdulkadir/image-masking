import Link from "next/link";
import React from "react";
import { BiSolidFaceMask } from "react-icons/bi";

const Header = () => {
  return (
    <header className="bg-gray-800 py-6 px-4 shadow-md fixed top-0 w-full z-10">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/">
          <h1 className="md:text-2xl flex items-center gap-2 text-sm font-bold text-white tracking-wide">
            <BiSolidFaceMask />
            <span className="hidden sm:inline">Image Masking</span>
          </h1>
        </Link>

        <nav>
          <ul className="flex space-x-4 text-sm sm:text-base">
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
    </header>
  );
};

export default Header;
