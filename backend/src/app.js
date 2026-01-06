import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import urlRoutes from "./routes/url.routes.js"; // <-- add this
import * as urlController from "./controllers/url.controller.js";

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api", urlRoutes); // <-- mount URL routes, gives /api/urls, /api/urls/:id

app.get("/:shortCode", urlController.handleRedirect);

app.get("/", (req, res) => {
  res.send("API is running");
});

export default app;