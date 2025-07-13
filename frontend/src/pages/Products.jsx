import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Categories from "./Categories";
import BackToTop from "../components/BackToTop";
import { useLocation, useNavigate } from "react-router-dom";

export default function Products() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const [products, setProducts] = useState([]);
  const initialPage = parseInt(queryParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(initialPage);
  const productsPerPage = 10;

  useEffect(() => {
    axios
      .get("https://br3-q37q.onrender.com/api/products")
      .then((res) => setProducts(res.data));
  }, []);
  const productsWithImages = products.filter(
    (p) => Array.isArray(p.images) && p.images.length > 0
  );

  const totalPages = Math.ceil(productsWithImages.length / productsPerPage);
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = productsWithImages.slice(indexOfFirst, indexOfLast);
  

  const goToPage = (page) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setCurrentPage(page);
    navigate(`/products?page=${page}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
      {/* Categories */}
      <Categories />

      {/* Page Heading */}
      <h1 className="text-4xl font-extrabold text-center text-gray-900 mt-8 mb-12">
        All Products
      </h1>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {currentProducts.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col overflow-hidden"
          >
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-5 flex flex-col flex-grow">
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {product.name}
              </h3>
              <p className="text-sm text-gray-500 mb-1">{product.category}</p>
              <p className="text-blue-600 font-bold text-base mb-4">
                ${product.price}
              </p>
              <Link
                to={`/product/${product._id}?page=${currentPage}`}
                className="mt-auto inline-block bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-12 flex-wrap gap-3">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => goToPage(i + 1)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white shadow"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {/* Back to Top */}
      <BackToTop />
    </div>
  );
}
