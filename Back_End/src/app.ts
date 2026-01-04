import express from "express";
import cors from "cors";
import passport from "passport";

import { SessionMiddleware } from "./middleware/Sessions/Session_Middleware.js";
import { Api_Router } from "./routes/index.routes.js";
// import { HttpError } from "./utils/http_Error.js"; //* todo in the future i mean adding th HTTP eror thing 
import { Cors_Confige } from "./config/Cors_Config.js";

export function Create_App() {
  const app = express();

  app.use(cors(Cors_Confige));


  app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }));

  app.use(express.json());

  app.use(SessionMiddleware);

  //* passport after session
  app.use(passport.initialize());
  app.use(passport.session());

  app.use("/api", Api_Router);

  //* error handler last Well a todo thing 

  return app;
}
