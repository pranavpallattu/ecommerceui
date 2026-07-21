import { Link } from "react-router-dom";
import { Home, AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        {/* Icon */}
        <div className="mx-auto mb-8">
          <AlertCircle
            className="w-24 h-24 lg:w-32 lg:h-32 text-indigo-500 mx-auto opacity-80"
            strokeWidth={1.2}
          />
        </div>

        {/* Main Text */}
        <h1 className="text-7xl lg:text-9xl font-black text-gray-800 tracking-tight mb-4">
          404
        </h1>

        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h2>

        <p className="text-lg lg:text-xl text-gray-600 mb-10">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="btn btn-primary btn-lg gap-2 px-10">
            <Home size={20} />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
