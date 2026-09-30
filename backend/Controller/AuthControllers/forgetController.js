import bcrypt from "bcrypt";
import crypto from "crypto";
import nodemailer from "nodemailer";
import Admin from "../../model/adminModel.js";
import resetPasswordTemplate from "../../OtpTemplate/resetPasswordTemplate.js";

const forgot = async (req, res) => {
  try {
    const { email } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Invalid email format",
      });
    }

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({
        message: "Email not found",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);

    console.log(`
########################
#                      #
#     otp: ${otp}      #
#                      #
########################
`);

    const hashedOtp = await bcrypt.hash(String(otp), 10);

    admin.otp = hashedOtp;
    admin.otpExpires = new Date(Date.now() + 5 * 60 * 1000);
    admin.otpAttempts = 0;
    await admin.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Ideal Creation" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Password Reset OTP",
      html: resetPasswordTemplate(otp),
      text: `Your password reset OTP is ${otp}. This OTP will expire in 5 minutes.`,
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

const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({
        message: "Email not found",
      });
    }
    if (!admin.otpExpires || admin.otpExpires < new Date()) {
      return res.status(400).json({
        message: "OTP expired",
      });
    }

    if (admin.otpAttempts >= 5) {
      return res.status(429).json({
        message: "Too many OTP attempts. Please request a new OTP.",
      });
    }

    const isOtpValid = await bcrypt.compare(String(otp), admin.otp);

    if (!isOtpValid) {
      admin.otpAttempts += 1;

      if (admin.otpAttempts >= 5) {
        admin.otp = undefined;
        admin.otpExpires = undefined;
      }

      await admin.save();

      if (admin.otpAttempts >= 5) {
        return res.status(429).json({
          message: "Too many OTP attempts. Please request a new OTP.",
        });
      }

      return res.status(400).json({
        message: `Invalid OTP. ${5 - admin.otpAttempts} attempts remaining.`,
      });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    admin.resetToken = resetToken;
    admin.resetTokenExpires = new Date(Date.now() + 10 * 60 * 1000);

    admin.otp = undefined;
    admin.otpExpires = undefined;

    await admin.save();

    res.status(200).json({
      message: "OTP verified",
      resetToken,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { resetToken, password } = req.body;
    if (!password || password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    const admin = await Admin.findOne({
      resetToken,
      resetTokenExpires: { $gt: new Date() },
    });

    if (!admin) {
      return res.status(400).json({
        message: "Invalid or expired reset token",
      });
    }

    admin.password = await bcrypt.hash(password, 10);

    admin.resetToken = undefined;
    admin.resetTokenExpires = undefined;

    await admin.save();

    res.status(200).json({
      message: "Password changed successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export { forgot, verifyOtp, resetPassword };
