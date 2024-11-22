
import express from "express";

//controller
import { LoginController, LogoutController, HandleRefreshToken, GetCurrentUser, HandleProtected }
from "../controllers/authController.js";

const authRouter = express.Router();

 authRouter.post("/login", LoginController);

 authRouter.post("/logout", LogoutController);

 authRouter.get("/refresh-token", HandleRefreshToken);

 authRouter.get("/get-user", GetCurrentUser);

 authRouter.get("/protected", HandleProtected);

export default authRouter;