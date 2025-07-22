import { useEffect, useState } from "react";
import axios from "axios";
import Admin2 from "./AdminTable";

export default function Admin() {
  const [selectedTab, setSelectedTab] = useState("admin"); // "admin" or "admin2"
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    stock: "",
    condition: "",
    color: "",
    size: "",
    type: "",
    retail: "",
    images: [],
  });
  const [editProduct, setEditProduct] = useState(null);
  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  useEffect(() => {
    if (!isAuthenticated) return;
    axios
      .get("https://br3-q37q.onrender.com/api/categories")
      .then((res) => setCategories(res.data));
    axios
      .get("https://br3-q37q.onrender.com/api/products")
      .then((res) => setProducts(res.data));
  }, [isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (
      credentials.username === "admin" &&
      credentials.password === "admin123"
    ) {
      setIsAuthenticated(true);
      setShowLogin(false);
    } else {
      alert("Invalid credentials");
    }
  };

  const fetchProducts = async () => {
    const res = await axios.get("https://br3-q37q.onrender.com/api/products");
    setProducts(res.data);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, [name]: files }));

      // Create preview URLs for new images
      const previews = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setImagePreviews(previews);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, val]) => {
        if (key !== "images") {
          if (val !== null && val !== undefined) {
            data.append(key, val);
          }
        }
      });
      if (formData.images && formData.images.length > 0) {
        Array.from(formData.images).forEach((file) => {
          data.append("images", file);
        });
      }

      const url = editProduct
        ? `https://br3-q37q.onrender.com/api/products/${editProduct._id}`
        : "https://br3-q37q.onrender.com/api/products";
      const method = editProduct ? "put" : "post";

      await axios[method](url, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setEditProduct(null);
      resetForm();
      fetchProducts();
      setImagePreviews([]); // Clear previews on submit
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Failed to save product.");
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      category: "",
      description: "",
      price: "",
      stock: "",
      condition: "",
      color: "",
      size: "",
      type: "",
      retail: "",
      images: [],
    });
    setImagePreviews([]);
  };

  const handleEdit = (product) => {
    setEditProduct(product);
    setFormData({
      name: product.name || "",
      category: product.category || "",
      description: product.description || "",
      price: product.price || "",
      stock: product.stock || "",
      condition: product.condition || "",
      color: product.color || "",
      size: product.size || "",
      type: product.type || "",
      retail: product.retail || "",
      images: [], // reset images so user can add new if desired
    });
    // Show existing images as previews
    setImagePreviews(product.images || []);
  };

  // Cleanup preview URLs to avoid memory leaks
  useEffect(() => {
    return () => {
      imagePreviews.forEach((url) => {
        if (url.startsWith("blob:")) URL.revokeObjectURL(url);
      });
    };
  }, [imagePreviews]);

  if (showLogin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form
          onSubmit={handleLogin}
          className="bg-white p-8 rounded shadow-md w-full max-w-sm"
        >
          <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
          <input
            type="text"
            placeholder="Username"
            value={credentials.username}
            onChange={(e) =>
              setCredentials({ ...credentials, username: e.target.value })
            }
            className="border p-2 w-full mb-4 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
            className="border p-2 w-full mb-4 rounded"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-screen-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>

      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setSelectedTab("admin")}
          className={`px-6 py-2 rounded ${
            selectedTab === "admin"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Admin
        </button>
        <button
          onClick={() => setSelectedTab("admin2")}
          className={`px-6 py-2 rounded ${
            selectedTab === "admin2"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Admin 2
        </button>
      </div>

      {selectedTab === "admin" && (
        <>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6"
          >
            {[
              "name",
              "category",
              "description",
              "price",
              "stock",
              "condition",
              "color",
              "size",
              "type",
              "retail",
            ].map((field) => (
              <input
                key={field}
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                className="border p-2 rounded"
              />
            ))}
            <input
              type="file"
              name="images"
              multiple
              onChange={handleChange}
              className="sm:col-span-2"
            />

            {/* Image Previews */}
            {imagePreviews.length > 0 && (
              <div className="sm:col-span-2 flex flex-wrap gap-2">
                {imagePreviews.map((src, idx) => (
                  <img
                    key={idx}
                    src={src}
                    alt={`preview-${idx}`}
                    className="h-20 w-20 object-cover rounded border"
                  />
                ))}
              </div>
            )}

            <div className="sm:col-span-2 flex justify-between">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                {editProduct ? "Update Product" : "Add Product"}
              </button>
              {editProduct && (
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                  onClick={() => {
                    setEditProduct(null);
                    resetForm();
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>

          <table className="min-w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-2 py-1">Name</th>
                <th className="border px-2 py-1">Category</th>
                <th className="border px-2 py-1">Retail</th>
                <th className="border px-2 py-1">Type</th>
                <th className="border px-2 py-1">Size</th>
                <th className="border px-2 py-1">Color</th>
                <th className="border px-2 py-1">Stock</th>
                <th className="border px-2 py-1">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id}>
                  <td className="border px-2 py-1">{p.name}</td>
                  <td className="border px-2 py-1">{p.category}</td>
                  <td className="border px-2 py-1">{p.retail}</td>
                  <td className="border px-2 py-1">{p.type}</td>
                  <td className="border px-2 py-1">{p.size}</td>
                  <td className="border px-2 py-1">{p.color}</td>
                  <td className="border px-2 py-1">{p.stock}</td>
                  <td className="border px-2 py-1">
                    <button
                      className="text-blue-600 underline mr-2"
                      onClick={() => handleEdit(p)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {selectedTab === "admin2" && <Admin2 />}
    </div>
  );
}
