import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

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

  const fetchRetailPrices = async (productName) => {
    try {
      setLoadingCompare(true);
      const response = await fetch(
        `https://br3-q37q.onrender.com/api/compare-prices?q=${encodeURIComponent(
          productName
        )}`
      );
      const data = await response.json();
      const items = data.shopping_results || [];
      setComparisonData(items.slice(0, 5)); // Show only top 5
    } catch (error) {
      console.error("Error fetching retail prices:", error);
    } finally {
      setLoadingCompare(false);
    }
  };
  
  
  //     const items = response.data.shopping_results || [];
  //     setComparisonData(items.slice(0, 5)); // limit to 5 results
  //   } catch (err) {
  //     console.error("Error fetching retail prices", err);
  //   } finally {
  //     setLoadingCompare(false);
  //   }
  // };

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
      <div className="bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row gap-8">
        {/* Product Image */}
        <div className="md:w-1/2">
          <div className="flex gap-4 overflow-x-auto">
            {product.images?.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Product ${index}`}
                className="rounded shadow object-cover w-full h-auto max-h-max"
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="md:w-1/2">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">
            {product.name}
          </h1>
          <p className="text-sm uppercase text-gray-500 mb-1">
            {product.category}
          </p>
          <p className="text-xl font-semibold text-blue-600 mb-3">
            ${product.price}
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
                    comparisonData.map((item, i) => {
                      console.log("Retailer item:", item); // ✅ Add this line

                      return (
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
                      );
                    })
                  ) : (
                    <p>No comparison results found.</p>
                  )}
                </ul>
              )}
            </div>
          )}

          <div className="text-gray-700 mb-4">
            {product.description.split("\n").map((line, i) => (
              <p key={i} className="mb-2">
                {line}
              </p>
            ))}
          </div>

          {/* Stock Info */}
          {product.stock > 0 ? (
            <p className="mt-6 text-sm text-green-600 font-medium">
              In Stock: {product.stock}
            </p>
          ) : (
            <p className="mt-6 text-sm text-red-500 font-medium"></p>
          )}

          {/* Back Link */}
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
