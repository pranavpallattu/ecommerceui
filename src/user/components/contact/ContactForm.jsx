import { Send } from "lucide-react";

export default function ContactForm() {
  return (
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
  );
}
