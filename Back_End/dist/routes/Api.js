import { GoogleOauth } from "../middleware/Oauth_2/GoogleOauth.js";
import { Router } from "express";
import { AuthService } from "../services/Auth_Service.js";
const API_Router = Router();
API_Router.post('/auth/google', GoogleOauth, AuthService);
export default API_Router;
