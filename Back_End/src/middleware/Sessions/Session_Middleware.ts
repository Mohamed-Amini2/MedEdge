import session from "express-session";
import { Session_Store } from "./Session_Store.js";

export const SessionMiddleware = session({
  name: "sid",
  store: Session_Store,
  secret: process.env.SESSION_SECRET || "mededge-dev-session-secret",
  resave: false,
  saveUninitialized: false,
  rolling: true,
  proxy: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  },
});
