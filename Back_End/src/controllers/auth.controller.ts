import { Request , Response } from "express";
import { generators } from "openid-client";
import { Db_User } from "../drizzle/schema.js";
import { Login_With_Provider_Profile } from "../services/Auth_Service.js";
import { getGoogleClient } from "../config/oidc_Client.js";
import { Google_Claims_DTO, Google_Claims_Schema, Google_Claims_To_Provider_Profile } from "../schemas/Google_Schema.js";


export function passport_Login(req: Request , user: Db_User):Promise<void> {
    return new Promise((resolve , reject) => {
        req.login(user , (err) => (err ? reject(err): resolve()));
    })
}

export async function Google_Start(req: Request, res: Response) {
    const client = await getGoogleClient();
  
    const codeVerifier = generators.codeVerifier();
    const codeChallenge = generators.codeChallenge(codeVerifier);
    const state = generators.state();
  
    req.session.pkceVerifier = codeVerifier;
    req.session.oauthState = state;
  
    const redirectUri = process.env.GOOGLE_REDIRECT_URI;
    if (!redirectUri) {
      return res.status(500).json({ success: false, message: "GOOGLE_REDIRECT_URI is missing" });
    }
  
    const url = client.authorizationUrl({
      scope: "openid email profile",
      redirect_uri: redirectUri,            
      code_challenge: codeChallenge,
      code_challenge_method: "S256",
      state,
    });

    req.session.save((err) => {
      if (err) {
        console.error("Session save failed in Google_Start:", err);
        return res.status(500).json({ success: false, message: "Failed to save session" });
      }
      return res.redirect(url);
    });
  }


  
export async function googleCallback(req: Request, res: Response) {
    const client = await getGoogleClient();
  
    const codeVerifier = req.session.pkceVerifier;
    const expectedState = req.session.oauthState;
  
    if (!codeVerifier || !expectedState) {
      return res.status(400).json({ success: false, message: "Missing PKCE/state in session" });
    }
  
    const params = client.callbackParams(req);
  
    const tokenSet = await client.callback(
      process.env.GOOGLE_REDIRECT_URI!,
      params,
      { code_verifier: codeVerifier, state: expectedState }
    );
  
    const rawClaims = tokenSet.claims(); // unknown-ish shape
    const parsed = Google_Claims_Schema.safeParse(rawClaims);
  
    if (!parsed.success) {
      return res.status(401).json({
        success: false,
        message: "Invalid ID token claims",
        details: parsed.error.flatten(),
      });
    }
  
    const claims: Google_Claims_DTO = parsed.data;
  
    const profile = Google_Claims_To_Provider_Profile(claims);

    const user = await Login_With_Provider_Profile(profile);
  
    await passport_Login(req, user);
  
    delete req.session.pkceVerifier;
    delete req.session.oauthState;
    
    
    req.session.save((err) => {
      if (err) {
        console.error("Session save failed in googleCallback:", err);
        return res.status(500).json({ success: false, message: "Failed to save session" });
      }
      return res.redirect(process.env.FRONTEND_URL!);
    });
    
  }
  
  export function me(req: Request, res: Response) {
    if (!req.isAuthenticated?.() || !req.user) {
      return res.status(401).json({ success: false, message: "Not authenticated" });
    }
  
    // req.user is typed as DbUser via Express.User augmentation
    return res.redirect(process.env.FRONTEND_URL!)
  }
  
  export function logout(req: Request, res: Response) {
    req.logout((err) => {
      if (err) return res.status(500).json({ success: false, message: "Logout failed" });
  
      req.session.destroy(() => {
        res.clearCookie("sid");
        res.json({ success: true });
      });
    });
  }