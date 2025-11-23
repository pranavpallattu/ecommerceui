import React, { useState } from "react";

const LoginPage = () => {
  const [otpSent, setOtpSent] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">

      <div className="w-full max-w-6xl bg-white shadow-xl rounded-3xl overflow-hidden grid md:grid-cols-2">

        {/* Left Side — Branding */}
        <div className="bg-gray-900 text-white p-14 flex flex-col justify-center">
          <h1 className="text-4xl font-bold leading-tight mb-4">
            Welcome Back
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed max-w-md">
            Log in using your email to access your personalized shopping experience.
          </p>
        </div>

        {/* Right Side — Login Form */}
        <div className="p-14 flex items-center justify-center bg-white">
          <div className="w-full max-w-md">

            {/* Title */}
            <h2 className="text-3xl font-semibold text-gray-900 mb-2">
              Log In
            </h2>
            <p className="text-gray-500 mb-8">
              Enter your email to continue
            </p>

            {/* Step: Enter Email */}
            {!otpSent && (
              <>
                <div className="mb-6">
                  <label className="block mb-2 text-gray-700 font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full h-12 px-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-neutral focus:outline-none"
                  />
                </div>

                <button
                  className="btn btn-neutral w-full h-12 rounded-xl text-base shadow-sm"
                  onClick={() => setOtpSent(true)}
                >
                  Send OTP
                </button>
              </>
            )}

            {/* Step: Enter OTP */}
            {otpSent && (
              <>
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

                <button className="btn btn-neutral w-full h-12 rounded-xl text-base shadow-sm">
                  Verify & Log In
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

            {/* Signup Link */}
            <p className="text-center text-sm text-gray-500 mt-6">
              Don’t have an account?{" "}
              <a href="/signup" className="text-neutral font-medium hover:underline">
                Create an account
              </a>
            </p>

          </div>
        </div>
      </div>

    </div>
  );
};

export default LoginPage;
