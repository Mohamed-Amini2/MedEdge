import { Router } from "express";
import { Auth_Router } from "./Auth_Routes.js";

export const Api_Router = Router();

Api_Router.use("/auth", Auth_Router);
