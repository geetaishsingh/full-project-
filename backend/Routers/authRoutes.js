import express from "express";
import passport from "passport";
import {
  signup,
  verifySignupOtp,
} from "../Controller/AuthControllers/signUpController.js";
import { login } from "../Controller/AuthControllers/logInController.js";
import { logOut } from "../Controller/AuthControllers/logOutController.js";
import {
  forgot,
  verifyOtp,
  resetPassword,
} from "../Controller/AuthControllers/forgetController.js";
import {
  authUser,
  home,
} from "../Controller/AuthControllers/homeController.js";
import { googleCallback } from "../Controller/AuthControllers/googleController.js";
import { githubCallback } from "../Controller/AuthControllers/githubController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/verifySignupOtp", verifySignupOtp);
router.post("/login", login);
router.post("/logout", logOut);
router.patch("/forgot", forgot);
router.patch("/verifyOtp", verifyOtp);
router.patch("/resetPassword", resetPassword);
router.get("/home", authUser, home);

// Google Login
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login",
  }),
  googleCallback,
);

// GitHub OAuth start
router.get(
  "/github",
  passport.authenticate("github", {
    scope: ["user:email"],
  }),
);

router.get(
  "/github/callback",
  passport.authenticate("github", {
    session: false,
    failureRedirect: "/login",
  }),
  githubCallback,
);

export default router;
