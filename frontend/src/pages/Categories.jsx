import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get("https://br3-q37q.onrender.com/api/categories").then((res) => {
      console.log("Fetched categories:", res.data); // Debug
      setCategories(res.data);
    });
  }, []);
  

  return (
    <div className="max-w-4xl mx-auto p-6  ">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Browse by Category
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6 ">
        {categories.map((cat) => (
          <Link
            key={cat._id}
            to={`/category/${cat.name.toLowerCase()}`}
            className="bg-blue-100 hover:bg-blue-200 text-blue-800 font-semibold py-3 px-4 rounded text-center"
          >
            {cat.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
