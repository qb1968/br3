import { useEffect, useState } from "react";
import axios from "axios";
import Admin2 from "./AdminTable";

export default function Admin() {
  const [selectedTab, setSelectedTab] = useState("admin"); // "admin" or "admin2"
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]); // added categories state
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    priceType: "Each",
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
  const [newCategoryName, setNewCategoryName] = useState(""); // new state
  const [addingCategory, setAddingCategory] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

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
     const handleScroll = () => {
       setShowScrollTop(window.scrollY > 300);
     };
     window.addEventListener("scroll", handleScroll);
     return () => window.removeEventListener("scroll", handleScroll);
   }, []);

   const scrollToTop = () => {
     window.scrollTo({ top: 0, behavior: "smooth" });
   };


 const handleAddCategory = async () => {
   if (!newCategoryName.trim()) {
     alert("Please enter a category name");
     return;
   }
   try {
     const res = await axios.post(
       "https://br3-q37q.onrender.com/api/categories",
       { name: newCategoryName.trim() }
     );
     // Add the new category to categories list
     setCategories((prev) => [...prev, res.data]);
     // Select the newly added category in form
     setFormData((prev) => ({ ...prev, category: res.data.name }));
     // Reset new category input & hide it
     setNewCategoryName("");
     setAddingCategory(false);
   } catch (error) {
     console.error("Failed to add category", error);
     alert("Failed to add category");
   }
 };


  // Fetch categories & products after authentication
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
      priceType: product.priceType || "",
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

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    try {
      await axios.delete(`https://br3-q37q.onrender.com/api/products/${id}`);
      fetchProducts(); // Refresh list after deletion
    } catch (error) {
      console.error("Failed to delete product", error);
      alert("Failed to delete product");
    }
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
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="border p-2 rounded"
            />

            {/* Category dropdown with 'more...' last */}
            <select
              name="category"
              value={formData.category}
              onChange={(e) => {
                const val = e.target.value;
                if (val === "__add_new__") {
                  setAddingCategory(true);
                  setFormData((prev) => ({ ...prev, category: "" }));
                } else {
                  setAddingCategory(false);
                  setFormData((prev) => ({ ...prev, category: val }));
                }
              }}
              className="border p-2 rounded"
            >
              <option value="">Select Category</option>
              {categories
                .filter((cat) => cat.name.toLowerCase() !== "more...")
                .map((cat) => (
                  <option key={cat._id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              {categories.some(
                (cat) => cat.name.toLowerCase() === "more..."
              ) && (
                <option key="more" value="more...">
                  More...
                </option>
              )}
              <option value="__add_new__" className="font-bold">
                + Add New Category
              </option>
            </select>
            {addingCategory && (
              <div className="sm:col-span-2 flex gap-2 items-center">
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="New category name"
                  className="border p-2 rounded flex-grow"
                />
                <button
                  type="button"
                  onClick={handleAddCategory}
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAddingCategory(false);
                    setNewCategoryName("");
                  }}
                  className="bg-gray-400 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            )}
            <div className="flex gap-2 items-center">
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Price"
                className="border p-2 rounded flex-grow"
              />
              <select
                name="priceType"
                value={formData.priceType}
                onChange={handleChange}
                className="border p-2 rounded"
              >
                <option value="">-- None --</option>
                <option value="Each">Ea.</option>
                <option value="Bundle">Per Bundle</option>
                <option value="Box">Per Box</option>
                <option value="Pair">Pair</option>
              </select>
            </div>
            {[
              "description",
              // "price",
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
                <th className="border px-2 py-1">Price</th>
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
                  <td className="border px-2 py-1">{p.price}</td>
                  <td className="px-4 py-3">
                    <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(p)}
                      className="px-3 py-1 text-xs font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-lg"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="px-3 py-1 text-xs font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg"
                    >
                      🗑 Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {selectedTab === "admin2" && <Admin2 />}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-700 transition z-50"
          aria-label="Back to top"
        >
          ↑ Top
        </button>
      )}
    </div>
  );
}
