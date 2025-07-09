import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function About() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 min-h-screen">
      {/* Header Section */}
      <section
        className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl shadow-lg p-10 text-center"
        data-aos="fade-up"
        data-aos-delay="400"
      >
        <h1 className="text-5xl font-extrabold mb-4">About Us</h1>
        <p className="text-lg max-w-3xl mx-auto leading-relaxed">
          At Builders Re-Source, we’re more than just suppliers — we’re your
          partners in construction and renovation. With deep industry
          relationships and access to premium overstock inventory, we offer
          homeowners and contractors affordable solutions without compromising
          quality.
        </p>
      </section>

      {/* Core Info Section */}
      <section
        className="mt-16 bg-white p-8 rounded-xl shadow-md"
        data-aos="fade-up"
        data-aos-delay="600"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Our Mission
        </h2>
        <p className="text-gray-700 max-w-4xl mx-auto leading-relaxed text-center">
          Our mission is to help you build better for less. We aim to bridge the
          gap between quality construction materials and affordable pricing by
          sourcing surplus, discontinued, and overstock products from
          manufacturers you trust. Whether you're remodeling a home, replacing
          windows, or starting a new build, our team is here to support your
          vision.
        </p>
      </section>

      {/* Values Section */}
      <section
        className="mt-16 bg-blue-50 p-8 rounded-xl shadow-md"
        data-aos="fade-up"
        data-aos-delay="800"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          What Sets Us Apart
        </h2>
        <ul className="space-y-4 text-gray-700 max-w-3xl mx-auto text-lg">
          <li>✔️ Expert advice and customer-first service</li>
          <li>✔️ Access to premium building materials</li>
          <li>✔️ Affordable pricing from overstock and surplus</li>
          <li>✔️ Inventory backed by manufacturers’ warranties</li>
        </ul>
      </section>

      {/* Call to Action */}
      <section
        className="mt-20 text-center"
        data-aos="fade-up"
        data-aos-delay="1000"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Ready to start your next project?
        </h2>
        <a
          href="/contact"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Contact Us
        </a>
      </section>
    </div>
  );
}
