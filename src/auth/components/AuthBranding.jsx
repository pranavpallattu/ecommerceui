const AuthBranding = () => {
  return (
    <div className="bg-gray-900 text-white p-14 flex flex-col justify-center items-start">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgiPftJFEcFuclHRqhqXpbM58OXt2F5zRmtA&s"
        className="w-20 h-20 mb-6 rounded-xl object-cover"
        alt="OneBazaar Logo"
      />

      <h1 className="text-4xl font-bold leading-tight mb-3">
        Welcome to OneBazaar
      </h1>

      <p className="text-gray-300 text-lg mb-6">One World. Infinite Finds.</p>

      <p className="text-gray-400 text-md max-w-md leading-relaxed">
        Your all-in-one destination. Log in or create an account instantly using
        Google or secure Email & OTP authentication.
      </p>
    </div>
  );
};

export default AuthBranding;
