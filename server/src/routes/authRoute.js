
import express from "express";
import passport from "passport";

//controller
import { LoginController, LogoutController, HandleRefreshToken, GetCurrentUser, HandleProtected }
from "../controllers/authController.js";

//helpers
import { CreateJsonWebToken } from "../helpers/jwt.js";
import { SetAccessTokenCookie, SetRefreshTokenCookie } from "../helpers/setCookie.js";

//keys
import { jwtAccessKey, jwtRefreshKey } from "../SecretEnv.js";

const authRouter = express.Router();

 authRouter.post("/login", LoginController);

 authRouter.post("/logout", LogoutController);

 
 // Initiate Google authentication
 authRouter.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );
  
  // Google callback
  authRouter.get(
    "/google/callback",
    passport.authenticate("google", {
      failureRedirect: "/api/auth/login", // Redirect if authentication fails
      session: false, // Disable sessions (use JWT tokens instead)
    }),
    (req, res) => {
      // Generate JWT tokens
      const user = req.user;
      const accessToken = CreateJsonWebToken({ user }, jwtAccessKey, "1m");
      const refreshToken = CreateJsonWebToken({ user }, jwtRefreshKey, "10d");
  
      // Set cookies
      SetAccessTokenCookie(res, accessToken);
      SetRefreshTokenCookie(res, refreshToken);
  
      // Redirect to client
      res.redirect("http://localhost:5173/set-auth?token=" + accessToken);
    }
  );
  

 authRouter.get("/refresh-token", HandleRefreshToken);

 authRouter.get("/get-user", GetCurrentUser);

 authRouter.get("/protected", HandleProtected);

export default authRouter;