import { useEffect, useState } from "react";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const page = queryParams.get("page") || 1;
  const initialPage = parseInt(queryParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [comparisonData, setComparisonData] = useState([]);
  const [loadingCompare, setLoadingCompare] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [enlargedImage, setEnlargedImage] = useState(null); // ✅ For image modal

  const fetchRetailPrices = async (productName,productDetail) => {
    try {
      setLoadingCompare(true);
      const response = await fetch(
        `https://br3-q37q.onrender.com/api/compare-prices?q=${encodeURIComponent(
          productName,productDetail
        )}`
      );
      const data = await response.json();
      const items = data.shopping_results || [];
      setComparisonData(items.slice(0, 5));
    } catch (error) {
      console.error("Error fetching retail prices:", error);
    } finally {
      setLoadingCompare(false);
    }
  };

  const handleCompareClick = () => {
    setShowComparison(!showComparison);
    if (!showComparison && product?.name) {
      fetchRetailPrices(product.name);
    }
  };

  useEffect(() => {
    axios
      .get("https://br3-q37q.onrender.com/api/products")
      .then((res) => {
        const found = res.data.find((p) => p._id === id);
        console.log("PRODUCT DEBUG:", found); // 👈 Add this line
        setProduct(found || null);
      })
      .catch(console.error);
  }, [id]);

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500 text-lg">Loading product details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 min-h-screen">
      {/* Modal for enlarged image */}
      {enlargedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setEnlargedImage(null)}
        >
          <img
            src={enlargedImage}
            alt="Enlarged view"
            className="max-w-3xl max-h-[90vh] rounded shadow-lg"
          />
        </div>
      )}

      <div className="bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row gap-8">
        {/* Product Images */}
        <div className="md:w-1/2">
          <div className="flex gap-4 overflow-x-auto">
            {product.images?.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Product ${index}`}
                className="rounded shadow object-cover w-full h-auto max-h-64 cursor-pointer"
                onClick={() => setEnlargedImage(url)} // ✅ Click to enlarge
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="md:w-1/2">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">
            {product.name}
          </h1>
          <p className="text-sm uppercase text-gray-800 mb-1">
           {product.condition}
          </p>

          {product.price !== undefined &&
            product.price !== null &&
            product.price !== 0 && (
              <p className="text-sm font-semibold text-gray-800">
                ${product.price}
                {product.priceType &&
                  product.priceType.toLowerCase() !== "blank" && (
                    <span className="text-xs text-gray-500 ml-1">
                      ({product.priceType})
                    </span>
                  )}
              </p>
            )}

          <div className="text-gray-700 mb-4">
            {product.description?.split("\n").map((line, i) => (
              <p key={i} className="mb-2">
                {line}
              </p>
            ))}
          </div>
          <p className="text-sm uppercase text-gray-800 mb-1">{product.size}</p>
          <p className="text-sm uppercase text-gray-800 mb-1">
            {product.color}
          </p>

          <button
            onClick={handleCompareClick}
            className="bg-blue-600 text-white py-2 px-4 rounded mt-4 hover:bg-blue-700"
          >
            {showComparison
              ? "Hide Price Comparison"
              : "Compare Prices at Major Retailers"}
          </button>

          {showComparison && (
            <div className="mt-4 bg-gray-100 p-4 rounded">
              <h3 className="text-lg font-semibold mb-2">Retailer Prices</h3>
              {loadingCompare ? (
                <p>Loading...</p>
              ) : (
                <ul className="space-y-2">
                  {comparisonData.length > 0 ? (
                    comparisonData.map((item, i) => (
                      <li key={i} className="text-sm">
                        <span className="font-medium">
                          {item.source || item.title}
                        </span>
                        : {item.price} –{" "}
                        <a
                          href={
                            item.product_link?.startsWith("http")
                              ? item.product_link
                              : item.link?.startsWith("http")
                              ? item.link
                              : "#"
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline"
                        >
                          View
                        </a>
                      </li>
                    ))
                  ) : (
                    <p>No comparison results found.</p>
                  )}
                </ul>
              )}
            </div>
          )}

          {product.stock > 0 && (
            <p className="mt-6 text-sm text-green-600 font-medium">
              In Stock: {product.stock}
            </p>
          )}
          <div className="mt-8">
            <Link
              to={`/products?page=${page}`}
              className="inline-block text-blue-800 hover:underline text-md"
            >
              ← Back to Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
