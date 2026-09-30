import "dotenv/config";
import express from "express";
import dotenv from "dotenv";
import dataBase from "./dataBase/mogo.js";
import routes from "./Routers/index.js";
import cookieParser from "cookie-parser";
import passport from "passport";
import "./config/googleStrategy.js";
import "./config/githubStrategy.js";
import cors from "cors";
dotenv.config();
const app = express();
app.use(passport.initialize());
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
   
app.use("/api", routes);

dataBase()
  .then(() => {
    app.listen(3000, () => {
      console.log(
        "\x1b[34mServer \x1b[90mStarted \x1b[35mPort \x1b[37m: \x1b[31m 3000\x1b[0m",
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });
