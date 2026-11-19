import express, { type NextFunction, type Request, type Response } from "express";
import cors from "cors";
import passport from "passport";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { ZodError } from "zod";

import { SessionMiddleware } from "./middleware/Sessions/Session_Middleware.js";
import { Api_Router } from "./routes/index.routes.js";
import { Cors_Confige } from "./config/Cors_Config.js";
import { HttpError } from "./utils/http_Error.js";

export function Create_App() {
  const app = express();

  if (process.env.NODE_ENV === "production") {
    app.set("trust proxy", 1);
  }

  app.use(cors(Cors_Confige));
  app.use(express.json());
  app.use(SessionMiddleware);
  app.use(passport.initialize());
  app.use(passport.session());

  app.get("/api/health", (_req, res) => {
    res.json({ success: true, status: "ok" });
  });

  app.use("/api", Api_Router);

  app.use("/api", (_req, res) => {
    res.status(404).json({ success: false, error: "Not found" });
  });

  const distDir =
    process.env.FRONTEND_DIST || fileURLToPath(new URL("../../Front_End/dist", import.meta.url));

  if (existsSync(join(distDir, "index.html"))) {
    app.use(express.static(distDir));
    app.use((req, res, next) => {
      if (req.method !== "GET") return next();
      res.sendFile(join(distDir, "index.html"));
    });
    console.log(`Serving the frontend from ${distDir}`);
  }

  app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    if (err instanceof ZodError) {
      const details = err.issues.map((i) => ({ path: i.path.join("."), message: i.message }));
      return res.status(400).json({ success: false, error: details[0]?.message ?? "Invalid data", details });
    }
    if (err instanceof HttpError) {
      return res.status(err.status).json({
        success: false,
        error: err.message,
        code: err.code,
        data: err.data,
      });
    }
    console.error(err);
    res.status(500).json({ success: false, error: "Something went wrong. Please try again." });
  });

  return app;
}
