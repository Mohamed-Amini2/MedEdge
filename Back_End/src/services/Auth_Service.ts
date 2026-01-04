import type { Db_User } from "../drizzle/schema.js";
import type { Provider_Profile_DTO } from "../schemas/Google_Schema.js";
import { Create_Email_User, Upsert_Google_user , find_User_By_Email } from "../DAO/User_DAO.js";
import { Verification_Service } from "./Email_Verification_Service.js";
import { Email_Service } from "./Email_Service.js";

export async function Login_With_Provider_Profile(profile: Provider_Profile_DTO): Promise<Db_User>{

    if (!profile.emailVerified){
        throw new Error('Email Not verified by provider')
    }
    return Upsert_Google_user({
        provider: profile.provider,
        providerId: profile.providerId,
        name: profile.name,
        picture: profile.picture,
        email: profile.email,
        emailVerified: profile.emailVerified
    });
}

export async function Request_Email_Verification(email: string): Promise<void>{
    const existing_user = await find_User_By_Email(email)

    if (existing_user && existing_user.emailVerified){
        throw new Error("Email already Verified")
    }

    await Verification_Service.Send_Verification_Code(email);
}

export async function Verify_Email_And_Create_User(
    email: string,
    code: string,
    name: string
  ): Promise<Db_User> {
    
    const isValid = await Verification_Service.Verify_Code(email, code);
    
    if (!isValid) {
      throw new Error("Invalid or expired verification code");
    }
    
    const user = await Create_Email_User({
      email,
      name,
      emailVerified: true,
      provider: "email"
    });
    
    await Email_Service.Send_Welcome_Email(email, name);
    
    return user;
  }
