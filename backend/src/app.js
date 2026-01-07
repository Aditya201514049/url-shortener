import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import urlRoutes from "./routes/url.routes.js"; 
import * as urlController from "./controllers/url.controller.js";


const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true
}));
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api", urlRoutes); 

app.get("/:shortCode", urlController.handleRedirect);

// test route
app.get("/", (req, res) => {
  res.send("API is running");
});

export default app;