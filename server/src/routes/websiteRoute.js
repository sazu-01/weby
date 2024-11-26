
//packages
import express from "express";

//controllers
import { postWebsite, getSingleWebsite, updateWebsite, deleteWebsite, getWebsites } 
from "../controllers/websiteController.js";

//middlewares
import { isAdmin, isLoggedIn } from "../middlewares/authMiddleware.js";


const formRouter = express.Router();

formRouter.post("/post", isLoggedIn, isAdmin, postWebsite);

formRouter.get("/get",getSingleWebsite);

formRouter.get("/all-website", getWebsites);

formRouter.put("/update/:id", isLoggedIn, updateWebsite);

formRouter.delete("/delete/:id", isLoggedIn, deleteWebsite);

export default formRouter;