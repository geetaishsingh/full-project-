import { useState } from "react";
import { Formik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";

function SignUp() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const submit = async (values) => {
    const data = {
      name: values.name,
      email: values.email,
      password: values.password,
      phone: values.phone,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/signup",
        data,
        {
          withCredentials: true,
        },
      );

      toast.success(response.data.message || "OTP sent successfully");
      navigate("/verify-signup-otp");  
    } catch (error) {
      console.log("Status:", error.response?.status);
      console.log("Message:", error.response?.data);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <p className="eyebrow">Start your journey</p>
        <h1>Create your account</h1>

        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            phone: "",
          }}
          validate={(values) => {
            const errors = {};

            // Name
            if (!values.name) {
              errors.name = "Name is required";
            }

            // Email
            if (!values.email) {
              errors.email = "Email is required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }

            // Password
            if (!values.password) {
              errors.password = "Password is required";
            } else if (values.password.length < 6) {
              errors.password = "Password must be at least 6 characters";
            }

            // Phone
            if (!values.phone) {
              errors.phone = "Phone is required";
            } else if (!/^[0-9]{10}$/.test(values.phone)) {
              errors.phone = "Phone must be 10 digits";
            }

            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            await submit(values);
            setSubmitting(false);
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
            <form className="auth-form signup-form" onSubmit={handleSubmit}>
              {/* Name */}
              <input
                type="text"
                name="name"
                className={errors.name && touched.name ? "input-error" : ""}
                placeholder="Enter name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
              {errors.name && touched.name && (
                <div className="form-error">{errors.name}</div>
              )}

              {/* Email */}
              <input
                type="email"
                name="email"
                className={errors.email && touched.email ? "input-error" : ""}
                placeholder="Enter email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {errors.email && touched.email && (
                <div className="form-error">{errors.email}</div>
              )}

              {/* Password */}
              <div className="password-field">
                <input
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

              {/* Phone */}
              <input
                type="tel"
                name="phone"
                className={errors.phone && touched.phone ? "input-error" : ""}
                placeholder="Enter phone number"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phone}
              />
              {errors.phone && touched.phone && (
                <div className="form-error">{errors.phone}</div>
              )}
              <button
                className="auth-submit"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="loader" /> Creating account...
                  </>
                ) : (
                  "Create account"
                )}
              </button>
              <p className="form-footer">
                Already have an account? <a href="/login">Sign in</a>
              </p>
            </form>
          )}
        </Formik>
      </div>
    </section>
  );
}

export default SignUp;
