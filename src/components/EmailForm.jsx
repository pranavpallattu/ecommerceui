const EmailForm = ({ email, setEmail, onSubmit, loading, error }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="form-control">
        <label className="label">
          <span className="label-text font-medium">Email Address</span>
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="input input-bordered w-full"
          required
        />
      </div>

      {error && <div className="alert alert-error text-sm">{error}</div>}

      <button
        type="submit"
        disabled={loading}
        className="btn btn-primary w-full"
      >
        {loading ? <span className="loading loading-spinner" /> : "Send OTP"}
      </button>
    </form>
  );
};

export default EmailForm;