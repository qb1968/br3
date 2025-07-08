export default function About() {
  return (
    <section className="bg-gray-100 py-16 px-6 md:px-12 lg:px-24 rounded-lg shadow-lg min-h-screen">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <img
            src="/images/br2.jpg"
            alt="About Us"
            className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-xl shadow-xl"
          />
        </div>

        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            Our Story
          </h2>
          <p className="text-base md:text-lg text-gray-700 mb-4 font-semibold">
            Builders Re-Source LLC is your go-to destination for overstock
            building supplies. With a rich history of providing high-quality
            materials at unbeatable prices, we have established ourselves as a
            trusted source in the industry.
          </p>
          <p className="text-base md:text-lg text-gray-700 font-semibold mb-6">
            Our commitment to excellence and customer satisfaction sets us apart
            as a reliable partner for all your building needs.
          </p>

          <div className="p-6 rounded-xl shadow bg-blue-100">
            <h3 className="text-2xl font-bold mb-4 text-center text-blue-800">
              Why Choose Us?
            </h3>
            <p className="text-gray-700 mb-4">
              Builders Re-Source LLC stands out for its commitment to
              excellence, vast product range, quality assurance, expert
              guidance, and exceptional customer service.
            </p>
            <p className="text-gray-700">
              Explore categories to discover the latest items and deals tailored
              just for you.
            </p>
          </div>
        </div>
      </div>
      
    </section>
  );
}
