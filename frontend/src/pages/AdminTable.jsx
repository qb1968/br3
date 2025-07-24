import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminTable() {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedProduct, setEditedProduct] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    axios
      .get("https://br3-q37q.onrender.com/api/products")
      .then((res) => setProducts(res.data))
      .catch(console.error);
  }, []);

  // Extract unique categories + "All"
  const categories = [
    "All",
    ...new Set(products.map((p) => p.category).filter(Boolean)),
  ];

  // Filter products by selected category
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      await axios.delete(`https://br3-q37q.onrender.com/api/products/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch {
      alert("Delete failed");
    }
  };

  const startEdit = (product) => {
    setEditingId(product._id);
    setEditedProduct({ ...product });
  };

  const saveEdit = async (id) => {
    try {
      const original = products.find((p) => p._id === id);
      const prevSold = Number(original.sold) || 0;
      const prevStock = Number(original.stock) || 0;
      const newSold = Number(editedProduct.sold) || 0;
      const soldDiff = newSold - prevSold;

      const updatedStock = prevStock - soldDiff;
      const updatedBalance = updatedStock - newSold;

      const updatedProduct = {
        ...editedProduct,
        stock: updatedStock,
        balance: updatedBalance,
      };

      await axios.put(
        `https://br3-q37q.onrender.com/api/products/${id}`,
        updatedProduct
      );

      setProducts((prev) =>
        prev.map((p) => (p._id === id ? { ...p, ...updatedProduct } : p))
      );
      setEditingId(null);
    } catch {
      alert("Edit failed");
    }
  };

  return (
    <div className="max-w-full mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">🧾 Admin Inventory Table</h2>

      {/* Category Tabs */}
      <div className="mb-4 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1 rounded-lg border font-medium ${
              selectedCategory === cat
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-gray-200 text-gray-800 border-gray-300 hover:bg-gray-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="border rounded-xl shadow-md overflow-visible">
        <table className="w-full text-sm text-left text-gray-800">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              {[
                "#",
                "Image",
                "Name",
                "Size",
                "Stock",
                "Sold",
                "Balance",
                "Color",
                "Price",
                "Total",
                "Retail",
                "Total Sales",
                "Actions",
              ].map((header, i) => (
                <th key={i} className="px-4 py-3 ">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {filteredProducts.map((product, index) => (
              <tr key={product._id} className="hover:bg-gray-50">
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3">
                  <img
                    src={
                      product.images?.[0] ||
                      product.imageUrl || null
                    }
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                </td>
                {[
                  "name",
                  "size",
                  null, // stock (not editable)
                  "sold",
                  null, // balance (auto)
                  "color",
                  "price",
                  null, // total (auto)
                  "retail",
                ].map((field, i) => {
                  if (field === null) {
                    if (i === 2)
                      return (
                        <td key={i} className="px-4 py-3">
                          {product.stock}
                        </td>
                      );
                    if (i === 4)
                      return (
                        <td key={i} className="px-4 py-3">
                          {product.balance}
                        </td>
                      );
                    if (i === 7)
                      return (
                        <td key={i} className="px-4 py-3">
                          $
                          {(
                            Number(product.stock) * Number(product.price) || 0
                          ).toFixed(2)}
                        </td>
                      );
                  }
                  return (
                    <td key={i} className="px-4 py-3">
                      {editingId === product._id ? (
                        <input
                          type={
                            field === "name" || field === "color"
                              ? "text"
                              : "number"
                          }
                          value={editedProduct[field] ?? ""}
                          onChange={(e) =>
                            setEditedProduct((prev) => ({
                              ...prev,
                              [field]: e.target.value,
                            }))
                          }
                          className="border border-gray-300 rounded px-2 py-1 w-full"
                        />
                      ) : field === "price" || field === "retail" ? (
                        `$${product[field]}`
                      ) : (
                        product[field]
                      )}
                    </td>
                  );
                })}
                <td className="px-4 py-3">
                  $
                  {(Number(product.sold) * Number(product.price) || 0).toFixed(
                    2
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex space-x-2">
                    {editingId === product._id ? (
                      <>
                        <button
                          onClick={() => saveEdit(product._id)}
                          className="px-3 py-1 text-xs font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg"
                        >
                          💾 Save
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="px-3 py-1 text-xs font-medium text-white bg-gray-500 hover:bg-gray-600 rounded-lg"
                        >
                          ❌ Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => startEdit(product)}
                          className="px-3 py-1 text-xs font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-lg"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="px-3 py-1 text-xs font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg"
                        >
                          🗑 Delete
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
