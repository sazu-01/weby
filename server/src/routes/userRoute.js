
import express from "express";

import { DeleteUser, GetAllUser, GetSingleUser, UpdateUser, CreateUser } 
from "../controllers/userController.js";

import { validateUserRegistration } from "../validation/userValidation.js";
import RunValidation from "../validation/index.js";
const userRoute = express.Router();

userRoute.post("/create-user", validateUserRegistration , RunValidation, CreateUser);

userRoute.get("/all-user", GetAllUser);

userRoute.get("/single-user/:id", GetSingleUser);

userRoute.put("/update-user/:id", UpdateUser);

userRoute.delete("/delete-user/:id", DeleteUser);





export default userRoute;
