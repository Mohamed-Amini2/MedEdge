import { Request, Response } from 'express';
import { Request_Email_Verification, Verify_Email_And_Create_User } from '../services/Auth_Service.js';
import {passport_Login} from './auth.controller.js'
import { 
  Send_Verification_Request_Schema, 
  Verification_Code_Schema 
} from '../schemas/Email_Schema.js';
import { success } from 'zod';

export async function Send_Verification_Code(req: Request , res: Response):Promise<Response>{
    try{

        const parsed = Send_Verification_Request_Schema.safeParse(req.body)

        if(!parsed.success){
            return res.status(400).json({
                success: false,
                message: "Invalid request",
                errors: parsed.error.flatten()
              });
        }

        await Request_Email_Verification(parsed.data.email)

        return res.json({
            success: true,
            message: "Verification code sent to your email"
          });

    }catch(error){
        console.error('Send verification code error:', error);
        return res.status(500).json({
          success: false,
          message: error instanceof Error ? error.message : "Failed to send verification code"
        });
    }
}

export async function Verify_Code_And_Login(req: Request , res:Response): Promise<Response>{
  try {
      const parsed = Verification_Code_Schema.safeParse(req.body)

      if(!parsed.success){
          return res.status(400).json({
              success: false,
              message: "Invalid request",
              errors: parsed.error.flatten()
            });
      }
      const { email, code } = parsed.data;
      const name = req.body.name || "User";
      
      const user = await Verify_Email_And_Create_User(email, code, name);
      
      await passport_Login(req, user);
      
      return new Promise((resolve, reject) => {
        req.session.save((err) => {
          if (err) {
            return resolve(res.status(500).json({ success: false, message: "Session error" }));
          }
          
          return resolve(res.json({
            success: true,
            message: "Email verified successfully",
            user: {
              id: user.id,
              email: user.email,
              name: user.name
            }
          }));
        });
      });
  } catch(error) {
      console.error('Verify code error:', error);
      return res.status(401).json({
        success: false,
        message: error instanceof Error ? error.message : "Invalid or expired verification code"
      });
  }
}