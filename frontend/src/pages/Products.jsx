import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Categories from "./Categories";


export default function Products() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios
            .get("https://br3-q37q.onrender.com/api/products")
            .then((res) => setProducts(res.data));
    }, []);

    return (
      <div className="max-w-6xl mx-auto p-6 min-h-screen">
        <Categories />
        <h2 className="text-4xl font-bold mb-4 flex justify-center">Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white shadow rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img
                src={`https://br3-q37q.onrender.com${product.imageUrl}`}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-1">{product.name}</h2>
                <p className="text-gray-600 text-sm mb-2">{product.category}</p>
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
      </div>
    );
}