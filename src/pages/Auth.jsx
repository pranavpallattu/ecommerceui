import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";

const Auth = () => {
  const [otpSent, setOtpSent] = useState(false);
  const [email, setEmail] = useState("");

  const handleGoogleSignup = () => {
    try {
      window.location.assign("http://localhost:7777/google");
    } catch (error) {
      console.error("Google Auth Error:", error);
      alert("Unable to start Google login. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl bg-white shadow-xl rounded-3xl overflow-hidden grid md:grid-cols-2">

        {/* Left Side — Branding */}
        <div className="bg-gray-900 text-white p-14 flex flex-col justify-center items-start">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgiPftJFEcFuclHRqhqXpbM58OXt2F5zRmtA&s"
            className="w-20 h-20 mb-6 rounded-xl object-cover"
            alt="OneBazaar Logo"
          />

          <h1 className="text-4xl font-bold leading-tight mb-3">
            Welcome to OneBazaar
          </h1>

          <p className="text-gray-300 text-lg mb-6">
            One World. Infinite Finds.
          </p>

          <p className="text-gray-400 text-md max-w-md leading-relaxed">
            Your all-in-one destination. Log in or create an account instantly
            using Google or secure Email & OTP authentication — no passwords, no friction.
          </p>
        </div>

        {/* Right Side Form */}
        <div className="p-14 flex items-center justify-center bg-white">
          <div className="w-full max-w-md">

            {/* Email Step */}
            {!otpSent && (
              <>
                <h2 className="text-3xl font-semibold text-gray-900 mb-2">
                  Sign In or Create Account
                </h2>
                <p className="text-gray-500 mb-8">
                  Fast, secure & password-free authentication
                </p>

                {/* Google Button */}
                <button
                  onClick={handleGoogleSignup}
                  className="btn w-full h-12 bg-white border border-gray-300 hover:bg-gray-100 flex items-center justify-center gap-3 rounded-xl shadow-sm"
                >
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
                    or use your email
                  </span>
                </div>

                {/* Email Input */}
                <div className="mb-6">
                  <label className="block mb-2 text-gray-700 font-medium">
                    Email Address
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
                  Send OTP
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
                  <span className="text-xl">
                    <FontAwesomeIcon icon={faArrowLeft} />
                  </span>
                  Back
                </button>

                <h2 className="text-3xl font-semibold text-gray-900 mb-2">
                  Verify OTP
                </h2>
                <p className="text-gray-500 mb-6">
                  We sent a 6-digit OTP to <strong>{email}</strong>
                </p>

                <div className="mb-6">
                  <label className="block mb-2 text-gray-700 font-medium">
                    Enter OTP
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
                  Continue
                </button>

                {/* Resend OTP */}
                <p className="text-center text-sm text-gray-500 mt-4">
                  Didn't receive the OTP?{" "}
                  <button className="text-neutral font-medium hover:underline">
                    Resend OTP
                  </button>
                </p>
              </>
            )}

            {/* Login Link removed — unified auth does NOT need it */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
