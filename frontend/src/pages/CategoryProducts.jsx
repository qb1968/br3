import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function CategoryProducts() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    window.scrollTo(0, 0);
    axios.get("https://br3-q37q.onrender.com/api/products").then((res) => {
      const filtered = res.data.filter(
        (p) => p.category.toLowerCase() === category
      );
      setProducts(filtered);
    });
  }, [category]);

  const totalPages = Math.ceil(products.length / productsPerPage);
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = products.slice(indexOfFirst, indexOfLast);

  const goToPage = (page) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setCurrentPage(page);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
      {/* Title */}
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10 capitalize">
        {category}
      </h1>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {currentProducts.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-2xl shadow hover:shadow-lg transition duration-300 flex flex-col overflow-hidden"
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-5 flex flex-col flex-grow">
              <h2 className="text-lg font-semibold text-gray-800 mb-1">
                {product.name}
              </h2>
              <p className="text-blue-600 font-bold text-base mb-3">
                ${product.price}
              </p>
              <Link
                to={`/product/${product._id}`}
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

      {/* Back to Products */}
      <div className="mt-10 text-center">
        <Link
          to="/products"
          onClick={() => window.scrollTo(0, 0)}
          className="inline-block text-blue-600 hover:underline text-sm"
        >
          ← Back to All Products
        </Link>
      </div>
    </div>
  );
}
