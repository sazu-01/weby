

//packages
import express from "express";

const app = express();

//home route
app.get("/", function (req, res) {
  res.status(200).send("welcome to the server");
});


export default app