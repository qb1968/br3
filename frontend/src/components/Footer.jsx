import { Link } from "react-router-dom";

export default function Footer() {
    return (
      <div className="flex flex-col ">
        <footer className="bg-gray-800 text-white text-center py-4 mt-auto">
          <p className="text-sm">
            &copy; {new Date().getFullYear()}{" "}
            <Link
              className=" underline text-blue-100 hover:text-blue-500  "
              to="https://allwebcon.com "
              target="_blank"
            >
              Allison Web Consultants
            </Link>{" "}
            . All rights reserved.
          </p>
          <a
            href="https://www.facebook.com/yourpage"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="inline w-5 h-5 mr-1"
            >
              <path d="M22.675 0H1.325C.593 0 0 .593 0 1.326v21.348C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.466.099 2.797.143v3.24l-1.92.001c-1.504 0-1.796.715-1.796 1.763v2.313h3.59l-.467 3.622h-3.123V24h6.116C23.407 24 24 23.407 24 22.674V1.326C24 .593 23.407 0 22.675 0z" />
            </svg>
            Follow us on Facebook
          </a>
        </footer>
      </div>
    );
}