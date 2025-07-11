import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo & Description */}
        <div>
          <h3 className="text-white text-2xl font-bold mb-4">
            Builders Re-Source
          </h3>
          <p className="text-sm">
            Your trusted source for quality overstock building materials. Save
            big and build better with our affordable and reliable products.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h4 className="text-white font-semibold mb-4">Explore</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:underline">
                Products
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:underline">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-white font-semibold mb-4">Contact</h4>
          <p className="text-sm mb-2">4309 Sartin Rd, Burlington, NC</p>
          <p className="text-sm mb-2">Phone: (336)459-2340</p>
          <p className="text-sm">Email: builders.resource336@gmail.com</p>
        </div>

        {/* Social Links */}
        <div>
          <h4 className="text-white font-semibold mb-4">Follow Us</h4>
          <div className="flex space-x-4 text-xl">
            <a
              href="https://www.facebook.com/profile.php?id=61563132742199" target="_blank"
              className="hover:text-white"
            >
              <FaFacebookF />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="mt-12 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()}{" "}
        <Link to="https://allwebcon.com" target="_blank" className="text-white hover:text-blue-500 underline">
          Allison Web Consultants
        </Link>{" "}
        All rights reserved.
      </div>
    </footer>
  );
}
