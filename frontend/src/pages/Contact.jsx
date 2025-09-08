import React from "react";
import { Helmet } from "@dr.pogodin/react-helmet";

export default function Contact() {
  return (
    <main className="bg-gray-50 min-h-screen">
      <Helmet>
        <title>Contact Us | Builders Re-Source</title>
        <meta
          name="description"
          content="Get in touch with Builders Re-Source for affordable, high-quality building supplies. Visit us in Burlington, NC or send us a message online."
        />
        <meta
          name="keywords"
          content="contact Builders Re-Source, Burlington NC building supplies, Alamance County construction materials, North Carolina discount windows, siding Burlington NC, home improvement supplies Alamance County"
        />
        <meta property="og:title" content="Contact Builders Re-Source" />
        <meta
          property="og:description"
          content="Reach out to Builders Re-Source in Burlington, NC for all your building supply needs. Affordable windows, siding, doors, and more."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://buildersre-source.com/contact"
        />
        <meta property="og:image" content="/images/newbr1.jpeg" />
      </Helmet>
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
          <form
            action="https://submit-form.com/kbExC8Cje"
            method="POST"
            className="space-y-6"
          >
            {/* Optional: disable CAPTCHA */}
            <input type="hidden" name="_captcha" value="false" />
            {/* Hidden field to prevent spam */}
            <input type="hidden" name="_captcha" value="false" />
            <input
              type="hidden"
              name="_redirect"
              value="https://br3-jonathan-allisons-projects.vercel.app/"
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                name="name"
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                name="email"
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                name="phone"
                type="tel"
                placeholder="(555) 123-4567"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                name="message"
                rows="5"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type your message..."
                required
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
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3218.954680290678!2d-79.44463532418821!3d36.2162964724194!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8852d46de2c2e4c9%3A0xfd032480895dd017!2s4309%20Sartin%20Rd%2C%20Burlington%2C%20NC%2027217!5e0!3m2!1sen!2sus!4v1752264946412!5m2!1sen!2sus"
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
