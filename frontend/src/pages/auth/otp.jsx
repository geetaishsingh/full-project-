import { Formik, Form, Field } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function VerifySignupOtp() {
  const navigate = useNavigate();

  const verifyOtp = async (values, { setSubmitting, setStatus }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/verifySignupOtp",
        {
          email: values.email,
          otp: values.otp,
        },
        {
          withCredentials: true,
        },
      );

      console.log("Response:", response.data);
      setStatus({ message: response.data.message, type: "success" });
      navigate("/login");
    } catch (error) {
      console.log("Error:", error.response?.data);

      setStatus({
        message: error.response?.data?.message || "Something went wrong",
        type: "error",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <h1>Verify Signup OTP</h1>

        <Formik initialValues={{ otp: "" }} onSubmit={verifyOtp}>
          {({ isSubmitting, status }) => (
            <Form className="auth-form">
              <div>
                <label>OTP</label>
                <Field
                  type="text"
                  name="otp"
                  placeholder="Enter 6 digit OTP"
                  maxLength="6"
                />
              </div>

              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <span className="loader" /> Verifying...
                  </>
                ) : (
                  "Verify OTP"
                )}
              </button>
              {status?.message && (
                <p
                  className={
                    status.type === "error" ? "form-error" : "form-success"
                  }
                >
                  {status.message}
                </p>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
}

export default VerifySignupOtp;
