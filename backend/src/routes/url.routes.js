import express from "express";
import * as urlController from "../controllers/url.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/urls", protect, urlController.createShortUrl);
router.get("/urls", protect, urlController.listUserUrls);
router.delete("/urls/:id", protect, urlController.deleteUrl);

export default router;