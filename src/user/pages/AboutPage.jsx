// src/pages/AboutPage.jsx
import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  Clock,
  Shield,
  Truck,
  CreditCard,
  Users,
  Package,
  Star,
} from "lucide-react";

const VALUES = [
  {
    icon: Shield,
    title: "Quality First",
    text: "Every product is carefully selected and verified to ensure premium quality and authenticity.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    text: "Quick and reliable shipping across the country so you get your order when you need it.",
  },
  {
    icon: CreditCard,
    title: "Secure Payments",
    text: "Multiple safe payment options with full encryption and buyer protection.",
  },
];

const STATS = [
  { icon: Users, value: "50K+", label: "Happy Customers" },
  { icon: Package, value: "10K+", label: "Products Delivered" },
  { icon: Star, value: "4.8/5", label: "Average Rating" },
  { icon: Truck, value: "200+", label: "Partner Brands" },
];

const CONTACT = [
  { icon: Mail, label: "Email", value: "support@onebazaar.com" },
  { icon: Phone, label: "Phone", value: "+91 98765 43210" },
  { icon: Clock, label: "Support Hours", value: "Mon–Sat: 9AM – 8PM IST" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-white py-20 lg:py-28 border-b border-gray-100">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <span className="inline-block bg-blue-50 text-blue-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
            Since 2024
          </span>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            About oneBazaar
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            We bring you the best products from trusted brands at unbeatable
            prices. Your satisfaction is our priority — shop with confidence.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map(({ icon: Icon, value, label }) => (
            <div key={label} className="text-center">
              <Icon size={22} className="text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{value}</p>
              <p className="text-sm text-gray-500">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Why Shop With Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {VALUES.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="bg-white rounded-2xl border border-gray-200 p-8 text-center"
              >
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <Icon size={28} className="text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="bg-white py-16 lg:py-24 border-y border-gray-100">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Our Journey
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Founded in 2024, oneBazaar started with a simple mission: to
                make online shopping easy, affordable, and trustworthy for
                everyone.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Today, we partner with hundreds of trusted brands and sellers to
                bring you a curated selection of products across electronics,
                fashion, home goods, and more — all delivered with care.
              </p>
            </div>

            <div className="rounded-2xl overflow-hidden border border-gray-200">
              <img
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop"
                alt="Warehouse team preparing orders"
                className="w-full h-80 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
            Get in Touch
          </h2>
          <p className="text-gray-500 mb-12">
            We're here to help with any questions you have.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CONTACT.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="bg-white rounded-2xl border border-gray-200 p-6"
              >
                <Icon size={26} className="text-blue-600 mx-auto mb-3" />
                <h4 className="font-semibold text-gray-900 mb-1">{label}</h4>
                <p className="text-gray-500 text-sm">{value}</p>
              </div>
            ))}
          </div>

          <Link to="/contact" className="btn btn-primary btn-lg px-10 mt-12">
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
