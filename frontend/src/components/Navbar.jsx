import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-700 shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-evenly h-16 items-center">
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
            >
              ☰
            </button>
          </div>
          <ul className="hidden md:flex space-x-8 text-gray-700 font-medium">
            <li>
              <Link to="/" className="text-white hover:text-blue-600">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-white hover:text-blue-600">
                About
              </Link>
            </li>
            <li>
              <Link to="/products" className="text-white hover:text-blue-600">
                Products
              </Link>
            </li>
            {/* <li>
              <Link to="/categories" className="hover:text-blue-600">
                Categories
              </Link>
            </li> */}
            <li>
              <a href="/contact" className="text-white hover:text-blue-600">
                Contact
              </a>
            </li>
            {/* <li>
              <Link to="/admin" className="text-white hover:text-blue-600">
                Admin
              </Link>
            </li> */}
          </ul>
        </div>

        {isOpen && (
          <ul className="md:hidden mt-4 space-y-2 text-gray-700 font-medium">
            <li>
              <Link to="/" className="block text-white hover:text-blue-600">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="block text-white hover:text-blue-600"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                className="block text-white hover:text-blue-600"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                to="/categories"
                className="block text-white hover:text-blue-600"
              >
                Categories
              </Link>
            </li>
            <li>
              <a
                href="/contact"
                className="block text-white hover:text-blue-600"
              >
                Contact
              </a>
            </li>
            {/* <li>
              <Link
                to="/admin"
                className="block text-white hover:text-blue-600"
              >
                Admin
              </Link>
            </li> */}
          </ul>
        )}
      </div>
    </nav>
  );
}
