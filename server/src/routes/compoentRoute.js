
import express from "express";
import {
  CreateComponents,
  DeleteComponent,
  GetComponents,
  UpdateComponents,
} from "../controllers/componentController.js";

const componentRouter = express.Router();

componentRouter.get("/all", GetComponents);

componentRouter.post("/create", CreateComponents);

componentRouter.put("/update/:id", UpdateComponents);

componentRouter.delete("/delete/:id", DeleteComponent);

export default componentRouter;
