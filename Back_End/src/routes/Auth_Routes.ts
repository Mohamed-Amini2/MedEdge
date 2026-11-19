import { Router } from "express";
import rateLimit from "express-rate-limit";
import { authController } from "../controllers/auth.controller.js";

export const Auth_Router = Router();

const codeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: "Too many attempts. Please try again later." },
});

Auth_Router.post("/register", authController.register.bind(authController));
Auth_Router.post("/login", authController.login.bind(authController));
Auth_Router.post("/verify-email", codeLimiter, authController.verifyEmail.bind(authController));
Auth_Router.post("/resend-otp", codeLimiter, authController.resendVerificationOtp.bind(authController));
Auth_Router.get("/me", authController.me.bind(authController));
Auth_Router.get("/profile/:userId", authController.getProfile.bind(authController));
Auth_Router.post("/logout", authController.logout.bind(authController));
