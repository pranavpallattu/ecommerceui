const GoogleButton = ({ text = "Continue with Google" }) => {
  return (
    <button className="btn btn-outline w-full flex items-center justify-center gap-3 hover:bg-base-200">
      <img
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        alt="Google"
        className="w-5 h-5"
      />
      <span>{text}</span>
    </button>
  );
};

export default GoogleButton;