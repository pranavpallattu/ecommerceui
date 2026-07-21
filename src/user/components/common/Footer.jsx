import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-10">
      <div className="max-w-7xl mx-auto px-4 md:px-10 py-10">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Tagline */}
          <div>
            <h2 className="text-2xl font-bold text-blue-600">oneBazaar</h2>
            <p className="mt-2 text-sm text-gray-600 leading-relaxed">
              Your one-stop destination for
              <span className="text-blue-600 font-medium"> smart shopping</span>
              , best deals, and trusted brands.
            </p>

            {/* Keywords */}
            <div className="mt-4 flex flex-wrap gap-2">
              {[
                "Electronics",
                "Fashion",
                "Home Appliances",
                "Best Deals",
                "Secure Payments",
              ].map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-3">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link className="text-gray-600 hover:text-blue-600">Home</Link>
              </li>
              <li>
                <Link to="/shop" className="text-gray-600 hover:text-blue-600">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-blue-600">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-600 hover:text-blue-600"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-3">
              Customer Support
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-600 hover:text-blue-600">FAQ</li>
              <li className="text-gray-600 hover:text-blue-600">Returns</li>
              <li className="text-gray-600 hover:text-blue-600">Shipping</li>
              <li className="text-gray-600 hover:text-blue-600">
                Privacy Policy
              </li>
            </ul>
          </div>

          {/* Trust / Info */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-3">
              oneBazaar Promise
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>✔ 100% Secure Payments</li>
              <li>✔ Trusted Sellers</li>
              <li>✔ Easy Returns</li>
              <li>✔ Fast Delivery</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 mt-8 pt-4 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} oneBazaar. All rights reserved.
          </p>

          <p className="text-xs text-gray-500">
            Built with 💙 for smart shoppers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
