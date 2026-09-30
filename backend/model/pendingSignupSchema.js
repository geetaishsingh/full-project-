import mongoose from "mongoose";

const pendingSignupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },

  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    unique: true,
    sparse: true,
    trim: true,
  },

  otp: {
    type: String,
    required: true,
  },

  otpExpires: {
    type: Date,
    required: true,
    index: { expires: 0 },
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  otpAttempts: {
    type: Number,
    default: 0,
    index: { expires: 0 },
  },
});

const PendingSignup = mongoose.model("PendingSignup", pendingSignupSchema);

export default PendingSignup;
