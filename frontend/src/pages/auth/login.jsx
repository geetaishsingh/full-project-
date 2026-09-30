import axios from "axios";
import { useState } from "react";
import { Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

const ADMIN_EMAIL = "geetaishsinghrajput@gmail.com";

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { checkSession } = useAuth();

  const logIn = async (values, setSubmitting) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          identifier: values.identifier,
          password: values.password,
        },
        {
          withCredentials: true,
        },
      );

      toast.success(response.data.message || "Login successful");

      // Refresh global auth state so Navbar updates immediately
      await checkSession();

      // Redirect based on email
      const email = response.data.user?.email || values.identifier;
      if (email === ADMIN_EMAIL) {
        navigate("/admin/dashboard", { replace: true });
      } else {
        navigate("/user/home", { replace: true });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <p className="eyebrow">Welcome back</p>
        <h1>Sign in to your account</h1>

        <Formik
          initialValues={{
            identifier: "",
            password: "",
          }}
          validate={(values) => {
            const errors = {};
            if (!values.identifier) {
              errors.identifier = "Email or phone number is required";
            }
            if (!values.password) {
              errors.password = "Password is required";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            logIn(values, setSubmitting);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form className="auth-form" onSubmit={handleSubmit}>
              {/* Email */}
              <label htmlFor="login-identifier">Email or phone number</label>

              <input
                id="login-identifier"
                type="text"
                name="identifier"
                className={
                  errors.identifier && touched.identifier ? "input-error" : ""
                }
                placeholder="Enter email or phone number"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.identifier}
              />

              {errors.identifier && touched.identifier && (
                <div className="form-error">{errors.identifier}</div>
              )}

              {/* Password */}
              <label htmlFor="login-password">Password</label>
              <div className="password-field">
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className={
                    errors.password && touched.password ? "input-error" : ""
                  }
                  placeholder="Enter password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                {values.password && (
                  <button
                    className="password-toggle"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff aria-hidden="true" />
                    ) : (
                      <Eye aria-hidden="true" />
                    )}
                  </button>
                )}
              </div>

              {errors.password && touched.password && (
                <div className="form-error">{errors.password}</div>
              )}

              {/* Submit */}
              <button
                className="auth-submit"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="loader" /> Signing in...
                  </>
                ) : (
                  "Sign in"
                )}
              </button>
              <p className="form-link">
                <Link to="/forgot-password">Forgot password?</Link>
              </p>
              <p className="form-footer">
                New here? <Link to="/signup">Create an account</Link>
              </p>
            </form>
          )}
        </Formik>

        <div className="oauth-divider">
          <span>or continue with</span>
        </div>
        <div className="oauth-actions">
          <a
            className="oauth-button oauth-google"
            href="http://localhost:3000/api/auth/google"
          >
            <span aria-hidden="true">G</span> Continue with Google
          </a>
          <a
            className="oauth-button oauth-github"
            href="http://localhost:3000/api/auth/github"
          >
            <span aria-hidden="true">GH</span> Continue with GitHub
          </a>
        </div>
      </div>
    </section>
  );
}

export default Login;
