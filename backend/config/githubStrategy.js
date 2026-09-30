import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import Admin from "../model/adminModel.js";

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },

    async (accessToken, refreshToken, profile, done) => {
      try {

        const email = profile.emails?.[0]?.value;


        if (!email) {
          return done(null, false, {
            message: "GitHub email not found",
          });
        }

        // 1. Check GitHub ID
        let admin = await Admin.findOne({
          githubId: profile.id,
        });

        // Already linked
        if (admin) {
          return done(null, admin);
        }

        // 2. Check existing email
        admin = await Admin.findOne({
          email: email.toLowerCase(),
        });

        // 3. Existing account → link GitHub
        if (admin) {
          admin.githubId = profile.id;

          if (!admin.authProvider.includes("github")) {
            admin.authProvider.push("github");
          }

          await admin.save();

          console.log("✅ GitHub linked with existing account");

          return done(null, admin);
        }

        // 4. New account
        admin = await Admin.create({
          name: profile.displayName || profile.username,
          email: email.toLowerCase(),
          githubId: profile.id,
          authProvider: ["github"],
        });

        console.log("✅ New GitHub account created");

        return done(null, admin);
      } catch (error) {
        console.log("❌ GitHub Strategy Error:", error);

        return done(error, null);
      }
    }
  )
);

export default passport;