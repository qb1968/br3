import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminTable() {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedProduct, setEditedProduct] = useState({});

  // Load all products
  useEffect(() => {
    axios
      .get("https://br3-q37q.onrender.com/api/products")
      .then((res) => setProducts(res.data))
      .catch(console.error);
  }, []);

  // Delete product
  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirm) return;

    try {
      await axios.delete(`https://br3-q37q.onrender.com/api/products/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      alert("Delete failed");
    }
  };

  // Enable editing
  const startEdit = (product) => {
    setEditingId(product._id);
    setEditedProduct({
      name: product.name,
      price: product.price,
      stock: product.stock,
    });
  };

  // Save product
  const saveEdit = async (id) => {
    try {
      const res = await axios.put(
        `https://br3-q37q.onrender.com/api/products/${id}`,
        editedProduct
      );
      setProducts((prev) =>
        prev.map((p) => (p._id === id ? { ...p, ...editedProduct } : p))
      );
      setEditingId(null);
    } catch (err) {
      alert("Edit failed");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">📊 Product Table (Admin View)</h2>

      <div className="overflow-x-auto border rounded-lg shadow">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-gray-900 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {products.map((product, index) => (
              <tr key={product._id} className="hover:bg-gray-50">
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3">
                  <img
                    src={
                      product.images?.[0] ||
                      product.imageUrl ||
                      "https://via.placeholder.com/48"
                    }
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-3">
                  {editingId === product._id ? (
                    <input
                      type="text"
                      value={editedProduct.name}
                      onChange={(e) =>
                        setEditedProduct((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      className="border rounded px-2 py-1 w-full"
                    />
                  ) : (
                    product.name
                  )}
                </td>
                <td className="px-4 py-3">
                  {editingId === product._id ? (
                    <input
                      type="number"
                      value={editedProduct.price}
                      onChange={(e) =>
                        setEditedProduct((prev) => ({
                          ...prev,
                          price: e.target.value,
                        }))
                      }
                      className="border rounded px-2 py-1 w-full"
                    />
                  ) : (
                    `$${product.price}`
                  )}
                </td>
                <td className="px-4 py-3">
                  {editingId === product._id ? (
                    <input
                      type="number"
                      value={editedProduct.stock}
                      onChange={(e) =>
                        setEditedProduct((prev) => ({
                          ...prev,
                          stock: e.target.value,
                        }))
                      }
                      className="border rounded px-2 py-1 w-full"
                    />
                  ) : (
                    product.stock
                  )}
                </td>
                <td className="px-4 py-3 space-x-2">
                  {editingId === product._id ? (
                    <>
                      <button
                        onClick={() => saveEdit(product._id)}
                        className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="px-3 py-1 text-sm bg-gray-400 text-white rounded hover:bg-gray-500"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => startEdit(product)}
                        className="px-3 py-1 text-sm bg-yellow-400 text-white rounded hover:bg-yellow-500"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
