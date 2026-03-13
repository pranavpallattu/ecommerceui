// src/pages/ContactPage.jsx
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import React from "react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have a question or feedback? We're here to help.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 lg:gap-12">
          {/* Form */}
          <div className="bg-white rounded-2xl shadow-sm p-6 lg:p-8">
            <h2 className="text-2xl font-semibold mb-6">Send a Message</h2>

            <form className="space-y-5">
              <input
                type="text"
                placeholder="Your Name"
                className="input input-bordered w-full h-12 rounded-xl"
                required
              />
              <input
                type="email"
                placeholder="Email Address"
                className="input input-bordered w-full h-12 rounded-xl"
                required
              />
              <input
                type="text"
                placeholder="Subject"
                className="input input-bordered w-full h-12 rounded-xl"
                required
              />
              <textarea
                placeholder="Your message..."
                className="textarea textarea-bordered w-full h-36 rounded-xl"
                required
              />
              <button
                type="submit"
                className="btn btn-primary w-full h-12 text-base font-medium rounded-xl flex items-center justify-center gap-2"
              >
                <Send size={18} />
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <h2 className="text-2xl font-semibold">Contact Info</h2>

            <div className="space-y-6">
              <ContactItem icon={<Mail />} title="Email" text="support@onebazaar.com" sub="Replies within 24 hours" />
              <ContactItem icon={<Phone />} title="Phone" text="+91 98765 43210" sub="Mon–Sat, 9AM–6PM IST" />
              <ContactItem 
                icon={<MapPin />} 
                title="Office" 
                text="123 Commerce Street, Bangalore, Karnataka 560001, India" 
              />
              <ContactItem icon={<Clock />} title="Hours" text="Monday–Saturday: 9AM–6PM IST" sub="Sunday: Closed" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const ContactItem = ({ icon, title, text, sub }) => (
  <div className="flex items-start gap-4">
    <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center flex-shrink-0">
      {React.cloneElement(icon, { size: 20, className: "text-indigo-600" })}
    </div>
    <div>
      <h4 className="font-semibold text-lg text-gray-900">{title}</h4>
      <p className="text-gray-700 mt-0.5">{text}</p>
      {sub && <p className="text-sm text-gray-500 mt-1">{sub}</p>}
    </div>
  </div>
);