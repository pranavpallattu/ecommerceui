const GoogleButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="btn w-full h-12 bg-white border border-gray-300 hover:bg-gray-100 flex items-center justify-center gap-3 rounded-xl shadow-sm"
    >
      <img
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        className="w-5 h-5"
      />

      <span className="text-gray-700 font-medium">Continue with Google</span>
    </button>
  );
};

export default GoogleButton;
