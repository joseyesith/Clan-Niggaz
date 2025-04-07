import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import tasksRoutes from "./routes/tasks.routes.js"; 
import adminRoutes from "./routes/admin.routes.js";
import eventsRoutes from "./routes/events.routes.js"
import { FRONTEND_URL } from "./config.js";

const app = express();

app.use(
  cors({
    credentials: true,
    origin: FRONTEND_URL,
  })
);
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", tasksRoutes);     
app.use("/api/admin", adminRoutes);

app.use("/api/upload", eventsRoutes);

if (process.env.NODE_ENV === "production") {
  const path = await import("path");
  app.use(express.static("client/dist"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve("client", "dist", "index.html"));
  });
}

export default app;
