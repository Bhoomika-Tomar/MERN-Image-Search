import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2";
import User from "../models/User.js";

// -------------------- GOOGLE STRATEGY --------------------
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.SERVER_URL}/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user already exists
        let user = await User.findOne({ providerId: profile.id });
        if (user) return done(null, user);

        // Create new user
        user = await User.create({
          provider: "google",
          providerId: profile.id,
          name: profile.displayName || "Unknown User",
          email: profile.emails?.[0]?.value || "No email provided",
          avatar: profile.photos?.[0]?.value || "",
        });

        done(null, user);
      } catch (err) {
        console.error("Google strategy error:", err);
        done(err, null);
      }
    }
  )
);

// -------------------- GITHUB STRATEGY --------------------
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: `${process.env.SERVER_URL}/auth/github/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ providerId: profile.id });
        if (user) return done(null, user);

        user = await User.create({
          provider: "github",
          providerId: profile.id,
          name: profile.displayName || profile.username || "GitHub User",
          email: profile.emails?.[0]?.value || "No email provided",
          avatar: profile.photos?.[0]?.value || "",
        });

        done(null, user);
      } catch (err) {
        console.error("GitHub strategy error:", err);
        done(err, null);
      }
    }
  )
);

// -------------------- SESSION HANDLING --------------------
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

export default passport;
