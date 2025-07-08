import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function CategoryProducts() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0); // ⬅ scroll to top on load
    axios.get("https://br3-q37q.onrender.com/api/products").then((res) => {
      const filtered = res.data.filter(
        (p) => p.category.toLowerCase() === category
      );
      setProducts(filtered);
    });
  }, [category]);

  return (
    <div className="max-w-6xl mx-auto p-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white shadow rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-1">{product.name}</h2>
              <p className="text-blue-600 font-bold mb-2">${product.price}</p>
              <Link
                to={`/product/${product._id}`}
                className="inline-block mt-2 text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div>
        <Link
          to="/products"
          onClick={() => window.scrollTo(0, 0)} // ⬅ scroll when clicked
          className="text-blue-600 hover:underline mt-2 block text-sm"
        >
          ← Back to Products
        </Link>
      </div>
    </div>
  );
}
