import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Category from "./Categories";
// In Home.jsx or your global index.css
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import ProductCard from "../components/ProductCard"


export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://br3-q37q.onrender.com/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // adjust for mobile
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };


  return (
    <div className="flex flex-col min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-10 ">
        <section className="grid grid-cols-1 md:grid-cols-1 items-center gap-12 py-20 px-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg shadow mb-10">
          <div>
            <img
              src="/images/br1.jpg"
              alt="Storefront Hero"
              className="w-full h-64 md:h-96 object-cover rounded-xl shadow-xl"
            />
          </div>
        </section>
        {/* Hero section */}
        <section className="text-center py-20 bg-blue-100 rounded-lg shadow mb-10">
          <h1 className="text-4xl font-bold mb-4">Quality Building Supplies</h1>
          <p className="text-lg text-gray-700 ">
            🌟 Welcome to Burlington's hub for overstock building supplies! 🏠✨
            🏡 Need energy-efficient windows to keep your home cozy and your
            bills low? Check out our selection. 🛠️ From siding to soffit, fiber
            cement to shutters. We buy overstock inventory and are able to sell
            it to you at a discounted rate from that in the retail store. We
            constantly have a variety of inventory to help you achieve your
            dream home goals. At Builders Re-Source, we're more than just
            suppliers — we're your source in home improvement. We are here to
            provide expert advice, personalized service, high quality products
            and almost all carry manufacturers warranty.
          </p>
        </section>

        <section className="mt-16">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Featured Products
          </h2>
          <Slider {...settings}>
            {products.slice(0, 10).map((product) => (
              <div key={product._id} className="px-2">
                <ProductCard product={product} />
              </div>
            ))}
          </Slider>
          <div className="text-center mt-8">
            <Link
              to="/products"
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              See All Products
            </Link>
          </div>
        </section>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-16 mt-16">
          <div className="p-6 rounded-lg shadow bg-blue-100">
            <h2 className="text-4xl font-bold mb-6 flex justify-center">
              Why Choose Us?
            </h2>
            <p className="text-gray-700 mb-6 ">
              Builders Re-Source LLC stands out for its commitment to
              excellence, vast product range, quality assurance, expert
              guidance, and exceptional customer service. Experience the
              difference with us today.
            </p>
            <p className="text-gray-700">
              Explore categories to discover the latest items and deals tailored
              just for you.
            </p>
          </div>

          <div className="bg-white p-4 ">
            <h2 className="text-4xl font-bold mb-6 flex justify-center">
              Wide Variety
            </h2>
            <p className="text-gray-700 mb-6 ">
              At Builders Re-Source LLC, quality is our top priority. We
              guarantee that all our building supplies are of the highest
              quality, providing you with durable and reliable materials.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
