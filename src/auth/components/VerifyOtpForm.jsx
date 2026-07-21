import { ArrowLeft } from "lucide-react";

const VerifyOtpForm = ({
  emailId,
  otp,
  setOtp,
  onBack,
  onVerify,
  onResendOtp,
}) => {
  return (
    <>
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 mb-6 hover:text-gray-800"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      <h2 className="text-3xl font-semibold text-gray-900 mb-2">Verify OTP</h2>

      <p className="text-gray-500 mb-6">
        We sent a 6-digit OTP to <strong>{emailId}</strong>
      </p>

      <div className="mb-6">
        <label className="block mb-2 text-gray-700 font-medium">
          Enter OTP
        </label>

        <input
          type="text"
          maxLength={6}
          placeholder="123456"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full h-12 px-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-neutral focus:outline-none tracking-widest text-center"
        />
      </div>

      <button
        onClick={onVerify}
        className="btn btn-neutral w-full h-12 rounded-xl text-base shadow-sm"
      >
        Verify
      </button>

      <p className="text-center text-sm text-gray-500 mt-4">
        Didn't receive the OTP?{" "}
        <button
          onClick={onResendOtp}
          className="text-neutral font-medium hover:underline"
        >
          Resend OTP
        </button>
      </p>
    </>
  );
};

export default VerifyOtpForm;
