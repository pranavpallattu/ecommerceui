// src/pages/AboutPage.jsx
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Clock, Shield, Truck, CreditCard } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-20 lg:py-28">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            About oneBazaar
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We bring you the best products from trusted brands at unbeatable prices. 
            Your satisfaction is our priority — shop with confidence.
          </p>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield size={36} className="text-blue-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Quality First</h3>
              <p className="text-gray-600">
                Every product is carefully selected and verified to ensure premium quality and authenticity.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Truck size={36} className="text-blue-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Fast Delivery</h3>
              <p className="text-gray-600">
                Quick and reliable shipping across the country so you get your order when you need it.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CreditCard size={36} className="text-blue-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Secure Payments</h3>
              <p className="text-gray-600">
                Multiple safe payment options with full encryption and buyer protection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Our Journey
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Founded in 2024, oneBazaar started with a simple mission: to make online shopping easy, affordable, and trustworthy for everyone.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Today, we partner with hundreds of trusted brands and sellers to bring you a curated selection of products across electronics, fashion, home goods, and more — all delivered with care.
              </p>
            </div>

            <div className="bg-gray-200 border-2 border-dashed rounded-2xl w-full h-96" />
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-12">
            Get in Touch
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <Mail size={32} className="text-blue-600 mb-4" />
              <h4 className="font-semibold text-lg mb-2">Email</h4>
              <p className="text-gray-600">support@onebazaar.com</p>
            </div>

            <div className="flex flex-col items-center">
              <Phone size={32} className="text-blue-600 mb-4" />
              <h4 className="font-semibold text-lg mb-2">Phone</h4>
              <p className="text-gray-600">+91 98765 43210</p>
            </div>

            <div className="flex flex-col items-center">
              <Clock size={32} className="text-blue-600 mb-4" />
              <h4 className="font-semibold text-lg mb-2">Support Hours</h4>
              <p className="text-gray-600">Mon–Sat: 9AM – 8PM IST</p>
            </div>
          </div>

          <div className="mt-12">
            <Link to="/contact" className="btn btn-primary btn-lg px-10">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;