
import express from "express";

import {DeleteUser, GetAllUser, GetSingleUser, UpdateUser, CreateUser} 
from "../controllers/userController.js";

const userRoute = express.Router();

userRoute.post("/create-user",CreateUser);

userRoute.get("/all-user", GetAllUser);

userRoute.get("/single-user/:id", GetSingleUser);

userRoute.put("/update-user/:id", UpdateUser);

userRoute.delete("/delete-user/:id", DeleteUser);





export default userRoute;
