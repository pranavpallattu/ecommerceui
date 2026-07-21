import GoogleButton from "./GoogleButton";

const RequestOtpForm = ({
  emailId,
  setEmailId,
  loading,
  onGoogleSignup,
  onRequestOtp,
}) => {
  return (
    <>
      <h2 className="text-3xl font-semibold text-gray-900 mb-2">
        Sign In or Create Account
      </h2>

      <p className="text-gray-500 mb-8">
        Fast, secure & password-free authentication
      </p>

      <GoogleButton onClick={onGoogleSignup} />

      <div className="relative my-8 text-center">
        <div className="h-px bg-gray-200 w-full"></div>

        <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 bg-white text-gray-400 text-sm">
          or use your email
        </span>
      </div>
      <div className="mb-6">
        <label className="block mb-2 text-gray-700 font-medium">
          Email Address
        </label>

        <input
          type="email"
          placeholder="you@example.com"
          value={emailId}
          onChange={(e) => setEmailId(e.target.value)}
          className="w-full h-12 px-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-neutral focus:outline-none"
        />
      </div>

      <button
        onClick={onRequestOtp}
        disabled={loading}
        className="btn shadow-md w-full h-12"
      >
        {loading ? (
          <span className="loading loading-spinner loading-sm"></span>
        ) : (
          "Send OTP"
        )}
      </button>
    </>
  );
};

export default RequestOtpForm;
