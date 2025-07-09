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

  if (!product) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-12 p-6 border rounded shadow min-h-screen">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <img src={product.imageUrl} alt={product.name} className="mb-4 rounded" />
      <p>Category: {product.category}</p>
      <p>Price: ${product.price ?? "N/A"}</p>
      <p>{product.description}</p>
       {/* Only show stock if stock > 0 */}
      {product.stock > 0 && (
        <p className="text-sm text-gray-500 italic">
          Stock available: {product.stock}
        </p>
      )}
      <Link to="/products" className="text-blue-600 hover:underline mt-4 block">
        ← Back to Products
      </Link>
    </div>
  );
}
