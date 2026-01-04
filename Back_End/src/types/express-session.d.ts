import "express-session";

declare module "express-session" {
  interface SessionData {
    pkceVerifier?: string;
    oauthState?: string;
  }
}
