import { Request, Response, NextFunction } from "express";
import { authService } from "../services/Security/Auth_Registration_Service.js";
import { HttpError } from "../utils/http_Error.js";
import { z } from "zod";

const emailField = z.string().trim().toLowerCase().email("Invalid email address");

const registerSchema = z.object({
  email: emailField,
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  phoneNumber: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format"),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
  name: z.string().min(1, "Name is required").max(255, "Name is too long"),
  picture: z.string().url("Invalid picture URL").optional(),
});

const loginSchema = z.object({
  email: emailField,
  password: z.string().min(1, "Password is required"),
});

const verifyEmailSchema = z.object({
  userId: z.string().uuid("Invalid user ID"),
  otp: z.string().length(6, "OTP must be 6 digits").regex(/^\d{6}$/, "OTP must be numeric"),
});

const resendOtpSchema = z.object({
  userId: z.string().uuid("Invalid user ID"),
});

const saveSession = (req: Request) =>
  new Promise<void>((resolve, reject) => req.session.save((err) => (err ? reject(err) : resolve())));

export class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedData = registerSchema.parse(req.body);
      const result = await authService.register(validatedData);
      res.status(201).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedData = loginSchema.parse(req.body);
      const result = await authService.login(validatedData);

      req.session.userId = result.user.id;
      await saveSession(req);

      res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async verifyEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedData = verifyEmailSchema.parse(req.body);
      const result = await authService.verifyEmail(validatedData);

      req.session.userId = result.user.id;
      await saveSession(req);

      res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async resendVerificationOtp(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedData = resendOtpSchema.parse(req.body);
      const result = await authService.resendVerificationOtp(validatedData.userId);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async me(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.session.userId) {
        throw new HttpError(401, "Not authenticated");
      }
      const result = await authService.getUserProfile(req.session.userId);
      res.status(200).json({ success: true, data: { user: result } });
    } catch (error) {
      next(error);
    }
  }

  async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.session.userId) {
        throw new HttpError(401, "Not authenticated");
      }
      if (req.session.userId !== req.params.userId) {
        throw new HttpError(403, "Forbidden");
      }
      const result = await authService.getUserProfile(req.params.userId);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    req.session.destroy((err) => {
      if (err) return next(err);
      res.clearCookie("sid", { path: "/" });
      res.status(200).json({ success: true, message: "Logged out successfully" });
    });
  }
}

export const authController = new AuthController();
