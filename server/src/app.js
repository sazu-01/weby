
//packages
import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import httpError from "http-errors";
import cookieParser from "cookie-parser";

//files
import userRoute from "./routes/userRoute.js";
import authRouter from "./routes/authRoute.js";
import componentRouter from "./routes/compoentRoute.js";
import websiteRouter from "./routes/websiteRoute.js";
import { ErrorResponse } from "./helpers/response.js";
import passport  from "./config/passport.js";

const app = express();

const corsOptions = {
  origin : ["http://localhost:5173", "https://weby-client.vercel.app"],
  credentials  : true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type', 
    'Authorization',
    'Access-Control-Allow-Credentials',
    'X-Requested-With'
  ],
}

//middlewares
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());

//routes middlewares
app.use("/api/user",userRoute);
app.use("/api/auth",authRouter);
app.use("/api/website",websiteRouter);
app.use("/api/components",componentRouter);

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