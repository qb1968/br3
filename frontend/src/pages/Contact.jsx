import React from "react";

export default function Contact() {
    return (
      <div>
        <section className="text-center py-24 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg shadow mb-10">
          <h1 className="text-5xl font-extrabold mb-6">Contact Us</h1>
          <p className="text-xl">
            For inquiries, product information, or assistance, feel free to
            contact us. We are here to address your queries and provide you
            with the support you need.
          </p>
        </section>
        <section className="mt-20 bg-gray-100 p-8 rounded-lg shadow">
          <form className="max-w-2xl mx-auto space-y-6">
            <div>
              <label className="block text-gray-700 mb-2">Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Message</label>
              <textarea
                rows="5"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Type your message..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </form>
        </section>
        <section className="mt-16">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">
            Our Location
          </h2>
          <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg">
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
      </div>
    );
}