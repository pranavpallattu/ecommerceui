// src/components/contact/ContactInfo.jsx
import ContactItem from "./ContactItem";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export default function ContactInfo() {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold">Contact Info</h2>

      <div className="space-y-6">
        <ContactItem 
          icon={<Mail />} 
          title="Email" 
          text="support@onebazaar.com" 
          sub="Replies within 24 hours" 
        />
        <ContactItem 
          icon={<Phone />} 
          title="Phone" 
          text="+91 98765 43210" 
          sub="Mon–Sat, 9AM–6PM IST" 
        />
        <ContactItem 
          icon={<MapPin />} 
          title="Office" 
          text="123 Commerce Street, Bangalore, Karnataka 560001, India" 
        />
        <ContactItem 
          icon={<Clock />} 
          title="Hours" 
          text="Monday–Saturday: 9AM–6PM IST" 
          sub="Sunday: Closed" 
        />
      </div>
    </div>
  );
}