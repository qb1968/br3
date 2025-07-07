import axios from "axios";
import { useEffect, useState } from "react";

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    stock: "",
    image: null,
  });
  const [editProduct, setEditProduct] = useState(null);
  const [showLogin, setShowLogin] = useState(true);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("https://br3-q37q.onrender.com/api/categories")
      .then((res) => setCategories(res.data));
  }, []);

  

  const addCategory = async (name) => {
    try {
      const res = await axios.get("https://br3-q37q.onrender.com/api/categories");
      const exists = res.data.find(
        (c) => c.name.toLowerCase() === name.toLowerCase()
      );
      if (!exists) {
        await axios.post("https://br3-q37q.onrender.com/api/categories", { name });
      }
    } catch (err) {
      console.error("Error creating category", err);
    }
  };
  

  const handleLogin = (e) => {
    e.preventDefault();
    if (
      credentials.username === "admin" &&
      credentials.password === "admin123"
    ) {
      setShowLogin(false);
    } else {
      alert("Invalid credentials");
    }
  };

  const fetchProducts = () => {
    axios
      .get("https://br3-q37q.onrender.com/api/products")
      .then((res) => setProducts(res.data));
  };

  useEffect(() => {
    if (!showLogin) fetchProducts();
  }, [showLogin]);

  const handleDelete = async (id) => {
    await axios.delete(`https://br3-q37q.onrender.com/api/products/${id}`);
    fetchProducts();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    if (editProduct) {
      data.append("name", editProduct.name);
      data.append("category", editProduct.category);
      data.append("description", editProduct.description);
      data.append("price", editProduct.price);
      data.append("stock", editProduct.stock);
      if (formData.image) data.append("image", formData.image);
      await axios.put(
        `https://br3-q37q.onrender.com/api/products/${editProduct._id}`,
        data
      );
      setEditProduct(null);
    } else {
      await addCategory(formData.category);
      Object.entries(formData).forEach(([key, value]) =>
        data.append(key, value)
      );
      await axios.post("https://br3-q37q.onrender.com/api/products", data);
    }

    setFormData({
      name: "",
      category: "",
      description: "",
      price: "",
      stock: "",
      image: null,
    });
    fetchProducts();
  };

  if (showLogin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form
          onSubmit={handleLogin}
          className="bg-white p-6 rounded shadow-md w-80"
        >
          <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
          <input
            type="text"
            placeholder="Username"
            value={credentials.username}
            onChange={(e) =>
              setCredentials({ ...credentials, username: e.target.value })
            }
            className="w-full mb-3 px-3 py-2 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
            className="w-full mb-4 px-3 py-2 border rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Panel</h1>

      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <h2>Product Name</h2>
        <input
          type="text"
          placeholder="Product Name"
          value={editProduct ? editProduct.name : formData.name}
          onChange={(e) =>
            editProduct
              ? setEditProduct({ ...editProduct, name: e.target.value })
              : setFormData({ ...formData, name: e.target.value })
          }
          className="w-full px-4 py-2 border rounded-lg"
        />
        <h2>Category</h2>
        <input
          type="text"
          list="category-options"
          value={editProduct ? editProduct.category : formData.category}
          onChange={(e) =>
            editProduct
              ? setEditProduct({ ...editProduct, category: e.target.value })
              : setFormData({ ...formData, category: e.target.value })
          }
          className="w-full px-4 py-2 border rounded-lg"
        />
        <datalist id="category-options">
          {categories.map((c) => (
            <option key={c._id} value={c.name} />
          ))}
        </datalist>

        <select
          value={editProduct ? editProduct.category : formData.category}
          onChange={(e) =>
            editProduct
              ? setEditProduct({ ...editProduct, category: e.target.value })
              : setFormData({ ...formData, category: e.target.value })
          }
          className="w-full px-4 py-2 border rounded-lg"
        >
          <option value="">Select Category</option>
          {categories.map((c) => (
            <option key={c._id} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
        <h2>Description</h2>
        <textarea
          placeholder="Description"
          value={editProduct ? editProduct.description : formData.description}
          onChange={(e) =>
            editProduct
              ? setEditProduct({ ...editProduct, description: e.target.value })
              : setFormData({ ...formData, description: e.target.value })
          }
          className="block-2 mb-1 font-medium "
        ></textarea>
        <h2>Price</h2>
        <input
          type="number"
          placeholder="Price"
          value={editProduct ? editProduct.price : formData.price}
          onChange={(e) =>
            editProduct
              ? setEditProduct({ ...editProduct, price: e.target.value })
              : setFormData({ ...formData, price: e.target.value })
          }
          className="w-full px-4 py-2 border rounded-lg"
        />
        <h2>Inventory</h2>
        <input
          type="number"
          placeholder="Stock"
          value={editProduct ? editProduct.stock : formData.stock}
          onChange={(e) =>
            editProduct
              ? setEditProduct({ ...editProduct, stock: e.target.value })
              : setFormData({ ...formData, stock: e.target.value })
          }
          className="w-full px-4 py-2 border rounded-lg"
        />
        <h2>Image</h2>
        <input
          type="file"
          onChange={(e) =>
            setFormData({ ...formData, image: e.target.files[0] })
          }
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          type="submit"
          className={`w-full py-2 px-4 ${
            editProduct ? "bg-yellow-500" : "bg-blue-500"
          } text-white rounded-lg hover:opacity-90`}
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
                image: null,
              });
            }}
            className="w-full py-2 px-4 bg-gray-500 text-white rounded-lg hover:opacity-90 mt-2"
          >
            Cancel Edit
          </button>
        )}
      </form>

      <h2 className="text-2xl font-semibold mb-4">Current Products:</h2>
      <ul className="space-y-4">
        {products.map((p) => (
          <li
            key={p._id}
            className="p-4 border rounded-lg flex justify-between items-center shadow-sm"
          >
            <div>
              <p className="font-medium">{p.name}</p>
              <p className="text-sm text-gray-600">
                ${p.price} - Stock: {p.stock}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleDelete(p._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
              <button
                onClick={() => setEditProduct(p)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
