// src/services/auth.service.ts
import { userDao } from "../../DAO/Auth/auth_dao.js";
import { hashPassword, verifyPassword } from "../../security/password.crypto.js";
import { generate6DigitOtp, hashOtp } from "../../security/opt.crypto.js";

export interface RegisterDto {
  email: string;
  password: string;
  phoneNumber: string;
  dateOfBirth: string;
  name: string;
  picture?: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface VerifyEmailDto {
  userId: string;
  otp: string;
}

export class AuthService {
  async register(data: RegisterDto) {
    // Check if user already exists
    const existingUser = await userDao.findByEmailOrPhone(
      data.email,
      data.phoneNumber
    );

    if (existingUser) {
      if (existingUser.email === data.email) {
        throw new Error("Email already registered");
      }
      if (existingUser.phoneNumber === data.phoneNumber) {
        throw new Error("Phone number already registered");
      }
    }

    // Validate date of birth
    const dob = new Date(data.dateOfBirth);
    if (isNaN(dob.getTime())) {
      throw new Error("Invalid date of birth");
    }

    // Check if user is at least 13 years old
    const age = this.calculateAge(dob);
    if (age < 13) {
      throw new Error("You must be at least 13 years old to register");
    }

    // Hash password
    const passwordHash = await hashPassword(data.password, 1);

    // Create user
    const user = await userDao.create({
      email: data.email,
      passwordHash,
      passwordPepperVersion: 1,
      phoneNumber: data.phoneNumber,
      dateOfBirth: data.dateOfBirth, // Keep as string 'YYYY-MM-DD'
      name: data.name,
      picture: data.picture,
    });

    // Generate OTP for email verification
    const otp = generate6DigitOtp();
    const otpHash = hashOtp(user.id, "email_verification", otp);

    // TODO: Store OTP hash in Redis or separate OTP table with expiration (5-10 mins)
    // TODO: Send OTP via email service

    console.log(`[DEV] Email verification OTP for ${user.email}: ${otp}`);

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        phoneNumber: user.phoneNumber,
        dateOfBirth: user.dateOfBirth,
        emailVerified: false,
        createdAt: user.createdAt,
      },
      message: "Registration successful. Please check your email for verification code.",
    };
  }

  async login(data: LoginDto) {
    // Find user
    const user = await userDao.findByEmail(data.email);

    if (!user) {
      throw new Error("Invalid credentials");
    }

    // Check if blocked
    if (user.isBlocked) {
      throw new Error("Your account has been blocked. Please contact support.");
    }

    // Verify password
    const isValid = await verifyPassword(
      user.passwordHash,
      data.password,
      user.passwordPepperVersion
    );

    if (!isValid) {
      throw new Error("Invalid credentials");
    }

    // TODO: Generate JWT token or create session

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        phoneNumber: user.phoneNumber,
        emailVerified: !!user.emailVerifiedAt,
        picture: user.picture,
      },
      message: "Login successful",
      // token: "jwt_token_here"
    };
  }

  async verifyEmail(data: VerifyEmailDto) {
    const user = await userDao.findById(data.userId);

    if (!user) {
      throw new Error("User not found");
    }

    if (user.emailVerifiedAt) {
      throw new Error("Email already verified");
    }

    // TODO: Retrieve stored OTP hash from Redis/database
    // TODO: Check if OTP has expired
    // TODO: Verify OTP hash matches
    // const storedOtpHash = await getStoredOtpHash(data.userId, "email_verification");
    // const computedHash = hashOtp(data.userId, "email_verification", data.otp);
    // if (storedOtpHash !== computedHash) {
    //   throw new Error("Invalid or expired OTP");
    // }

    // Verify email
    const updatedUser = await userDao.verifyEmail(data.userId);

    if (!updatedUser) {
      throw new Error("Failed to verify email");
    }

    return {
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        emailVerifiedAt: updatedUser.emailVerifiedAt,
      },
      message: "Email verified successfully",
    };
  }

  async resendVerificationOtp(userId: string) {
    const user = await userDao.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    if (user.emailVerifiedAt) {
      throw new Error("Email already verified");
    }

    // Generate new OTP
    const otp = generate6DigitOtp();
    const otpHash = hashOtp(user.id, "email_verification", otp);

    // TODO: Store new OTP hash with expiration
    // TODO: Send OTP via email

    console.log(`[DEV] New verification OTP for ${user.email}: ${otp}`);

    return {
      message: "Verification code sent successfully",
    };
  }

  async getUserProfile(userId: string) {
    const user = await userDao.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      phoneNumber: user.phoneNumber,
      dateOfBirth: user.dateOfBirth,
      emailVerified: !!user.emailVerifiedAt,
      picture: user.picture,
      isBlocked: user.isBlocked,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  private calculateAge(birthDate: Date): number {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  }
}

export const authService = new AuthService();