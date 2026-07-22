import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { requestAuthOtpApi, verifyAuthOtpApi } from "../../services/allApis";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../utils/stores/auth/useAuthStore";
import AuthBranding from "../components/AuthBranding";
import GoogleButton from "../components/GoogleButton";
import RequestOtpForm from "../components/RequestOtpForm";
import VerifyOtpForm from "../components/VerifyOtpForm";

const AuthPage = () => {
  const [otpSent, setOtpSent] = useState(false);
  const [emailId, setEmailId] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { setUser } = useAuthStore();

  // const { user } = useAuthStore();

  // useEffect(() => {
  //   if (user) {
  //     window.location.replace(user.role === "admin" ? "/admin/dashboard" : "/");
  //   }
  // }, [user]);

  const handleGoogleSignup = () => {
    try {
      window.location.assign(
        "https://ecommerce-8tjk.onrender.com/api/auth/google",
      );
    } catch (error) {
      console.error("Google Auth Error:", error);
      toast.error("Unable to start Google login. Please try again.");
    }
  };

  const handleRequestAuthOtp = async () => {
    try {
      if (!emailId.trim()) {
        return toast.error("Please enter your email", {
          position: "bottom-right",
          autoClose: 1000,
          transition: Bounce,
        });
      }

      setLoading(true);

      const result = await requestAuthOtpApi({ emailId });

      console.log("OTP result:", result);

      if (result?.success && result?.data?.success) {
        toast.success(`OTP sent to ${emailId}`, {
          position: "bottom-right",
          autoClose: 1200,
          transition: Bounce,
        });

        setOtpSent(true); // guaranteed now
      } else {
        toast.error(
          result?.data?.message || result?.message || "Failed to send OTP",
        );
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyAuthOtp = async () => {
    try {
      const result = await verifyAuthOtpApi({ emailId, otp });

      if (!(result?.success && result?.data?.success)) {
        return toast.error(
          result?.data?.message || result?.message || "Verification failed",
        );
      }

      const user = result.data.data;

      setUser({
        ...user,
        role: user.isAdmin ? "admin" : "user",
      });

      toast.success("Login successful");

      setTimeout(() => {
        navigate(user.isAdmin ? "/admin/dashboard" : "/", { replace: true });
      }, 200);
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl bg-white shadow-xl rounded-3xl overflow-hidden grid md:grid-cols-2">
        {/* Left Side */}
        <AuthBranding />

        {/* Right Side Form */}
        <div className="p-14 flex items-center justify-center bg-white">
          <div className="w-full max-w-md">
            {!otpSent ? (
              <RequestOtpForm
                emailId={emailId}
                setEmailId={setEmailId}
                loading={loading}
                onGoogleSignup={handleGoogleSignup}
                onRequestOtp={handleRequestAuthOtp}
              />
            ) : (
              <VerifyOtpForm
                emailId={emailId}
                otp={otp}
                setOtp={setOtp}
                onBack={() => setOtpSent(false)}
                onVerify={handleVerifyAuthOtp}
                onResendOtp={handleRequestAuthOtp}
              />
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AuthPage;
