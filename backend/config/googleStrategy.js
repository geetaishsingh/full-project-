import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import Admin from "../model/adminModel.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },

    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;

        if (!email) {
          return done(null, false, {
            message: "Google email not found",
          });
        }

        // 1. First check Google ID
        let admin = await Admin.findOne({
          googleId: profile.id,
        });

        // Google account already linked
        if (admin) {
          return done(null, admin);
        }

        // 2. Check email
        admin = await Admin.findOne({
          email: email.toLowerCase(),
        });

        // 3. Email already exists
        if (admin) {
          admin.googleId = profile.id;

          if (!admin.authProvider.includes("google")) {
            admin.authProvider.push("google");
          }

          await admin.save();

          return done(null, admin);
        }

        // 4. Completely new Google user
        admin = await Admin.create({
          name: profile.displayName,
          email: email.toLowerCase(),
          googleId: profile.id,
          authProvider: "google",
        });

        return done(null, admin);
      } catch (error) {
        console.log("Google Strategy Error:", error);

        return done(error, null);
      }
    },
  ),
);

export default passport;
