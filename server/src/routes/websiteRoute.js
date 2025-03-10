
//packages
import express from "express";

//controllers
import { 
    postWebsite, 
    getSingleWebsite, 
    updateComponentValue, 
    deleteWebsite, 
    getWebsites, 
    addPage,
    deletePage,
    addComponentToPage,
    removeComponentFromPage
} 
from "../controllers/websiteController.js";

//middlewares
import { isLoggedIn } from "../middlewares/authMiddleware.js";


const formRouter = express.Router();

formRouter.post("/post", isLoggedIn, postWebsite);

formRouter.post("/add-page", isLoggedIn, addPage);

formRouter.post('/add-component', isLoggedIn, addComponentToPage);

formRouter.post("/remove-component", isLoggedIn, removeComponentFromPage);

formRouter.get("/get", isLoggedIn, getSingleWebsite);

formRouter.get("/all-website", getWebsites);

formRouter.patch('/update-data', isLoggedIn, updateComponentValue);

formRouter.delete("/delete-page", isLoggedIn, deletePage);

formRouter.delete("/delete/:id", isLoggedIn, deleteWebsite);

export default formRouter;