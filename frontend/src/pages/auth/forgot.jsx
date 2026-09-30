import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleForgot = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");
    setIsSubmitting(true);

    try {
      const response = await axios.patch(
        "http://localhost:3000/api/auth/forgot",
        {
          email,
        },
      );

      setMessage(response.data.message);

      // OTP page par email bhejna
      navigate("/verify-otp", {
        state: { email },
      });
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <h1>Forgot Password</h1>

        <form className="auth-form" onSubmit={handleForgot}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <span className="loader" /> Sending OTP...
              </>
            ) : (
              "Send OTP"
            )}
          </button>
        </form>

        {message && <p>{message}</p>}
        {error && <p className="form-error">{error}</p>}
      </div>
    </section>
  );
}

export default ForgotPassword;
