import { userDao } from "../../DAO/Auth/auth_dao.js";
import { hashPassword, verifyPassword } from "../../security/password.crypto.js";
import { Verification_Service } from "../Emails/Email_Verification_Service.js";
import { HttpError } from "../../utils/http_Error.js";

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

type DbUser = NonNullable<Awaited<ReturnType<typeof userDao.findById>>>;

const publicUser = (user: DbUser) => ({
  id: user.id,
  email: user.email,
  name: user.name,
  phoneNumber: user.phoneNumber,
  dateOfBirth: user.dateOfBirth,
  emailVerified: !!user.emailVerifiedAt,
  picture: user.picture,
});

export class AuthService {
  async register(data: RegisterDto) {
    const existingUser = await userDao.findByEmailOrPhone(data.email, data.phoneNumber);

    if (existingUser) {
      if (existingUser.email === data.email) {
        throw new HttpError(409, "Email already registered");
      }
      throw new HttpError(409, "Phone number already registered");
    }

    const dob = new Date(data.dateOfBirth);
    if (isNaN(dob.getTime())) {
      throw new HttpError(400, "Invalid date of birth");
    }

    const passwordHash = await hashPassword(data.password, 1);

    const user = await userDao.create({
      email: data.email,
      passwordHash,
      passwordPepperVersion: 1,
      phoneNumber: data.phoneNumber,
      dateOfBirth: data.dateOfBirth,
      name: data.name,
      picture: data.picture,
    });

    const { devOtp } = await Verification_Service.Send_Verification_Code(user);

    return {
      user: publicUser(user),
      devOtp,
      message: "Registration successful. Please check your email for the verification code.",
    };
  }

  async login(data: LoginDto) {
    const user = await userDao.findByEmail(data.email);
    if (!user) {
      throw new HttpError(401, "Invalid email or password");
    }
    if (user.isBlocked) {
      throw new HttpError(403, "Your account has been blocked. Please contact support.");
    }

    const isValid = await verifyPassword(user.passwordHash, data.password, user.passwordPepperVersion);
    if (!isValid) {
      throw new HttpError(401, "Invalid email or password");
    }

    if (!user.emailVerifiedAt) {
      const { devOtp } = await Verification_Service.Send_Verification_Code(user);
      throw new HttpError(403, "Please verify your email first. A new code was sent.", "EMAIL_NOT_VERIFIED", {
        userId: user.id,
        devOtp,
      });
    }

    return { user: publicUser(user), message: "Login successful" };
  }

  async verifyEmail(data: VerifyEmailDto) {
    const user = await userDao.findById(data.userId);
    if (!user) {
      throw new HttpError(404, "User not found");
    }
    if (user.emailVerifiedAt) {
      throw new HttpError(409, "Email already verified");
    }

    const ok = await Verification_Service.Verify_Code(user, data.otp);
    if (!ok) {
      throw new HttpError(400, "Invalid or expired verification code");
    }

    const updatedUser = await userDao.verifyEmail(data.userId);
    if (!updatedUser) {
      throw new HttpError(500, "Failed to verify email");
    }

    return { user: publicUser(updatedUser), message: "Email verified successfully" };
  }

  async resendVerificationOtp(userId: string) {
    const user = await userDao.findById(userId);
    if (!user) {
      throw new HttpError(404, "User not found");
    }
    if (user.emailVerifiedAt) {
      throw new HttpError(409, "Email already verified");
    }

    const { devOtp } = await Verification_Service.Send_Verification_Code(user);
    return { message: "Verification code sent successfully", devOtp };
  }

  async getUserProfile(userId: string) {
    const user = await userDao.findById(userId);
    if (!user) {
      throw new HttpError(404, "User not found");
    }
    return {
      ...publicUser(user),
      isBlocked: user.isBlocked,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}

export const authService = new AuthService();
