
//packages
import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import httpError from "http-errors";

//files
import userRoute from "./routes/userRoute.js";
import { ErrorResponse } from "./helpers/response.js";

const app = express();

const corsOptions = {
  origin : ["http://localhost:5173"],
  credentials  : true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
}

//middlewares
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//routes middlewares
app.use("/api/user",userRoute);

//home route
app.get("/", function (req, res) {
  res.status(200).send("welcome to the server");
});

//client side error
app.use(function (req, res, next) {
  next(httpError(404, "route not found"))
})

//server side error -> all error store on this
app.use(function (err, req, res, next) {
  return ErrorResponse(res,{
      statusCode: err.status,
      message: err.message
  })
});


export default app