import ContactHeader from "../components/contact/ContactHeader";
import ContactForm from "../components/contact/ContactForm";
import ContactInfo from "../components/contact/ContactInfo";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Hero */}
        <ContactHeader />

        <div className="grid md:grid-cols-2 gap-10 lg:gap-12">
          {/* Form */}
          <ContactForm />

          {/* Contact Info */}
          <ContactInfo />
        </div>
      </div>
    </div>
  );
}
