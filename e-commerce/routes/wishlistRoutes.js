import express from "express";
import {
  toggleWishlist,
  getWishlist,
  removeWishlistItem,
} from "../controllers/wishlistController.js";
import { protect } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/toggle",protect, toggleWishlist);
router.get("/:userId", protect, getWishlist);
router.delete("/remove",protect, removeWishlistItem);

export default router;
