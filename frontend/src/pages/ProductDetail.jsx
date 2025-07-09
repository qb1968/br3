import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
      <div className="flex flex-col md:flex-row gap-10 bg-white shadow-lg rounded-xl p-6">
        {/* Product Image */}
        <div className="md:w-1/2">
          <div className="flex gap-4 overflow-x-auto">
            {product.images?.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Product ${index}`}
                className="w-full h-auto object-cover rounded shadow-md"
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="md:w-1/2 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {product.name}
            </h1>
            <p className="text-gray-600 mb-2 text-sm uppercase tracking-wide">
              Category: {product.category}
            </p>
            <p className="text-blue-600 text-xl font-semibold mb-4">
              ${product.price}
            </p>
            <div className="text-gray-700 leading-relaxed space-y-2">
              {product.description.split("\n").map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
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
              to="/products"
              className="inline-block text-blue-600 hover:underline text-sm"
            >
              ← Back to Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
