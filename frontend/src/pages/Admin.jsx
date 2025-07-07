import axios from "axios";
import { useEffect, useState } from "react";

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editProduct, setEditProduct] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    stock: "",
    condition: "",
    color: "",
    image: null,
  });

  useEffect(() => {
    axios
      .get("https://br3-q37q.onrender.com/api/categories")
      .then((res) => setCategories(res.data));

    axios
      .get("https://br3-q37q.onrender.com/api/products")
      .then((res) => setProducts(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    // Use editProduct fields if editing, else use formData
    const payload = editProduct || formData;
    const cleanValue = (val) => {
      if (val === "") return undefined;
      if (!isNaN(val)) return Number(val);
      return val;
    };
    // Append all fields except 'image'
    Object.entries(payload).forEach(([key, val]) => {
      if (key !== "image" && val !== undefined) {
        const cleaned = cleanValue(val);
        if (cleaned !== undefined) data.append(key, cleaned);
      }
    });
    

    // Append image only if a new one was selected in formData
    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      const url = editProduct
        ? `https://br3-q37q.onrender.com/api/products/${editProduct._id}`
        : "https://br3-q37q.onrender.com/api/products";

      const method = editProduct ? "put" : "post";

      await axios[method](url, data);

      // Reset form and editProduct state
      setEditProduct(null);
      setFormData({
        name: "",
        category: "",
        description: "",
        price: "",
        stock: "",
        condition: "",
        color: "",
        image: null,
      });

      // Refresh product list
      const updated = await axios.get(
        "https://br3-q37q.onrender.com/api/products"
      );
      setProducts(updated.data);
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Failed to save product. Check console for details.");
    }
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://br3-q37q.onrender.com/api/products/${id}`);
      const updated = await axios.get(
        "https://br3-q37q.onrender.com/api/products"
      );
      setProducts(updated.data);
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product.");
    }
  };
  

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Panel</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 mb-10">
        <input
          type="text"
          placeholder="Product Name"
          value={editProduct ? editProduct.name : formData.name}
          onChange={(e) =>
            editProduct
              ? setEditProduct({ ...editProduct, name: e.target.value })
              : setFormData({ ...formData, name: e.target.value })
          }
          className="border p-2 rounded"
        />

        <select
          value={editProduct ? editProduct.category : formData.category}
          onChange={(e) =>
            editProduct
              ? setEditProduct({ ...editProduct, category: e.target.value })
              : setFormData({ ...formData, category: e.target.value })
          }
          className="border p-2 rounded"
        >
          <option value="">Select Category</option>
          {categories.map((c) => (
            <option key={c._id} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>

        <textarea
          placeholder="Description (use line breaks)"
          value={editProduct ? editProduct.description : formData.description}
          onChange={(e) =>
            editProduct
              ? setEditProduct({ ...editProduct, description: e.target.value })
              : setFormData({ ...formData, description: e.target.value })
          }
          className="border p-2 rounded"
        ></textarea>

        <input
          type="number"
          placeholder="Price"
          value={editProduct ? editProduct.price : formData.price}
          onChange={(e) =>
            editProduct
              ? setEditProduct({ ...editProduct, price: e.target.value })
              : setFormData({ ...formData, price: e.target.value })
          }
          className="border p-2 rounded"
        />

        <input
          type="number"
          placeholder="Stock (optional)"
          value={editProduct ? editProduct.stock : formData.stock}
          onChange={(e) =>
            editProduct
              ? setEditProduct({ ...editProduct, stock: e.target.value })
              : setFormData({ ...formData, stock: e.target.value })
          }
          className="border p-2 rounded"
        />

        {/* <input
          type="text"
          placeholder="Condition"
          value={editProduct ? editProduct.condition : formData.condition}
          onChange={(e) =>
            editProduct
              ? setEditProduct({ ...editProduct, condition: e.target.value })
              : setFormData({ ...formData, condition: e.target.value })
          }
          className="border p-2 rounded"
        /> */}

        {/* <input
          type="text"
          placeholder="Color"
          value={editProduct ? editProduct.color : formData.color}
          onChange={(e) =>
            editProduct
              ? setEditProduct({ ...editProduct, color: e.target.value })
              : setFormData({ ...formData, color: e.target.value })
          }
          className="border p-2 rounded"
        /> */}

        <input
          type="file"
          onChange={(e) =>
            setFormData({ ...formData, image: e.target.files[0] })
          }
          className="border p-2 rounded"
        />

        {/* Image Preview */}
        {formData.image && (
          <img
            src={URL.createObjectURL(formData.image)}
            alt="Preview"
            className="w-32 h-32 object-cover rounded border"
          />
        )}
        {editProduct?.imageUrl && !formData.image && (
          <img
            src={editProduct.imageUrl}
            alt="Existing"
            className="w-32 h-32 object-cover rounded border"
          />
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {editProduct ? "Update Product" : "Add Product"}
        </button>

        {editProduct && (
          <button
            type="button"
            onClick={() => {
              setEditProduct(null);
              setFormData({
                name: "",
                category: "",
                description: "",
                price: "",
                stock: "",
                condition: "",
                color: "",
                image: null,
              });
            }}
            className="bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
          >
            Cancel Edit
          </button>
        )}
      </form>

      <h2 className="text-2xl font-semibold mb-4">Current Products</h2>
      <ul className="space-y-4">
        {products.map((p) => (
          <li
            key={p._id}
            className="p-4 border rounded flex justify-between items-center"
          >
            <div>
              <h3 className="text-lg font-bold">{p.name}</h3>
              <p className="text-sm text-gray-600">
                {p.category} - ${p.price}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setEditProduct(p)}
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>
              
              <button
                onClick={() => handleDelete(p._id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
