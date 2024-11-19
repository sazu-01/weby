
//packages
import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";

//files
import userRoute from "./src/routes/userRoute.js";


const app = express();

//middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//
app.use("/api/user",userRoute);

//home route
app.get("/", function (req, res) {
  res.status(200).send("welcome to the server");
});


export default app