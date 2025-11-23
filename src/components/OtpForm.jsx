const OtpForm = ({ onSubmit, loading, error, onBack }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="text-center">
        <p className="text-sm text-base-content/70">Enter the 6-digit code we sent to your email</p>
      </div>

      <div className="flex justify-center gap-2">
        {[...Array(6)].map((_, i) => (
          <input
            key={i}
            type="text"
            maxLength="1"
            className="input input-bordered w-12 h-12 text-center text-xl font-bold"
            required
          />
        ))}
      </div>

      {error && <div className="alert alert-error text-sm">{error}</div>}

      <button
        type="submit"
        disabled={loading}
        className="btn btn-primary w-full"
      >
        {loading ? <span className="loading loading-spinner" /> : "Verify & Continue"}
      </button>

      <button
        type="button"
        onClick={onBack}
        className="btn btn-ghost w-full text-sm"
      >
        ← Change Email
      </button>
    </form>
  );
};

export default OtpForm;