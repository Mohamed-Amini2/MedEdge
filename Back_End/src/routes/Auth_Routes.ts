// src/routes/auth.routes.ts
import { Router } from "express";
import { authController } from "../controllers/auth.controller.js";

export const Auth_Router = Router();

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
Auth_Router.post("/register", authController.register.bind(authController));

/**
 * @route   POST /api/auth/login
 * @desc    Login user
 * @access  Public
 */
Auth_Router.post("/login", authController.login.bind(authController));

/**
 * @route   POST /api/auth/verify-email
 * @desc    Verify user email with OTP
 * @access  Public
 */
Auth_Router.post("/verify-email", authController.verifyEmail.bind(authController));

/**
 * @route   POST /api/auth/resend-otp
 * @desc    Resend verification OTP
 * @access  Public
 */
Auth_Router.post("/resend-otp", authController.resendVerificationOtp.bind(authController));

/**
 * @route   GET /api/auth/profile/:userId
 * @desc    Get user profile
 * @access  Private (TODO: Add authentication middleware)
 */
Auth_Router.get("/profile/:userId", authController.getProfile.bind(authController));

/**
 * @route   POST /api/auth/logout
 * @desc    Logout user
 * @access  Private (TODO: Add authentication middleware)
 */
Auth_Router.post("/logout", authController.logout.bind(authController));