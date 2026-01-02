// src/pages/ContactPage.jsx
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Form + Info */}
      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-sm p-8 lg:p-10">
              <h2 className="text-2xl font-semibold mb-8">Send us a message</h2>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="input input-bordered w-full h-12 rounded-xl"
                      placeholder="John"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="input input-bordered w-full h-12 rounded-xl"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="input input-bordered w-full h-12 rounded-xl"
                    placeholder="john@example.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full h-12 rounded-xl"
                    placeholder="Order inquiry"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    className="textarea textarea-bordered w-full h-40 rounded-xl"
                    placeholder="Write your message here..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-full h-14 text-lg font-medium rounded-xl flex items-center justify-center gap-3"
                >
                  <Send size={22} />
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-10">
              <div>
                <h2 className="text-2xl font-semibold mb-8">Contact Information</h2>
                <div className="space-y-8">
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail size={24} className="text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">Email</h4>
                      <p className="text-gray-600 mt-1">support@onebazaar.com</p>
                      <p className="text-gray-600">We reply within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone size={24} className="text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">Phone</h4>
                      <p className="text-gray-600 mt-1">+91 98765 43210</p>
                      <p className="text-gray-600">Mon–Sat, 9AM–6PM IST</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin size={24} className="text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">Office</h4>
                      <p className="text-gray-600 mt-1">
                        123 Commerce Street<br />
                        Bangalore, Karnataka 560001<br />
                        India
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock size={24} className="text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">Support Hours</h4>
                      <p className="text-gray-600 mt-1">
                        Monday–Saturday: 9:00 AM – 8:00 PM IST<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;