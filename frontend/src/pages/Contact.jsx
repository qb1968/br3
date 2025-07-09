import React from "react";

export default function Contact() {
  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="text-center py-24 bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-xl rounded-b-3xl">
        <h1 className="text-5xl font-extrabold mb-4">Contact Us</h1>
        <p className="text-lg max-w-3xl mx-auto px-4">
          For inquiries, product information, or assistance, feel free to reach
          out. We're here to provide expert support and personalized service.
        </p>
      </section>

      {/* Contact Form Section */}
      <section className="max-w-3xl mx-auto mt-20 px-6">
        <div className="bg-white shadow-lg rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-8 text-gray-800 text-center">
            Send Us a Message
          </h2>
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                rows="5"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type your message..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition duration-200"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Location Map Section */}
      <section className="max-w-6xl mx-auto px-6 mt-24 mb-20">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">
          Our Location
        </h2>
        <div className="w-full h-96 rounded-2xl overflow-hidden shadow-xl border">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3218.9546885192967!2d-79.44473692418822!3d36.21629627241934!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8852d46e0a45c8e5%3A0x8dc921b31937e09f!2s4307%20Sartin%20Rd%2C%20Burlington%2C%20NC%2027217!5e0!3m2!1sen!2sus!4v1751820187244!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Store Location"
          ></iframe>
        </div>
      </section>
    </main>
  );
}
