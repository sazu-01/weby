import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import Users from "../models/userModel.js";

import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "../SecretEnv.js";


// Google OAuth strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:4000/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Find or create user
        const user = await Users.findOne({ Email: profile.emails[0].value });
        if (!user) {
          // Create a new user if not found
          const newUser = new Users({
            FullName: profile.displayName,
            Email: profile.emails[0].value,
            PhoneNumber : "",
            Image: profile.photos[0].value,
            LoginMethod : "google",
          });
          await newUser.save();
          return done(null, newUser);
        }
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// Serialize user into session
passport.serializeUser((user, done) => {
  done(null, user._id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await Users.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;
