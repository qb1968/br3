import axios from "axios";
import { useEffect, useState } from "react";

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const[newCategory,setNewCategory] = useState("")

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

  // Fetch categories and products
  useEffect(() => {
    axios
      .get("https://br3-q37q.onrender.com/api/categories")
      .then((res) => setCategories(res.data));

    axios
      .get("https://br3-q37q.onrender.com/api/products")
      .then((res) => setProducts(res.data));
  }, []);


  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;
    try {
      await axios.post("https://br3-q37q.onrender.com/api/categories", {
        name: newCategory.trim(),
      });
      const updated = await axios.get(
        "https://br3-q37q.onrender.com/api/categories"
      );
      setCategories(updated.data);
      setNewCategory("");
    } catch (error) {
      console.error("Failed to add category", error);
      alert("Could not add category");
    }
  };
  // Save or update product
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, val]) => {
        if (key !== "image") {
          data.append(key, val);
        }
      });
      if (formData.image) {
        data.append("image", formData.image);
      }

      const url = editProduct
        ? `https://br3-q37q.onrender.com/api/products/${editProduct._id}`
        : "https://br3-q37q.onrender.com/api/products";
      const method = editProduct ? "put" : "post";

      await axios[method](url, data);

      // Reset form
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

      // Refresh products
      const updated = await axios.get(
        "https://br3-q37q.onrender.com/api/products"
      );
      setProducts(updated.data);
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Failed to save product.");
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    try {
      await axios.delete(`https://br3-q37q.onrender.com/api/products/${id}`);
      const updated = await axios.get(
        "https://br3-q37q.onrender.com/api/products"
      );
      setProducts(updated.data);
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete product.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Panel</h1>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Add New Category</h2>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="New Category"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <button
            type="button"
            onClick={handleAddCategory}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Add
          </button>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 mb-10">
        <input
          type="text"
          placeholder="Product Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="border p-2 rounded"
        />

        <select
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
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
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="border p-2 rounded"
        />

        <input
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          className="border p-2 rounded"
        />

        <input
          type="number"
          placeholder="Stock (optional)"
          value={formData.stock}
          onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
          className="border p-2 rounded"
        />

        {/* <input
          type="text"
          placeholder="Condition"
          value={formData.condition}
          onChange={(e) =>
            setFormData({ ...formData, condition: e.target.value })
          }
          className="border p-2 rounded"
        />

        <input
          type="text"
          placeholder="Color"
          value={formData.color}
          onChange={(e) => setFormData({ ...formData, color: e.target.value })}
          className="border p-2 rounded"
        /> */}

        <input
          type="file"
          key={formData.image ? formData.image.name : "image"}
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
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setEditProduct(p);
                  setFormData({
                    name: p.name || "",
                    category: p.category || "",
                    description: p.description || "",
                    price: p.price || "",
                    stock: p.stock || "",
                    condition: p.condition || "",
                    color: p.color || "",
                    image: null,
                  });
                }}
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
