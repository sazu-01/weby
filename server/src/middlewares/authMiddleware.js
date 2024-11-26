//packages
import httpError from "http-errors";
import jwt from "jsonwebtoken";

//env
import { jwtAccessKey } from "../SecretEnv.js";

export const isLoggedIn = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) throw httpError("no accessToken found, please login");

    const verifyToken = jwt.verify(accessToken, jwtAccessKey);

    if (!verifyToken) throw httpError("invalid access token, please login");

    req.user = verifyToken.user;

    next();
  } catch (error) {
    console.log(error);
  }
};

export const isLoggedOut = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;

    if (accessToken) {
      try {
        const decoded = jwt.verify(accessToken, jwtAccessKey);

        if (decoded) throw httpError(403, "user is already login");
      } catch (error) {
        throw error;
      }
    }

    next();
  } catch (error) {
    next(error);
  }
};


export const isAdmin = (req, res, next) => {
  try {
    const user = req.user;
    if (!user.IsAdmin) {
      throw httpError(
        401,
        "invalid accees , you have to be a admin for accessing this route"
      );
    }
    next();
  } catch (error) {
    next(error);
  }
};
