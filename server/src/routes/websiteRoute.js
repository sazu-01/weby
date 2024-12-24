
//packages
import express from "express";

//controllers
import { postWebsite, getSingleWebsite, updateWebsite, deleteWebsite, getWebsites } 
from "../controllers/websiteController.js";

//middlewares
import { isLoggedIn } from "../middlewares/authMiddleware.js";


const formRouter = express.Router();

formRouter.post("/post", isLoggedIn, postWebsite);

formRouter.get("/get/:id", isLoggedIn, getSingleWebsite);

formRouter.get("/all-website", getWebsites);

formRouter.put("/update/:id", isLoggedIn, updateWebsite);

formRouter.delete("/delete/:id", isLoggedIn, deleteWebsite);

export default formRouter;