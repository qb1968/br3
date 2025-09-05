// import axios from "axios";
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import Category from "./Categories";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Slider from "react-slick";
// import ProductCard from "../components/ProductCard";

// export default function Home() {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     axios
//       .get("https://br3-q37q.onrender.com/api/products")
//       .then((res) => setProducts(res.data))
//       .catch((err) => console.error("Fetch error:", err));
//   }, []);

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//     responsive: [
//       { breakpoint: 1024, settings: { slidesToShow: 2 } },
//       { breakpoint: 768, settings: { slidesToShow: 1 } },
//     ],
//   };

//   return (
//     <div className="bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//         {/* Hero Image Section */}
//         <section className="mb-16">
//           <div className="rounded-xl overflow-hidden shadow-lg">
//             <img
//               src="/images/br1.jpg"
//               alt="Storefront Hero"
//               className="w-full h-64 sm:h-80 md:h-96 object-cover"
//             />
//           </div>
//         </section>

//         {/* Welcome / About Section */}
//         <section className="bg-white rounded-xl shadow p-8 mb-16">
//           <h1 className="text-4xl font-bold text-center text-blue-800 mb-6">
//             Quality Building Supplies
//           </h1>
//           <p className="text-lg text-gray-700 leading-relaxed text-center max-w-4xl mx-auto">
//             🌟 Welcome to Burlington's hub for overstock building supplies! 🏠✨
//             <br />
//             <br />
//             🏡 Need energy-efficient windows to keep your home cozy and your
//             bills low? From siding to soffit, fiber cement to shutters —
//             Builders Re-Source buys overstock inventory and sells it to you at
//             discounted prices. Constantly changing inventory means more ways to
//             meet your dream home goals.
//             <br />
//             <br />
//             🛠️ We’re more than just suppliers — we’re your partner in home
//             improvement. Expect expert advice, personalized service, quality
//             products, and manufacturer warranties.
//           </p>
//         </section>

//         {/* Featured Products Section */}
//         <section className="mb-20">
//           <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
//             Featured Products
//           </h2>
//           <Slider {...settings}>
//             {products.slice(0, 10).map((product) => (
//               <div key={product._id} className="px-3">
//                 <ProductCard product={product} />
//               </div>
//             ))}
//           </Slider>
//           <div className="text-center mt-10">
//             <Link
//               to="/products"
//               className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-md transition duration-200"
//             >
//               View All Products
//             </Link>
//           </div>
//         </section>

//         {/* Feature/Highlight Section */}
//         <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg-blue-100 p-10 rounded-xl shadow">
//           <div>
//             <h2 className="text-4xl font-bold text-blue-800 mb-4 text-center md:text-left">
//               Wide Variety
//             </h2>
//             <p className="text-gray-700 text-lg leading-relaxed text-center md:text-left">
//               At Builders Re-Source LLC, quality is our top priority. We ensure
//               all our materials are top-tier, reliable, and ready to support
//               your next home project.
//             </p>
//           </div>
//           <div>
//             <img
//               src="/images/br1.jpg"
//               alt="Building Materials"
//               className="rounded-xl shadow-lg w-full h-64 object-cover"
//             />
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// }
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "@dr.pogodin/react-helmet";
import Categories from "./Categories";
import ProductCard from "../components/ProductCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import AOS from "aos";
import "aos/dist/aos.css";


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
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };
  useEffect(() => {
    AOS.init({
      duration: 800, // animation duration in ms
      once: true, // animate only once
      offset: 100, // offset from the trigger point
    });
  }, []);

  return (
    <>
      {/* ✅ Dynamic SEO Meta Tags */}
      <Helmet>
        <title>Builders Re-Source | Quality Building Supplies</title>
        <meta
          name="description"
          content="Burlington's trusted source for overstock building supplies. High-quality materials at unbeatable prices – from windows to siding, we’ve got your next project covered."
        />
        <meta
          name="keywords"
          content="building supplies, builders resource llc, building supplies Burlington, Alamance County building supplies, North Carolina building materials, overstock building materials, discount windows Burlington, siding Burlington NC, fiber cement siding North Carolina, soffit Alamance County, shutters Burlington NC, surplus building materials NC, discount doors Alamance County, energy-efficient windows North Carolina, home improvement supplies Burlington NC, construction materials Alamance County, discount building supplies North Carolina"
        />

        <meta
          property="og:title"
          content="Builders Re-Source | Quality Building Supplies"
        />
        <meta
          property="og:description"
          content="Shop siding, windows, doors, and more at unbeatable prices."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/newbr1.jpeg" />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 overflow-hidden">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-gray-600 to-gray-700 rounded-2xl overflow-hidden shadow-2xl mb-20">
          <img src="/images/newbr1.jpeg" alt="" className="w-full  " />
          <div
            className="absolute inset-0 opacity-20 bg-cover bg-center"
            style={{ backgroundImage: "" }}
          />
          <div className="relative p-12 sm:p-20 text-white text-center">
            <h1
              className="text-4xl sm:text-5xl font-extrabold mb-4 text-black"
              data-aos="fade-down"
              data-aos-delay="200"
            >
              Quality Building Supplies
            </h1>
            <p
              className="text-lg sm:text-xl max-w-3xl mx-auto text-black font-bold"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              🛠️ Burlington's trusted source for overstock building supplies.
              High-quality materials at unbeatable prices – from windows to
              siding, we’ve got your next project covered.
            </p>
          </div>
        </section>

        {/* Categories (optional) */}
        <Categories />

        {/* About / Intro Section */}
        <section className="bg-white p-8 rounded-xl shadow-md mb-16">
          <h2 className="text-3xl font-bold mb-4 text-gray-800 text-center">
            Why Choose Builders Re-Source?
          </h2>
          <p className="text-gray-600 max-w-4xl mx-auto text-center leading-relaxed">
            We specialize in high-quality overstock building supplies sourced
            directly from trusted manufacturers. Whether you're updating your
            home or starting a new build, our curated inventory and expert staff
            help you save without sacrificing quality.
          </p>
        </section>

        {/* Featured Products */}
        <section className="bg-white p-8 rounded-xl shadow-md mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
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
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              See All Products
            </Link>
          </div>
        </section>

        {/* Highlight Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-blue-50 p-10 rounded-xl shadow mb-20">
          <div data-aos="fade-right">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Wide Variety
            </h3>
            <p className="text-gray-700 leading-relaxed">
              We carry a broad range of inventory including fiber cement, vinyl
              siding, shutters, doors, and energy-efficient windows. Inventory
              is updated regularly, so check back often!
            </p>
          </div>
          <div data-aos="fade-left">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Guaranteed Quality
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Every product we stock is vetted for durability and backed by
              manufacturers’ warranties. We're committed to delivering lasting
              value and expert customer support for every homeowner and
              contractor.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
