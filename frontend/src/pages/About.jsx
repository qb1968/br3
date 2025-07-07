import Footer from "../components/Footer";


export default function About() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16 px-4 py-12 bg-gray-100 rounded-lg shadow-lg min-h-screen">
      <div>
        <img
          src="/images/br2.jpg"
          alt="About Us"
          className="w-full h-64 md:h-96 object-cover rounded-xl shadow-xl"
        />
      </div>
      <div>
        <h2 className="text-4xl font-bold mb-6 text-gray-900">Our Story</h2>
        <p className="text-lg text-gray-700 mb-4 font-bold">
          Builders Re-Source LLC is your go-to destination for overstock
          building supplies. With a rich history of providing high-quality
          materials at unbeatable prices, we have established ourselves as a
          trusted source in the industry.
        </p>
        <p className="text-lg text-gray-700 font-bold">
          Our commitment to excellence and customer satisfaction sets us apart
          as a reliable partner for all your building needs.
        </p>
      </div>
    </section>
  );
}
