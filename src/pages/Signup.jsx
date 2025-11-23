import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const SignupPage = () => {
  const [otpSent, setOtpSent] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl bg-white shadow-xl rounded-3xl overflow-hidden grid md:grid-cols-2">
        {/* Left Side — Branding */}
        <div className="bg-gray-900 text-white p-14 flex flex-col justify-center">
          <h1 className="text-4xl font-bold leading-tight mb-4">
            Create Your Account
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed max-w-md">
            Join the community and start exploring exclusive collections built
            for modern shopping.
          </p>
        </div>

        {/* Right Side Form */}
        <div className="p-14 flex items-center justify-center bg-white">
          <div className="w-full max-w-md">
            {/* Email Step */}
            {!otpSent && (
              <>
                <h2 className="text-3xl font-semibold text-gray-900 mb-2">
                  Sign Up
                </h2>
                <p className="text-gray-500 mb-8">
                  Create an account to continue
                </p>

                {/* Google Button */}
                <button className="btn w-full h-12 bg-white border border-gray-300 hover:bg-gray-100 flex items-center justify-center gap-3 rounded-xl shadow-sm">
                  <img
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    className="w-5 h-5"
                  />
                  <span className="text-gray-700 font-medium">
                    Continue with Google
                  </span>
                </button>

                {/* Divider */}
                <div className="relative my-8 text-center">
                  <div className="h-px bg-gray-200 w-full"></div>
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 bg-white text-gray-400 text-sm">
                    or continue with email
                  </span>
                </div>

                {/* Email Input */}
                <div className="mb-6">
                  <label className="block mb-2 text-gray-700 font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-12 px-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-neutral focus:outline-none"
                  />
                </div>

                {/* Request OTP */}
                <button
                  className="btn btn-neutral w-full h-12 rounded-xl text-base shadow-sm"
                  onClick={() => setOtpSent(true)}
                >
                  Request OTP
                </button>
              </>
            )}

            {/* OTP Step */}
            {otpSent && (
              <>

                  {/* Back Button */}
    <button
      onClick={() => setOtpSent(false)}
      className="flex items-center gap-2 text-gray-600 mb-6 hover:text-gray-800"
    >
      <span className="text-xl"> <FontAwesomeIcon icon={faArrowLeft} /> </span> {/* Left Arrow */}
      Back
    </button>

                <h2 className="text-3xl font-semibold text-gray-900 mb-2">
                  Enter OTP
                </h2>
                <p className="text-gray-500 mb-6">
                  An OTP has been sent to <strong>{email}</strong>
                </p>

                <div className="mb-6">
                  <label className="block mb-2 text-gray-700 font-medium">
                    OTP
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="123456"
                    className="w-full h-12 px-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-neutral focus:outline-none tracking-widest text-center"
                  />
                </div>

                {/* Verify Button */}
                <button className="btn btn-neutral w-full h-12 rounded-xl text-base shadow-sm">
                  Verify OTP
                </button>

                {/* Resend OTP */}
                <p className="text-center text-sm text-gray-500 mt-4">
                  Didn’t receive OTP?{" "}
                  <button className="text-neutral font-medium hover:underline">
                    Resend
                  </button>
                </p>
              </>
            )}

            {/* Login Link */}
            <p className="text-center text-sm text-gray-500 mt-6">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-neutral font-medium hover:underline"
              >
                Log in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
