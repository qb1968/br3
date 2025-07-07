import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";


export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`https://br3-q37q.onrender.com/api/products`).then((res) => {
      const found = res.data.find((p) => p._id === id);
      setProduct(found);
    });
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 flex flex-col md:flex-row gap-6 min-h-screen border rounded-lg p-4 shadow-md mt-10">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="h-96  rounded shadow"
      />
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
        <p className="text-gray-600 mb-2">Category: {product.category}</p>
        <p className="text-xl text-blue-600 font-semibold mb-4">
          ${product.price}
        </p>
        <p className="text-gray-700 leading-relaxed ">
          {product.description.split("\n").map((line, index) => (
            <p key={index} className="mb-1">
              {line}
            </p>
          ))}
        </p>
        <p className="mt-4 text-sm text-gray-500">Stock: {product.stock}</p>
      </div>
      <div>
        <Link
          to="/products"
          className="text-blue-600 hover:underline mt-2 block text-sm"
        >
          ← Back to Products
        </Link>
      </div>
    </div>
  );
}
