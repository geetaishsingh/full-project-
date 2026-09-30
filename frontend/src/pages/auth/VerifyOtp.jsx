import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");
    setIsSubmitting(true);

    try {
      const response = await axios.patch(
        "http://localhost:3000/api/auth/verifyOtp",
        {
          email,
          otp,
        },
      );

      setMessage(response.data.message);

      // Reset token ko next page par bhejna
      navigate("/reset-password", {
        state: {
          resetToken: response.data.resetToken,
        },
      });
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!email) {
    return <p>Email not found. Please restart the process.</p>;
  }

  return (
    <section className="auth-page">
      <div className="auth-card">
        <h1>Verify OTP</h1>

        <p>OTP sent to: {email}</p>

        <form className="auth-form" onSubmit={handleVerifyOtp}>
          <input
            type="text"
            placeholder="Enter 6 digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength={6}
            required
          />

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <span className="loader" /> Verifying...
              </>
            ) : (
              "Verify OTP"
            )}
          </button>
        </form>

        {message && <p>{message}</p>}
        {error && <p className="form-error">{error}</p>}
      </div>
    </section>
  );
}

export default VerifyOtp;
