import bcrypt from "bcrypt";
import Admin from "../../model/adminModel.js";
import PendingSignup from "../../model/pendingSignupSchema.js";
import signupOtpTemplate from "../../OtpTemplate/signupOtpTemplate.js";
import welcomeTemplate from "../../OtpTemplate/welcomeTemplate.js";
import nodemailer from "nodemailer";

const signup = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // Password validation
    if (!password || password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    // Check if email is already registered
    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      return res.status(409).json({
        message: "Email already exists",
      });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    console.log(`
########################
#                      #
#     otp: ${otp}      #
#                      #
########################
`);

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Hash OTP
    const hashedOtp = await bcrypt.hash(String(otp), 10);

    // Remove previous pending signup
    await PendingSignup.findOneAndDelete({ email });

    // Save temporary signup data
    await PendingSignup.create({
      name,
      email,
      phone,
      password: hashedPassword,
      otp: hashedOtp,
      authProvider: "email",
      otpExpires: new Date(Date.now() + 5 * 60 * 1000),
      otpAttempts: 0,
    });

    // Email transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send OTP Email
    await transporter.sendMail({
      from: `"Ideal Creation" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Verify Your Email - Signup OTP",
      html: signupOtpTemplate(otp),
      text: `Your OTP is ${otp}. This OTP will expire in 5 minutes.`,
    });

    res.cookie("signupEmail", email, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 5 * 60 * 1000,
    });

    res.status(200).json({
      message: "OTP sent successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

const verifySignupOtp = async (req, res) => {
  try {
    const { otp } = req.body;
    const email = req.cookies.signupEmail;

    if (!email) {
      return res.status(400).json({
        message: "Signup session expired. Please sign up again.",
      });
    }

    // Find temporary signup data
    const pendingSignup = await PendingSignup.findOne({ email });

    if (!pendingSignup) {
      return res.status(404).json({
        message: "Signup request not found",
      });
    }

    // Check OTP expiry
    if (!pendingSignup.otpExpires || pendingSignup.otpExpires < new Date()) {
      return res.status(400).json({
        message: "OTP expired",
      });
    }

    // Check OTP attempts
    if (pendingSignup.otpAttempts >= 5) {
      return res.status(429).json({
        message: "Too many OTP attempts. Please request a new OTP.",
      });
    }

    // Verify OTP
    const isOtpValid = await bcrypt.compare(String(otp), pendingSignup.otp);

    // Invalid OTP
    if (!isOtpValid) {
      pendingSignup.otpAttempts += 1;

      const remainingAttempts = 5 - pendingSignup.otpAttempts;

      // Maximum attempts reached
      if (pendingSignup.otpAttempts >= 5) {
        pendingSignup.otp = undefined;
        pendingSignup.otpExpires = undefined;

        await pendingSignup.save();

        return res.status(429).json({
          message: "Too many OTP attempts. Please request a new OTP.",
        });
      }

      await pendingSignup.save();

      return res.status(400).json({
        message: `Invalid OTP. ${remainingAttempts} attempts remaining.`,
      });
    }

    // Create actual Admin after OTP verification
    const admin = await Admin.create({
      name: pendingSignup.name,
      email: pendingSignup.email,
      password: pendingSignup.password,
      phone: pendingSignup.phone,
      phone: pendingSignup.phone,
      authProvider: ["email"],
    });

    // Email transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send Welcome Email
    await transporter.sendMail({
      from: `"Ideal Creation" <${process.env.EMAIL_USER}>`,
      to: admin.email,
      subject: "Welcome to Ideal Creation",
      html: welcomeTemplate(admin.name),
      text: `Welcome to Ideal Creation, ${admin.name}! Your account has been successfully created.`,
    });

    // Delete temporary signup data
    await PendingSignup.deleteOne({
      _id: pendingSignup._id,
    });

    res.clearCookie("signupEmail");

    res.status(201).json({
      message: "Account created successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

export { signup, verifySignupOtp };
