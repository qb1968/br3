import { useEffect, useState } from "react";
import axios from "axios";

export default function BulkAssignImage() {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [cloudUrl, setCloudUrl] = useState("");

  // Fetch products from backend
  useEffect(() => {
    axios
      .get("https://br3-q37q.onrender.com/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Failed to fetch products:", err));
  }, []);

  // Toggle product selection
  const toggleSelect = (id) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  // Assign Cloudinary URL to selected products
  const assignImage = async () => {
    if (!cloudUrl || selectedProducts.length === 0)
      return alert("Select products and enter URL");

    try {
      await Promise.all(
        selectedProducts.map((id) =>
          axios.put(`https://br3-q37q.onrender.com/api/products/${id}`, {
            existingImages: [cloudUrl],
          })
        )
      );
      alert("Image assigned successfully!");
      // Trigger frontend update if needed
      window.dispatchEvent(new Event("productsUpdated"));
    } catch (err) {
      console.error(err);
      alert("Failed to assign image");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Bulk Assign Cloudinary Image</h2>

      <input
        type="text"
        placeholder="Enter Cloudinary image URL"
        value={cloudUrl}
        onChange={(e) => setCloudUrl(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-h-96 overflow-y-auto mb-4">
        {products.map((p) => (
          <div
            key={p._id}
            onClick={() => toggleSelect(p._id)}
            className={`p-2 border rounded cursor-pointer flex flex-col items-center transition ${
              selectedProducts.includes(p._id)
                ? "border-blue-600 bg-blue-50"
                : "hover:border-gray-400"
            }`}
          >
            <img
              src={p.images?.[0] || "/images/placeholder.png"}
              alt={p.name}
              className="w-24 h-24 object-cover mb-2 rounded"
            />
            <p className="text-sm text-center">{p.name}</p>
          </div>
        ))}
      </div>

      <button
        onClick={assignImage}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Assign Image to Selected
      </button>
    </div>
  );
}
